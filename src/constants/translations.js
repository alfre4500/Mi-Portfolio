export const translations = {
  es: {
    // Navbar
    navLinks: [
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
    ],
    
    // Dock Apps
    dockApps: [
      {
        id: "finder",
        name: "Portafolio",
        tooltip: "Portafolio",
        icon: "finder.png",
        canOpen: true,
      },
      {
        id: "safari",
        name: "Artículos",
        tooltip: "Artículos",
        icon: "safari.png",
        canOpen: true,
      },
      {
        id: "photos",
        name: "Galería",
        tooltip: "Galería",
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
    ],

    // Locations
    locations: {
      work: {
        name: "Trabajo",
      },
      about: {
        name: "Acerca de mí",
      },
      resume: {
        name: "CV",
      },
      trash: {
        name: "Papelera",
      },
    },

    // Welcome
    welcomeSubtitle: "¡Hola! Soy Alfredo, Bienvenidos a mi",
    welcomeTitle: "Portafolio",

    // Messages
    desktopOnly: "Este Portafolio está diseñado para escritorio y tablet.",
  },

  en: {
    // Navbar
    navLinks: [
      {
        id: 1,
        name: "Projects",
        type: "finder",
      },
      {
        id: 3,
        name: "Contact",
        type: "contact",
      },
      {
        id: 4,
        name: "Resume",
        type: "resume",
      },
    ],

    // Dock Apps
    dockApps: [
      {
        id: "finder",
        name: "Portfolio",
        tooltip: "Portfolio",
        icon: "finder.png",
        canOpen: true,
      },
      {
        id: "safari",
        name: "Articles",
        tooltip: "Articles",
        icon: "safari.png",
        canOpen: true,
      },
      {
        id: "photos",
        name: "Gallery",
        tooltip: "Gallery",
        icon: "photos.png",
        canOpen: true,
      },
      {
        id: "contact",
        name: "Contact",
        tooltip: "Contact",
        icon: "contact.png",
        canOpen: true,
      },
      {
        id: "terminal",
        name: "Skills",
        tooltip: "Skills",
        icon: "terminal.png",
        canOpen: true,
      },
      {
        id: "trash",
        name: "Archive",
        tooltip: "Archive",
        icon: "trash.png",
        canOpen: false,
      },
    ],

    // Locations
    locations: {
      work: {
        name: "Work",
      },
      about: {
        name: "About me",
      },
      resume: {
        name: "Resume",
      },
      trash: {
        name: "Trash",
      },
    },

    // Welcome
    welcomeSubtitle: "Hello I'm Alfredo Welcome to my",
    welcomeTitle: "Portfolio",

    // Messages
    desktopOnly: "This Portfolio is designed for desktop and tablet.",
  },
};

export const getTranslation = (language, key) => {
  return translations[language]?.[key] || translations.es[key];
};
