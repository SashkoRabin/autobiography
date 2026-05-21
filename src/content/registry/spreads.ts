import type { BookPageContent } from "@/types/book";

import { paginateBookPages } from "@/lib/book/pagination";

const sourceAuthorPage: BookPageContent = {
  id: "author-history",
  chapterId: "history",
  title: "History",
  body:
    "This book is the autobiography of Merkulov Oleksandr. The idea of creating a resume in the form of a book came to me spontaneously. I hope that you, as the reader, will enjoy this journey through its pages. I did not simply spend time creating it — I poured a part of my soul into it as well. Enjoy the reading.",
};

const authorPages = paginateBookPages([sourceAuthorPage]);
const authorContinuationPages = authorPages.slice(1);

const sourcePages: BookPageContent[] = [
  {
    id: "contents-1",
    chapterId: "contents",
    template: "contents",
    title: "Contents",
    body: "",
  },

  ...authorContinuationPages,

  {
    id: "introduction-1",
    chapterId: "introduction",
    template: "introduction",
    title: "Introduction",
    imageSrc: "/images/me.png",
    body:
      `I studied Software Development at a technical college. During my third year, I began exploring different areas of programming, and by the fourth year I chose web dev as my primary path. Most of my learning came through self-education — YouTube courses, Udemy, official documentation, and constant practice. 
      However, the greatest contribution to my growth came from real commercial experience. I realized that being a good developer is not only about writing code. Communication, politeness, the willingness to learn, and the ability to overcome fear of large and complex tasks are just as important. 
      Besides web development, I am also passionate about building Telegram bots. For me, programming is not simply a job — it is a lifestyle. 
      In everyday life, I constantly find myself thinking in algorithms and breaking problems into modular solutions, which helps me effectively handle complex challenges.
      
    My dream is to create a product that will be used by millions of people — or at least to become part of building something truly impactful.
      `,
  },

  {
    id: "skills-1",
    chapterId: "skills",
    title: "Skills",
    body:
      `Next.js, React.js, and TypeScript are the technologies used in almost every project I have participated in. 
      Git, i18next, and REST API are also part of my basic toolkit.
For styling, I have experience with CSS, SASS, Tailwind CSS (very little practice), and Bootstrap. Previously, I mostly wrote styles manually using SASS.
State management — Redux, RTK, Zustand, React Hook Form. 
I have experience working with WebSockets.
I have experience working with OAuth.
Backend — basic knowledge of Node.js and Strapi.
Databases — SQL and NoSQL.
I have worked with external APIs, including Slack.
I also have experience working with GraphQL.
`,
  },

  {
    id: "projects-1",
    chapterId: "projects",
    title: "Projects",
    body:
      "To be continued...",
  },

  // {
  //   id: "contact-1",
  //   chapterId: "contact",
  //   title: "Contact",
  //   body:
  //     "To be continued...",
  // },
];

export const pages = paginateBookPages(sourcePages);

export const authorPage = authorPages[0];

export const spreads = pages;
