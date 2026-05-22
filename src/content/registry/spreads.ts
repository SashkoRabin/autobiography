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
      `Onix Site
      
      I worked on the company’s website, where my responsibilities included refactoring existing code and developing pages based on Figma designs. These pages were created in the format of collaboration case-study blogs with clients — presenting the company, the services provided, and client feedback regarding the completed work.
In addition, I maintained and expanded the admin panel built with Strapi. The admin panel was used to manage and edit the content displayed on the published blog pages.

Hydra Projects (ERP System)

I worked on the company’s internal CRM system. During development, I frequently worked with API requests to the internal employee database, retrieving and parsing data for various business tasks and features.
One of my responsibilities was improving the company’s vacation management system. I also worked with real-time notifications using WebSockets to inform users about important events and updates inside the platform.
In addition, I contributed to the time tracking system — improving work-hour logging, implementing calculations, and saving processed data to the database.
The project also included many other interesting systems and mechanics, such as partner payment invoices, employee salary management, and employee profile management inside the admin panel, including statuses like vacation, sick leave, day off, or working day, along with other related information.

Slack bot

I developed a notification bot for the company in Slack, working directly with
  the Slack API. The bot retrieved employee birthday data from the internal database and automatically generated birthday messages for employees.
Selected photos were attached to the message, and the congratulation text was generated using predefined templates. Date checks were performed daily using Node Cron — a task scheduling system in Node.js that allowed the bot to automatically monitor upcoming birthdays and send notifications on time.

Comics Editor

This was a commercial project where I participated from the very beginning until its closure. The project was eventually shut down due to a lack of funding from the client. The platform itself was a complete system for animating comics from uploaded images. Users could upload a comic, after which it was automatically divided into frames. These frames were then used to create videos inside an internal video editor.

The core of the editor was based on the Remotion library, but it was completely rewritten from scratch and heavily customized for the project’s needs. In practice, the editor functioned as a custom-built alternative to CapCut. The entire video editing toolkit was developed from scratch — including transitions, sound effects, and video effects.
The platform also supported collaborative real-time editing. 
Users could share project access with other users, assign permissions, and work on the same comic together in real time.
My responsibilities included the authentication system, frontend development, and integrating the project management logic. After finishing that part, I moved to working on the video editor itself.
The editor core was rewritten by another developer on the team, while I focused on implementing video effects, sound effects, video parameter editing (speed, opacity, and other controls), video trimming, and transitions.

Permit Center

This was a government-level system where I worked from the very beginning of the project until its completion. 
The platform was designed for citizens of the Philippines, allowing them to apply for various types of permits and approvals.

The system included three main roles:
a user submitting permit requests, a municipal employee responsible for reviewing applications and providing responses, and an admin panel for managing the system.

My responsibilities included developing and generating dynamic forms for permit applications. Each permit type had its own predefined structure and validation rules that needed to be strictly followed.

In addition, I worked on configuring system roles and permissions across the platform. I also implemented real-time request status updates, allowing users to instantly see whether their application was Pending, Approved, or Rejected.

Sale Notify CZ

This is my personal project — a Telegram bot. Its main purpose is to monitor discounts from major supermarket chains in the Czech Republic, including Kaufland, Lidl, Penny, Billa, and Albert, and generate a daily summary for users featuring the best discounts from each store.
The bot also includes a priority categories feature. 
If a user is most interested in a specific category of products, they can select it in their profile settings, and the chosen categories will be prioritized in the generated daily summaries.
Users can also view detailed information for a specific category — for example, the top meat discounts across selected supermarket chains.
In addition, the bot provides access to a discount history journal, city selection, language settings, and customization of which supermarkets the user wants to follow.

Resume

This website is also my own project. 
The concept is completely unique and created entirely from my own vision and ideas. Although the project is not commercial.
I believe it still deserves attention — at the very least because you, the reader, have made it all the way to this page.

This is not just a simple PDF resume. 
It is a practical demonstration of my skills and a reflection of my personality. 
I did not only build this project technically — I created the idea myself and carried it through to its logical conclusion, putting a part of my soul into every detail along the way.
During the development process, I also used Tailwind CSS — a technology I had not previously used in commercial projects.
`,
  },

  {
    id: "contact-1",
    chapterId: "contact",
    title: "Contact Me",
    body:
      `
      Telegram: @merqloff
      Instagram: @merqloff
      Gmail: sashrabin@gmail.com
      Whatsapp | Viber: +420 606 939 612

      Thank you for reading.
      `,
  },
];

export const pages = paginateBookPages(sourcePages);

export const authorPage = authorPages[0];

export const spreads = pages;
