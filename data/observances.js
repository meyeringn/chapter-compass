/*
 * Observances and chapter reminders that appear on the year dial.
 *
 * type: "un"     = a UN international day (official title kept verbatim from the UN list)
 *       "admin"  = a UNA-USA chapter reminder. These change; always confirm in the
 *                  Chapter Leader Guide that UNA-USA shares with chapter leaders.
 *
 * Date: either { month, day } for a fixed date, or { month, rule: { weekday, nth } }
 *       for days like "first Monday of October" (weekday 0 = Sunday, nth 1-4).
 *       Add { endMonth, endDay } for a date range.
 *
 * Sources:
 *   UN days:  https://www.un.org/en/observances/list-days-weeks
 *   Admin:    see each item's `source`.
 * Last verified: November 2026.
 */
window.CC = window.CC || {};
window.CC.observances = [
  { id: "education", type: "un", month: 1, day: 24, sdgs: [4],
    name: { en: "International Day of Education", es: "Día Internacional de la Educación" },
    idea: { en: "Host a teach-in with local educators on what quality education means on your block.",
            es: "Organiza una jornada con educadores locales sobre lo que significa una educación de calidad en tu barrio." } },

  { id: "women-science", type: "un", month: 2, day: 11, sdgs: [5, 9],
    name: { en: "International Day of Women and Girls in Science", es: "Día Internacional de la Mujer y la Niña en la Ciencia" },
    idea: { en: "Invite women scientists from a nearby university for a lightning-talk night.",
            es: "Invita a científicas de una universidad cercana a una noche de charlas cortas." } },

  { id: "social-justice", type: "un", month: 2, day: 20, sdgs: [8, 10],
    name: { en: "World Day of Social Justice", es: "Día Mundial de la Justicia Social" },
    idea: { en: "Pair with a workers' center or tenant union for a listening session.",
            es: "Colabora con un centro de trabajadores o sindicato de inquilinos para una sesión de escucha." } },

  { id: "mother-language", type: "un", month: 2, day: 21, sdgs: [4, 10],
    name: { en: "International Mother Language Day", es: "Día Internacional de la Lengua Materna" },
    idea: { en: "Run a multilingual story swap. Book an ASL interpreter: sign languages are languages too.",
            es: "Organiza un intercambio de historias en varios idiomas. Contrata intérprete de lengua de señas: también es un idioma." } },

  { id: "womens-day", type: "un", month: 3, day: 8, sdgs: [5],
    name: { en: "International Women's Day", es: "Día Internacional de la Mujer" },
    idea: { en: "Honor a local woman leader and connect her work to SDG 5.",
            es: "Reconoce a una líder local y conecta su trabajo con el ODS 5." } },

  { id: "racial-discrimination", type: "un", month: 3, day: 21, sdgs: [10, 16],
    name: { en: "International Day for the Elimination of Racial Discrimination", es: "Día Internacional de la Eliminación de la Discriminación Racial" },
    idea: { en: "Screen a short film and hold a facilitated conversation with a community partner.",
            es: "Proyecta un cortometraje y modera una conversación con una organización comunitaria." } },

  { id: "water-day", type: "un", month: 3, day: 22, sdgs: [6],
    name: { en: "World Water Day", es: "Día Mundial del Agua" },
    idea: { en: "Tour your local water utility or host a river cleanup with step-free routes marked.",
            es: "Visita la empresa de agua local u organiza una limpieza de río con rutas sin escalones señaladas." } },

  { id: "autism-day", type: "un", month: 4, day: 2, sdgs: [10],
    name: { en: "World Autism Awareness Day", es: "Día Mundial de Concienciación sobre el Autismo" },
    idea: { en: "Let Autistic self-advocates lead the program, and plan a low-sensory format.",
            es: "Que las personas autistas lideren el programa, con un formato de baja estimulación sensorial." } },

  { id: "mother-earth", type: "un", month: 4, day: 22, sdgs: [13, 15],
    name: { en: "International Mother Earth Day", es: "Día Internacional de la Madre Tierra" },
    idea: { en: "Plant trees with a neighborhood group in the block with the least shade.",
            es: "Planta árboles con un grupo vecinal en la cuadra con menos sombra." } },

  { id: "press-freedom", type: "un", month: 5, day: 3, sdgs: [16],
    name: { en: "World Press Freedom Day", es: "Día Mundial de la Libertad de Prensa" },
    idea: { en: "Host a panel with local and ethnic-media reporters.",
            es: "Organiza un panel con periodistas locales y de medios étnicos." } },

  { id: "cultural-diversity", type: "un", month: 5, day: 21, sdgs: [4, 10],
    name: { en: "World Day for Cultural Diversity for Dialogue and Development", es: "Día Mundial de la Diversidad Cultural para el Diálogo y el Desarrollo" },
    idea: { en: "Potluck plus dialogue: every dish comes with a story (and an ingredient card).",
            es: "Comida compartida y diálogo: cada plato trae una historia (y una tarjeta de ingredientes)." } },

  { id: "environment-day", type: "un", month: 6, day: 5, sdgs: [12, 13, 15],
    name: { en: "World Environment Day", es: "Día Mundial del Medio Ambiente" },
    idea: { en: "Co-host with a sustainability group. Make the event itself low-waste.",
            es: "Coorganiza con un grupo de sostenibilidad. Que el evento mismo genere pocos residuos." } },

  { id: "oceans-day", type: "un", month: 6, day: 8, sdgs: [14],
    name: { en: "World Oceans Day", es: "Día Mundial de los Océanos" },
    idea: { en: "Inland chapter? Talk rivers and watersheds: every storm drain leads somewhere.",
            es: "¿Lejos del mar? Habla de ríos y cuencas: cada alcantarilla desemboca en algún lugar." } },

  { id: "refugee-day", type: "un", month: 6, day: 20, sdgs: [10, 16],
    name: { en: "World Refugee Day", es: "Día Mundial de las Personas Refugiadas" },
    idea: { en: "Partner with a resettlement agency. Center refugee speakers, and pay them.",
            es: "Colabora con una agencia de reasentamiento. Da protagonismo a personas refugiadas y págales." } },

  { id: "charter", type: "un", month: 6, day: 26, sdgs: [16, 17],
    name: { en: "Anniversary of the signing of the UN Charter (1945)", es: "Aniversario de la firma de la Carta de las Naciones Unidas (1945)" },
    idea: { en: "Read the Charter's preamble aloud together, then ask what \"we the peoples\" means locally.",
            es: "Lean juntos el preámbulo de la Carta y pregunten qué significa \"nosotros los pueblos\" en su ciudad." } },

  { id: "mandela-day", type: "un", month: 7, day: 18, sdgs: [16, 17],
    name: { en: "Nelson Mandela International Day", es: "Día Internacional de Nelson Mandela" },
    idea: { en: "Organize a service day with a local partner. Mandela Day asks for 67 minutes of service.",
            es: "Organiza una jornada de servicio. El Día de Mandela invita a dedicar 67 minutos al servicio." } },

  { id: "indigenous-peoples", type: "un", month: 8, day: 9, sdgs: [10, 16],
    name: { en: "International Day of the World's Indigenous Peoples", es: "Día Internacional de los Pueblos Indígenas" },
    idea: { en: "Ask local Indigenous organizations what support they want, before planning anything.",
            es: "Pregunta a organizaciones indígenas locales qué apoyo desean antes de planificar nada." } },

  { id: "youth-day", type: "un", month: 8, day: 12, sdgs: [4, 8],
    name: { en: "International Youth Day", es: "Día Internacional de la Juventud" },
    idea: { en: "Hand the mic to your campus chapters and young professionals for the whole program.",
            es: "Cede el micrófono a los capítulos universitarios y jóvenes profesionales durante todo el programa." } },

  { id: "humanitarian-day", type: "un", month: 8, day: 19, sdgs: [16, 17],
    name: { en: "World Humanitarian Day", es: "Día Mundial de la Asistencia Humanitaria" },
    idea: { en: "Host a conversation with aid workers about how humanitarian funding reaches people.",
            es: "Conversa con trabajadores humanitarios sobre cómo llega la financiación a las personas." } },

  { id: "democracy-day", type: "un", month: 9, day: 15, sdgs: [16],
    name: { en: "International Day of Democracy", es: "Día Internacional de la Democracia" },
    idea: { en: "Run a nonpartisan voter-registration and polling-place-access table.",
            es: "Instala una mesa no partidista de registro de votantes y accesibilidad de centros de votación." } },

  { id: "peace-day", type: "un", month: 9, day: 21, sdgs: [16],
    name: { en: "International Day of Peace", es: "Día Internacional de la Paz" },
    idea: { en: "Coffee and conversation: small tables, plain-language prompts, one shared takeaway.",
            es: "Café y conversación: mesas pequeñas, preguntas en lenguaje sencillo y una conclusión compartida." } },

  { id: "sign-languages", type: "un", month: 9, day: 23, sdgs: [4, 10],
    name: { en: "International Day of Sign Languages", es: "Día Internacional de las Lenguas de Señas" },
    idea: { en: "Co-host with a Deaf-led group. Basic sign lesson, Deaf presenters, interpreters booked early.",
            es: "Coorganiza con un grupo dirigido por personas sordas. Clase básica, ponentes sordos e intérpretes reservados con tiempo." } },

  { id: "habitat-day", type: "un", month: 10, rule: { weekday: 1, nth: 1 }, sdgs: [11],
    name: { en: "World Habitat Day", es: "Día Mundial del Hábitat" },
    idea: { en: "Walk a neighborhood with housing advocates and note what makes it livable.",
            es: "Recorre un barrio con defensores de la vivienda y anota qué lo hace habitable." } },

  { id: "food-day", type: "un", month: 10, day: 16, sdgs: [2],
    name: { en: "World Food Day", es: "Día Mundial de la Alimentación" },
    idea: { en: "Volunteer at a food bank, then debrief over a meal about SDG 2.",
            es: "Haz voluntariado en un banco de alimentos y luego conversa sobre el ODS 2 durante una comida." } },

  { id: "poverty-day", type: "un", month: 10, day: 17, sdgs: [1, 10],
    name: { en: "International Day for the Eradication of Poverty", es: "Día Internacional para la Erradicación de la Pobreza" },
    idea: { en: "Invite people with lived experience of poverty to set the agenda.",
            es: "Invita a personas con experiencia vivida de pobreza a definir la agenda." } },

  { id: "un-day", type: "un", month: 10, day: 24, sdgs: [16, 17], signature: true,
    name: { en: "United Nations Day", es: "Día de las Naciones Unidas" },
    idea: { en: "Your signature event. Marks the day the UN Charter entered into force in 1945. Honor a local leader, recruit members, celebrate.",
            es: "Tu evento insignia. Conmemora la entrada en vigor de la Carta de la ONU en 1945. Reconoce a una líder local, suma miembros y celebra." } },

  { id: "cities-day", type: "un", month: 10, day: 31, sdgs: [11],
    name: { en: "World Cities Day", es: "Día Mundial de las Ciudades" },
    idea: { en: "Pick one city service (transit, libraries, parks) and grade it against SDG 11 together.",
            es: "Elijan un servicio de la ciudad (transporte, bibliotecas, parques) y califíquenlo juntos según el ODS 11." } },

  { id: "tolerance-day", type: "un", month: 11, day: 16, sdgs: [16],
    name: { en: "International Day for Tolerance", es: "Día Internacional para la Tolerancia" },
    idea: { en: "Host an interfaith or cross-community dialogue with trained facilitators.",
            es: "Organiza un diálogo interreligioso o entre comunidades con facilitadores capacitados." } },

  { id: "road-victims", type: "un", month: 11, rule: { weekday: 0, nth: 3 }, sdgs: [3, 11],
    name: { en: "World Day of Remembrance for Road Traffic Victims", es: "Día Mundial en Recuerdo de las Víctimas de Accidentes de Tráfico" },
    idea: { en: "Join local street-safety advocates for a remembrance walk on an accessible route.",
            es: "Únete a defensores de la seguridad vial en una caminata de recuerdo por una ruta accesible." } },

  { id: "toilet-day", type: "un", month: 11, day: 19, sdgs: [6],
    name: { en: "World Toilet Day", es: "Día Mundial del Retrete" },
    idea: { en: "Yes, really. Map accessible public restrooms in your city. People will thank you.",
            es: "Sí, en serio. Mapea los baños públicos accesibles de tu ciudad. La gente te lo agradecerá." } },

  { id: "violence-women", type: "un", month: 11, day: 25, sdgs: [5, 16],
    name: { en: "International Day for the Elimination of Violence against Women", es: "Día Internacional de la Eliminación de la Violencia contra la Mujer" },
    idea: { en: "Partner with a local advocacy organization, which should lead and set the tone.",
            es: "Colabora con una organización local especializada, que debe liderar y marcar el tono." } },

  { id: "disability-day", type: "un", month: 12, day: 3, sdgs: [10, 11],
    name: { en: "International Day of Persons with Disabilities", es: "Día Internacional de las Personas con Discapacidad" },
    idea: { en: "Let Disabled leaders run the program. Grade your city on the CRPD, with dessert.",
            es: "Que líderes Discapacitados dirijan el programa. Califiquen su ciudad según la CDPD, con postre." } },

  { id: "human-rights-day", type: "un", month: 12, day: 10, sdgs: [16],
    name: { en: "Human Rights Day", es: "Día de los Derechos Humanos" },
    idea: { en: "Read the Universal Declaration of Human Rights in as many languages as your members speak.",
            es: "Lean la Declaración Universal de Derechos Humanos en todos los idiomas que hablen sus miembros." } },

  { id: "crpd-anniversary", type: "un", month: 12, day: 13, sdgs: [10, 16],
    name: { en: "Anniversary of the adoption of the CRPD (2006)", es: "Aniversario de la aprobación de la CDPD (2006)" },
    idea: { en: "The Convention on the Rights of Persons with Disabilities was adopted on this day. Review one article with local Disabled advocates.",
            es: "Ese día se aprobó la Convención sobre los Derechos de las Personas con Discapacidad. Revisen un artículo con defensores Discapacitados locales." } },

  /* ---- UNA-USA chapter reminders: confirm every date with UNA-USA ---- */

  { id: "annual-report", type: "admin", month: 1, day: 15, sdgs: [17],
    name: { en: "Annual chapter report due (community chapters)", es: "Informe anual del capítulo (capítulos comunitarios)" },
    idea: { en: "Bylaws based on UNA-USA's template set January 15 for the annual report. Pull your numbers from Track impact.",
            es: "Los estatutos basados en la plantilla de UNA-USA fijan el 15 de enero para el informe anual. Usa tus datos de Registrar impacto." },
    source: "https://www.una-kc.org/_files/ugd/26f5ef_dbb7f7376cfe43a79820cf657323be4f.pdf" },

  { id: "form-990", type: "admin", month: 5, day: 15, sdgs: [17],
    name: { en: "Send IRS Form 990 to UNA-USA (community chapters)", es: "Enviar el Formulario 990 del IRS a UNA-USA (capítulos comunitarios)" },
    idea: { en: "UNA-USA has asked community chapters to send their federal Form 990 by May 15.",
            es: "UNA-USA ha pedido a los capítulos comunitarios enviar su Formulario 990 federal antes del 15 de mayo." },
    source: "https://unausa.org/wp-content/uploads/2023/08/Preview-CLU-April23.pdf" },

  { id: "un-day-speaker", type: "admin", month: 9, day: 3, sdgs: [17],
    name: { en: "Book UN Day space and request a speaker (campus chapters)", es: "Reservar espacio y pedir ponente para el Día de la ONU (capítulos universitarios)" },
    idea: { en: "UNA-USA's fall checklist asks campus chapters to book UN Day space and request a speaker in early September.",
            es: "La lista de otoño de UNA-USA pide a los capítulos universitarios reservar espacio y solicitar ponente a principios de septiembre." },
    source: "https://unausa.org/fall-kick-off-checklist" },

  { id: "plus-one", type: "admin", month: 9, day: 24, endMonth: 10, endDay: 24, sdgs: [17],
    name: { en: "Plus One membership campaign", es: "Campaña de membresía \"Plus One\"" },
    idea: { en: "Each member shares why the UN matters to them and brings one new member before UN Day.",
            es: "Cada miembro comparte por qué la ONU le importa y suma a una persona nueva antes del Día de la ONU." },
    source: "https://new.express.adobe.com/webpage/5cIuhMXntd0vm" },

  { id: "semester-report", type: "admin", month: 12, day: 20, sdgs: [17],
    name: { en: "End-of-semester report (campus chapters)", es: "Informe de fin de semestre (capítulos universitarios)" },
    idea: { en: "Keeps campus chapters active and eligible for scholarships and grants.",
            es: "Mantiene activos a los capítulos universitarios y elegibles para becas y subvenciones." },
    source: "https://unausa.org/fall-kick-off-checklist" }
];
