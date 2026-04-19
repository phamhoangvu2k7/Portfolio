export interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  tags: string[];
  icon: string; // Font Awesome icon class
  accentColor: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Product Management System",
    description:
      "A comprehensive web application for managing product inventories with full CRUD operations, cloud-based image management via Cloudinary, rich text editing with TinyMCE, and SEO-friendly slug generation.",
    link: "https://github.com/phamhoangvu2k7/Product-Management",
    tags: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Cloudinary", "Pug"],
    icon: "fas fa-boxes-stacked",
    accentColor: "#22c55e",
  },
  {
    id: 2,
    title: "Task Management API",
    description:
      "A RESTful API for task management with full Swagger/OpenAPI documentation. Supports task creation, updating, deletion, and status tracking with a clean, well-documented API structure.",
    link: "https://github.com/phamhoangvu2k7/Task-Management",
    tags: ["Node.js", "Express.js", "Swagger", "REST API"],
    icon: "fas fa-list-check",
    accentColor: "#3b82f6",
  },
  {
    id: 3,
    title: "To-Do List App",
    description:
      "A modern Fullstack to-do list application with a beautiful Glassmorphism UI. Features task CRUD, importance flagging, server-side rendering for fast load times, and is deployed on Render with PostgreSQL on Neon.tech.",
    link: "https://github.com/phamhoangvu2k7/To-Do-List",
    tags: ["Node.js", "Express.js", "PostgreSQL", "Pug", "Bootstrap", "Render"],
    icon: "fas fa-check-double",
    accentColor: "#a855f7",
  },
];

export default projects;
