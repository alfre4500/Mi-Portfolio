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
        tooltip: "Proyectos",
        icon: "finder.png",
        canOpen: true,
      },
      {
        id: "safari",
        name: "Artículos",
        tooltip: "Certificados",
        icon: "safari.png",
        canOpen: true,
      },
      {
        id: "photos",
        name: "Galería",
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
        canOpen: true,
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
    aboutTitle: "Sobre mí",
    aboutDescription: "¡Hola! Soy desarrollador Frontend de San Juan, Argentina. Me especializo en construir aplicaciones web modernas, rápidas y visualmente atractivas usando React, Next.js y Tailwind CSS. Mi enfoque está en escribir código limpio y diseñar interfaces centradas en el usuario.",
    roleTitle: "Desarrollador Frontend",
    skillsTitle: "Habilidades",
    projectsTitle: "Proyectos",
    certificatesTitle: "Certificados",
    contactTitle: "Contacto",
    locationLabel: "Ubicación",
    experienceLabel: "Experiencia",
    experienceValue: "+1 Año",
    studiesLabel: "Estudios",
    studiesValue: "Tec. Univ.",
    statusLabel: "Estado",
    statusValue: "Disponible",
    languageButton: "ES/EN",
    themeLight: "Modo claro",
    themeDark: "Modo oscuro",
    contactPrompt: "¿Tienes algún proyecto en mente o buscas un desarrollador? ¡Hablemos!",
    locationValue: "San Juan, ARG",
    noDescription: "Sin descripción...",
    viewCredential: "Ver credencial",

    // --- NUEVAS TRADUCCIONES PARA EL CV ---
    resumeUrl: "/files/Alfredo.Aguero.CV.pdf?v=2", 
    resumeTitle: "Mi Currículum",
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
        id:  "finder",
        name: "Portfolio",
        tooltip: "Projects",
        icon: "finder.png",
        canOpen: true,
      },
      {
        id: "safari",
        name: "Articles",
        tooltip: "Certificates",
        icon: "safari.png",
        canOpen: true,
      },
      {
        id: "photos",
        name: "Gallery",
        tooltip: "About me",
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
        canOpen: true,
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
    aboutTitle: "About me",
    aboutDescription: "Hello! I'm a Frontend developer from San Juan, Argentina. I specialize in building modern, fast and visually appealing web applications using React, Next.js and Tailwind CSS. I focus on clean code and user-centered interface design.",
    roleTitle: "Frontend Developer",
    skillsTitle: "Skills",
    projectsTitle: "Projects",
    certificatesTitle: "Certificates",
    contactTitle: "Contact",
    locationLabel: "Location",
    experienceLabel: "Experience",
    experienceValue: "+1 Year",
    studiesLabel: "Studies",
    studiesValue: "Univ. Tech",
    statusLabel: "Status",
    statusValue: "Available",
    languageButton: "ES/EN",
    themeLight: "Light mode",
    themeDark: "Dark mode",
    contactPrompt: "Do you have a project in mind or need a developer? Let's talk!",
    locationValue: "San Juan, ARG",
    noDescription: "No description...",
    viewCredential: "View credential",

    // --- NUEVAS TRADUCCIONES PARA EL CV ---
    resumeUrl: "/files/Alfredo.Aguero.Resume.pdf?v=2",
    resumeTitle: "My Resume",
  },
};

export const getTranslation = (language, key) => {
  return translations[language]?.[key] || translations.es[key];
};