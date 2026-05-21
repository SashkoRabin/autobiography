# Interactive Autobiography Resume Book

An immersive portfolio presented as a physical autobiography book. The project focuses on frontend engineering, tactile interaction, animation systems, and a premium vintage paper feel.

The current phase is the book engine foundation: cover states, open spreads, one-page flipping, drag interaction, page numbering, clickable contents, automatic chapter pagination, and visible paper thickness.

## Documentation

- [Book engine architecture](./docs/book-engine.md)

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Useful Commands

```bash
pnpm lint
pnpm build
npx tsc --noEmit
```

## Project Notes

The book engine is intentionally split into state, pure page math, interaction hooks, registry content, pagination, and visual components. Keep future chapter work registry-driven and avoid hardcoded page logic inside React views.

Numbered pages start at `Contents`. The left author page is unnumbered and currently uses placeholder copy under the title `History`. If that author copy becomes too long, the overflow is carried into generated continuation pages with the same `history` chapter ownership.

Closed covers use mirrored hit zones: on the front cover the left half turns to the back cover and the right half opens the book; on the back cover the left half opens the book from the last spread and the right half turns back to the front cover.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
