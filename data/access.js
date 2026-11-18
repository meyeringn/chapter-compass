/*
 * Access checklist used by "Plan an event".
 * Each item can generate a line in the event's access statement (`says`).
 * Written by and for Disabled organizers. Uses identity-first language.
 * Grounded in CRPD Article 9 (accessibility) and the ADA's requirements for
 * public accommodations; see ACCESSIBILITY.md for references.
 */
window.CC = window.CC || {};
window.CC.access = [
  {
    group: { en: "Getting there", es: "Cómo llegar" },
    items: [
      { id: "step-free", en: "Step-free entrance and route to the room", es: "Entrada y ruta al salón sin escalones",
        says: { en: "The entrance and route to the room are step-free.", es: "La entrada y la ruta al salón no tienen escalones." } },
      { id: "restroom", en: "Accessible restroom on the same floor", es: "Baño accesible en el mismo piso",
        says: { en: "An accessible restroom is on the same floor.", es: "Hay un baño accesible en el mismo piso." } },
      { id: "transit", en: "Near a transit stop (add directions below)", es: "Cerca de una parada de transporte (añade indicaciones abajo)",
        says: { en: "The venue is near public transit.", es: "El lugar está cerca del transporte público." } },
      { id: "parking", en: "Accessible parking or drop-off", es: "Estacionamiento accesible o zona para dejar pasajeros",
        says: { en: "Accessible parking or drop-off is available.", es: "Hay estacionamiento accesible o zona para dejar pasajeros." } }
    ]
  },
  {
    group: { en: "In the room", es: "En el salón" },
    items: [
      { id: "asl", en: "ASL interpretation booked", es: "Interpretación en lengua de señas (ASL) reservada",
        says: { en: "ASL interpretation will be provided.", es: "Habrá interpretación en lengua de señas americana (ASL)." } },
      { id: "cart", en: "Live captions (CART) booked", es: "Subtítulos en vivo (CART) reservados",
        says: { en: "Live captions (CART) will be provided.", es: "Habrá subtítulos en vivo (CART)." } },
      { id: "mics", en: "Every speaker uses a microphone, including audience questions", es: "Toda persona que hable usa micrófono, incluido el público",
        says: { en: "Every speaker, including audience members, will use a microphone.", es: "Todas las personas que hablen, incluido el público, usarán micrófono." } },
      { id: "seating", en: "Wheelchair spaces mixed into seating, with wide aisles", es: "Espacios para sillas de ruedas integrados, con pasillos amplios",
        says: { en: "Wheelchair spaces are integrated throughout the seating.", es: "Hay espacios para sillas de ruedas integrados en todo el salón." } },
      { id: "quiet", en: "Quiet, low-sensory space", es: "Espacio tranquilo y de baja estimulación",
        says: { en: "A quiet, low-sensory space is available.", es: "Hay un espacio tranquilo y de baja estimulación." } },
      { id: "print", en: "Large-print and plain-language materials", es: "Materiales en letra grande y lenguaje sencillo",
        says: { en: "Large-print and plain-language materials will be available.", es: "Habrá materiales en letra grande y lenguaje sencillo." } },
      { id: "fragrance", en: "Fragrance-free request in the invite", es: "Petición de no usar fragancias en la invitación",
        says: { en: "Please come fragrance-free so everyone can breathe easy.", es: "Por favor, ven sin fragancias para que todos respiren tranquilos." } }
    ]
  },
  {
    group: { en: "Online and hybrid", es: "En línea e híbrido" },
    items: [
      { id: "human-captions", en: "Human captions, not only automatic ones", es: "Subtítulos humanos, no solo automáticos",
        says: { en: "The livestream will have human-made captions.", es: "La transmisión tendrá subtítulos hechos por personas." } },
      { id: "slides-early", en: "Slides and documents shared in advance", es: "Diapositivas y documentos compartidos con antelación",
        says: { en: "Slides will be shared in advance in an accessible format.", es: "Las diapositivas se compartirán con antelación en formato accesible." } },
      { id: "describe", en: "Speakers describe visuals out loud", es: "Las personas ponentes describen en voz alta lo visual",
        says: { en: "Speakers will describe images and slides out loud.", es: "Las personas ponentes describirán imágenes y diapositivas en voz alta." } }
    ]
  },
  {
    group: { en: "Food and comfort", es: "Comida y comodidad" },
    items: [
      { id: "labels", en: "Food labeled with ingredients and allergens", es: "Comida etiquetada con ingredientes y alérgenos",
        says: { en: "Food will be labeled with ingredients and common allergens.", es: "La comida estará etiquetada con ingredientes y alérgenos comunes." } },
      { id: "straws", en: "Bendable straws available", es: "Pajitas flexibles disponibles",
        says: { en: "Bendable straws will be available.", es: "Habrá pajitas flexibles disponibles." } },
      { id: "breaks", en: "Breaks scheduled at least every 60 minutes", es: "Pausas programadas al menos cada 60 minutos",
        says: { en: "Breaks are scheduled at least every hour.", es: "Hay pausas programadas al menos cada hora." } }
    ]
  }
];
