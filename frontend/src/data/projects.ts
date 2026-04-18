export interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  image_url: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A professional portfolio website built with React, Vite, and Framer Motion.",
    link: "https://github.com/phamhoangvu/myportfolio",
    image_url: "", 
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with Django and React.",
    link: "#",
    image_url: "",
  },
];

export default projects;
