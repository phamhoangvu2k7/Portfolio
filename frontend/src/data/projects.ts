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
      "A clean web application to manage product lists, upload images, and edit descriptions easily.",
    link: "https://github.com/phamhoangvu2k7/Product-Management",
    tags: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Cloudinary", "Pug"],
    icon: "fas fa-boxes-stacked",
    accentColor: "#22c55e",
  },
  {
    id: 2,
    title: "Task Management API",
    description:
      "A well-structured service to organize daily tasks, featuring clear documentation for developers.",
    link: "https://github.com/phamhoangvu2k7/Task-Management",
    tags: ["Node.js", "Express.js", "Swagger", "REST API"],
    icon: "fas fa-list-check",
    accentColor: "#3b82f6",
  },
  {
    id: 3,
    title: "To-Do List App",
    description:
      "A modern to-do list web app with a beautiful translucent interface. Helps you highlight important tasks and stay productive.",
    link: "https://github.com/phamhoangvu2k7/To-Do-List",
    tags: ["Node.js", "Express.js", "PostgreSQL", "Pug", "Bootstrap", "Render"],
    icon: "fas fa-check-double",
    accentColor: "#a855f7",
  },
];

export default projects;
