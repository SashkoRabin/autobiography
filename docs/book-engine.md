# Book Engine Architecture

This project is an interactive autobiography resume book. The book is treated as a physical object first and as a website second: pages stay mounted, page ownership is explicit, and every navigation action changes the state of the book rather than swapping one screen for another.

## Current Scope

The current engine covers the foundation phase of the roadmap:

- closed front cover
- closed back cover
- open double-page spread
- numbered content pages
- unnumbered author page on the left side of the opening spread
- registry-driven table of contents
- automatic multi-page chapter pagination
- one-page flip animation
- drag-to-flip interaction
- left and right page stacks
- fade-based cover transitions for stable, artifact-free opening and closing

The content is intentionally placeholder content. The important part at this stage is that page ownership, numbering, and motion are correct before the richer chapter system lands.

## Content Registry

The book content is split into pages and chapters.

`src/content/registry/spreads.ts` owns the authored page sequence. A page has:

- `id`
- `chapterId`
- optional `template`
- `title`
- optional `body`

`src/lib/book/pagination.ts` turns authored pages into rendered pages. Long text bodies are split into continuation pages before the sequence is exported, and each generated page keeps the original `chapterId`. That means a chapter can occupy several physical pages without adding duplicate rows to the table of contents.

`src/content/registry/chapters.ts` owns the chapter order and derives each chapter start from the rendered page sequence. The chapter start is stored as a zero-based page index and is printed with `getPrintedPageNumber`.

A chapter can span one or more pages. The first page with a matching `chapterId` is the chapter start. Later generated or hand-authored pages can keep the same `chapterId` without changing the table-of-contents rule.

The `Contents` page uses the `contents` template. It renders clickable chapter rows from `bookContents`; clicking a chapter calls `goToPage(startPageIndex)` in the store.

Chapter navigation does not jump directly to the destination. The store converts the requested page into a target spread, then turns pages one sheet at a time until the target spread is reached. This keeps table-of-contents navigation physically consistent with manual page flipping.

## Mental Model

The engine has three different concepts that should not be merged together.

### Book View

`bookView` describes the broad physical state of the object:

- `frontClosed`: the book is closed on the front cover
- `open`: the book is open and showing a spread
- `backClosed`: the book is closed on the back cover

This is not animation state. It is the stable resting state.

### Cover Motion

`coverMotion` describes temporary transitions between stable views:

- `openFront`
- `closeFront`
- `openBack`
- `closeBack`
- `turnToFront`

These transitions use a short premium fade. Earlier physical cover animations produced visible artifacts, so cover transitions are now intentionally cinematic and conservative. Page flips are still physical; cover/open/close transitions are handled as scene changes.

### Page Flip

Page flipping is controlled by:

- `currentSpread`
- `flipDirection`
- `isFlipping`
- `isDragging`
- `dragProgress`
- `pageVelocity`
- `activeFlipSpread`
- `goToPage`

`currentSpread` is the index of the right-hand numbered page currently visible. The left page is usually `currentSpread - 1`. The special author page uses index `-1` and is not printed as a numbered page. If the author page overflows, the first slice stays in that unnumbered slot and the remaining slices are added to the rendered sequence as `history` continuation pages.

`goToPage(pageIndex)` converts the requested page into the spread that must be visible. If the target page is a left page, the spread lands on the next right page so the requested page is visible on the left. If the target page is a right page, the spread lands directly on that page. The transition is then played as a sequence of normal page flips rather than a state jump.

## Page Indexing

Numbered pages begin with `Contents`:

- page index `0` prints as page `1`
- page index `1` prints as page `2`
- page index `2` prints as page `3`

The author page is separate:

- author page index is `-1`
- it appears on the left of the first open spread
- it has the title `History`
- it does not print a page number

This keeps the requested numbering clear: Contents is the first printed page.

## File Responsibilities

### State

`src/stores/book.store.ts`

Owns the book state machine. It decides when the book opens, closes, flips, or changes cover side. It should stay focused on state transitions, not rendering details.

### Types

`src/types/book.ts`

Contains shared domain types: view state, cover motion, flip direction, hovered corner, and page content shape.

### Page Math

`src/lib/book/pageMath.ts`

Contains pure helpers for indexing:

- last spread calculation
- next and previous spread calculation
- visible left/right page indexes
- flipping sheet front/back indexes
- printed page numbers
- drag availability
- page-to-spread navigation

These functions are intentionally framework-free so they can be tested later without rendering React.

### Timing

`src/lib/book/timing.ts`

Keeps animation timings and easing in one place. The cinematic easing is shared by cover transitions and page flipping. Contents navigation uses a shorter page-flip duration so multi-page jumps feel quicker while still turning one sheet at a time.

### Pagination

`src/lib/book/pagination.ts`

Splits long text bodies into additional rendered pages. This is a content-preparation step, not a visual concern: React components receive pages that already fit the book surface and keep normal page numbering, chapter ownership, and table-of-contents behavior.

### Scene View Model

`src/lib/book/scene.ts`

Converts `bookView` and `coverMotion` into render decisions:

- should the spread be visible
- should the cover be visible
- should the book use open or closed dimensions
- which cover side should be shown

The visual component does not need to know the state-machine details.

### Drag Interaction

`src/hooks/usePageDrag.ts`

Owns pointer, mouse, and touch drag mechanics:

- captures pointer start
- converts pointer distance into normalized progress
- calculates velocity
- decides whether the page should complete or snap back
- attaches global mouse/touch listeners so the drag does not break when the pointer leaves the book

The hook does not render anything.

### Visual Components

`src/components/book/core/Book.tsx`

Composes the whole scene: cover layer, spread layer, shadow/depth layer, and fade overlay.

`src/components/book/pages/BookSpread.tsx`

Lays out the open book: page stacks, visible pages, flipping sheet, and drag zones.

`src/components/book/pages/BookPage.tsx`

Draws a single paper page: paper color, noise, edge lighting, inner shadow, content, and printed page number. It also delegates the `contents` template to the table-of-contents component.

`src/components/book/navigation/BookContents.tsx`

Draws the clickable table of contents. It is visual UI backed by registry data, not hardcoded page text.

`src/components/book/pages/BookPageSheet.tsx`

Draws the actively moving page. This is the only page that rotates during a flip. It renders two faces and a thicker paper edge strip so the moving sheet feels like paper rather than a flat panel.

`src/components/book/thickness/PageStack.tsx`

Draws the visible stack of remaining pages on either side. It should suggest thickness without becoming a distracting block.

## Navigation Rules

Forward navigation:

1. From front cover: fade into the first open spread.
2. From an open spread: flip one physical page.
3. From the last page: fade to the back cover.
4. From the back cover right half: fade to the front cover.
5. From the back cover left half: fade into the last open spread.

Backward navigation:

1. From front cover: fade to the back cover.
2. From back cover: fade into the last open spread.
3. From an open spread: flip one physical page backward.
4. From the first spread: fade to the front cover.

## Rendering Layers

The open book is layered like this:

1. page stack shadows
2. left/right passive pages
3. active flipping sheet
4. invisible navigation drag zones

The active sheet uses the highest page z-index while flipping so the moving page always sits above the passive pages.

## Performance Notes

- Page math is pure and cheap.
- Only the active sheet rotates during a flip.
- Passive pages are not reanimated every frame.
- CSS transforms are used for the moving sheet.
- Heavy visual effects are intentionally limited to gradients, shadows, and tiny procedural paper noise.

## Extension Guidelines

When adding the registry-driven chapter system:

- keep `pages` as generated output, not hand-authored layout
- do not hardcode page numbers inside components
- keep chapter metadata separate from rendered page content
- add new page templates without changing page-index math
- keep chapter navigation routed through `goToPage`

When improving physical realism:

- change `BookPageSheet` for the active page
- change `BookPage` for paper material
- change `PageStack` for book thickness
- avoid putting physics logic into visual components

When adding tests:

- start with `src/lib/book/pageMath.ts`
- cover first spread, middle spread, last spread, forward flip, backward flip, and author page behavior
