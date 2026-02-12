const navLinks = [
  {
    id: 1,
    name: "Proyectos",
    type: "finder",
  },
  {
    id: 3,
    name: "Contacto",
    type: "contact",
  },
  {
    id: 4,
    name: "CV",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Proyectos",
    tooltip: "Proyectos",
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Certificados",
    tooltip: "Certificados",
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Sobre mi",
    tooltip: "Sobre mi",
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contacto",
    tooltip: "Contacto",
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Habilidades",
    tooltip: "Habilidades",
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archivo",
    tooltip: "Archivo",
    icon: "trash.png",
    canOpen: false,
  },
];

const blogPosts = [
  {
    id: 1,
    date: "Sep 2, 2025",
    title:
      "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
    image: "/images/blog1.png",
    link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
  },
  {
    id: 2,
    date: "Aug 28, 2025",
    title: "The Ultimate Guide to Mastering Three.js for 3D Development",
    image: "/images/blog2.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
  },
  {
    id: 3,
    date: "Aug 15, 2025",
    title: "The Ultimate Guide to Mastering GSAP Animations",
    image: "/images/blog3.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "GSAP" , "Three.js","React Three Fiber","Vite", ],
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo" ],
  },
  {
    category: "Estilado y Maquetación",
    items: ["Tailwind CSS", "Sass", "CSS" , "HTML","Bootstrap" , "NativeWind"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Spring"],
  },
  {
    category: "Base de datos",
    items: ["MongoDB", "PostgreSQL", "MySQL","Mongoose"],
  },
  {
    category: "Herramientas",
    items: ["Git", "GitHub", "Stripe" , "Figma" , "Zustand" , "Axios" ,"Clerk" , "Trello","Notion" , "Cloudinary" ],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/JavaScript-Mastery-Pro",
  },
  {
    id: 2,
    text: "Platform",
    icon: "/icons/atom.svg",
    bg: "#4bcb63",
    link: "https://jsmastery.com/",
  },
  {
    id: 3,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#ff866b",
    link: "https://x.com/jsmasterypro",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/company/javascriptmastery/posts/?feedView=all",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.png",
  },
  {
    id: 2,
    img: "/images/gal2.png",
  },
  {
    id: 3,
    img: "/images/gal3.png",
  },
  {
    id: 4,
    img: "/images/gal4.png",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: "folder-work", // ✅ ID Único
  type: "work",
  name: "Trabajo",
  icon: "/icons/work.svg",
  kind: "folder",
  fileType: "folder",
  children: [
    // ▶ Project 1
      {
        id: "project-nike", // ✅ ID Único
        name: "Sitio Web Nike",
        icon: "/images/folder.png",
        kind: "folder",
        fileType: "folder",
        position: "top-10 left-5",
        windowPosition: "top-4 left-5",
        children: [
        {
          id: "nike-txt", // ✅ ID Único
          name: "Proyecto Nike.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "El sitio web de comercio electrónico de Nike es una plataforma elegante...",
             // ... resto del texto
          ],
        },
        {
          id: "nike-web",
          name: "nike.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://youtu.be/fZdTYswuZjU?si=Awjl-pIst9e09_UU",
          position: "top-10 right-20",
        },
        {
          id: "nike-img",
          name: "nike.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-1.png",
        },
        {
          id: "nike-fig",
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 right-20",
        },
      ],
    },

    // ▶ Project 2
    {
      id: "project-ai", // ✅ ID Único
      name: "Analizador de CV con IA",
      icon: "/images/folder.png",
      kind: "folder",
      fileType: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: "ai-txt",
          name: "Proyecto Analizador.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [ "..." ],
        },
        {
          id: "ai-web",
          name: "ai-resume.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://youtu.be/iYOz165wGkQ",
          position: "top-20 left-20",
        },
        // ... otros archivos con IDs únicos (ai-img, ai-fig)
      ],
    },

    // ▶ Project 3
    {
      id: "project-food", // 🔴 AQUÍ ESTABA EL ERROR (antes decía "folder-about")
      name: "App de Comida",
      icon: "/images/folder.png",
      kind: "folder",
      fileType: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
            id: "food-txt",
            name: "Proyecto Food.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-5 left-10",
            description: ["..."]
        }
        // ... resto de archivos
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: "folder-about", // ✅ AHORA SÍ es "folder-about" y es único
  type: "about",
  name: "Acerca de mí",
  icon: "/icons/info.svg",
  kind: "folder",
  fileType: "folder",
  children: [
    {
      id: "about-me-png",
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/adrian.jpg",
    },
    {
      id: "about-txt",
      name: "acerca-de-mí.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Conoce al Desarrollador",
      image: "/images/adrian.jpg",
      description: [ "..." ],
    },
    // ... otros archivos
  ],
};

const RESUME_LOCATION = {
  id: "folder-resume", // ✅ ID Único (antes era 3)
  type: "resume",
  name: "CV",
  icon: "/icons/file.svg",
  kind: "folder",
  fileType: "folder",
  children: [
    {
      id: "resume-pdf",
      name: "CV.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: "folder-trash", // ✅ ID Único (antes era 4)
  type: "trash",
  name: "Papelera",
  icon: "/icons/trash.svg",
  kind: "folder",
  fileType: "folder",
  children: [
    {
      id: "trash-1",
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };