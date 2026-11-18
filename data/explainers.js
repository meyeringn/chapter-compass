/*
 * "Learn the UN" cards: how the UN works, in plain language.
 * Lasting facts only. No current events, funding figures, or officeholders' names:
 * those change and belong in a chapter's own briefing.
 * English and Spanish live here; other languages are in lang/*.js.
 * Last verified: November 2026.
 */
window.CC = window.CC || {};
window.CC.explainers = [
  { id: "what-is-un", source: "https://www.un.org/en/about-us/un-charter",
    title: { en: "What the UN is", es: "Qué es la ONU" },
    body: { en: "The United Nations is an organization of 193 member states, founded in 1945 after the Second World War. Its Charter sets four purposes: keep international peace, build friendly relations between nations, work together on shared problems and human rights, and be a place where countries coordinate.",
            es: "Las Naciones Unidas son una organización de 193 Estados miembros, fundada en 1945 tras la Segunda Guerra Mundial. Su Carta fija cuatro propósitos: mantener la paz internacional, fomentar relaciones de amistad entre naciones, cooperar ante problemas comunes y los derechos humanos, y ser un lugar donde los países coordinen sus acciones." },
    prompt: { en: "Which of the four purposes matters most in our city right now?",
              es: "¿Cuál de los cuatro propósitos importa más hoy en nuestra ciudad?" } },

  { id: "general-assembly", source: "https://www.un.org/en/ga/",
    title: { en: "The General Assembly", es: "La Asamblea General" },
    body: { en: "Every member state has a seat and one vote. The Assembly debates world problems, approves the UN's budget, and elects members of other UN bodies. Most of its resolutions are recommendations rather than binding law, but they show where the world stands.",
            es: "Cada Estado miembro tiene un asiento y un voto. La Asamblea debate los problemas del mundo, aprueba el presupuesto de la ONU y elige a los miembros de otros órganos. La mayoría de sus resoluciones son recomendaciones y no leyes obligatorias, pero muestran la postura del mundo." },
    prompt: { en: "If our city had one vote in the General Assembly, what would we vote for?",
              es: "Si nuestra ciudad tuviera un voto en la Asamblea General, ¿por qué votaríamos?" } },

  { id: "security-council", source: "https://www.un.org/securitycouncil/",
    title: { en: "The Security Council", es: "El Consejo de Seguridad" },
    body: { en: "The Council has 15 members. Five are permanent: China, France, Russia, the United Kingdom, and the United States, and each can veto a decision. The other ten are elected for two-year terms. Under the Charter, every member state agrees to carry out the Council's decisions.",
            es: "El Consejo tiene 15 miembros. Cinco son permanentes: China, Estados Unidos, Francia, el Reino Unido y Rusia, y cada uno puede vetar una decisión. Los otros diez se eligen por dos años. Según la Carta, todos los Estados miembros aceptan cumplir sus decisiones." },
    prompt: { en: "Should any country have a veto? Why or why not?",
              es: "¿Debería algún país tener derecho a veto? ¿Por qué sí o por qué no?" } },

  { id: "secretary-general", source: "https://www.un.org/sg/en",
    title: { en: "The Secretary-General", es: "El Secretario General" },
    body: { en: "The Secretary-General leads the UN's staff and speaks for the organization, and can bring threats to peace before the Security Council. The General Assembly appoints the Secretary-General on the Council's recommendation, for a five-year term that can be renewed.",
            es: "La persona que ocupa la Secretaría General dirige al personal de la ONU, habla en nombre de la organización y puede llevar amenazas a la paz ante el Consejo de Seguridad. La Asamblea General la nombra por recomendación del Consejo, para un mandato de cinco años renovable." },
    prompt: { en: "What would you want a Secretary-General to work on first?",
              es: "¿En qué te gustaría que trabajara primero un Secretario General?" } },

  { id: "ecosoc", source: "https://ecosoc.un.org/",
    title: { en: "The Economic and Social Council", es: "El Consejo Económico y Social" },
    body: { en: "ECOSOC's 54 members, elected by the General Assembly for three-year terms, coordinate the UN's economic, social, and environmental work. It is also how thousands of nonprofits gain consultative status and a voice at the UN.",
            es: "Los 54 miembros del ECOSOC, elegidos por la Asamblea General por tres años, coordinan el trabajo económico, social y ambiental de la ONU. También es la vía por la que miles de organizaciones sin fines de lucro obtienen carácter consultivo y voz en la ONU." },
    prompt: { en: "Which local nonprofits do work the UN would recognize?",
              es: "¿Qué organizaciones locales hacen un trabajo que la ONU reconocería?" } },

  { id: "icj", source: "https://www.icj-cij.org/",
    title: { en: "The International Court of Justice", es: "La Corte Internacional de Justicia" },
    body: { en: "The Court, in The Hague, settles legal disputes between countries and gives advisory opinions on international law. Its 15 judges serve nine-year terms. It hears cases between states, not individuals. It is often confused with the International Criminal Court, which is a separate institution, not part of the UN.",
            es: "La Corte, con sede en La Haya, resuelve controversias jurídicas entre países y emite opiniones consultivas sobre derecho internacional. Sus 15 jueces tienen mandatos de nueve años. Juzga casos entre Estados, no entre personas. Suele confundirse con la Corte Penal Internacional, que es una institución distinta y no forma parte de la ONU." },
    prompt: { en: "Why might it matter that the UN's court hears countries, not people?",
              es: "¿Por qué importa que la corte de la ONU juzgue a países y no a personas?" } },

  { id: "agencies", source: "https://www.un.org/en/about-us/un-system",
    title: { en: "Agencies, funds, and programmes", es: "Organismos, fondos y programas" },
    body: { en: "Much of the UN's work happens through bodies like UNICEF for children, the World Food Programme for hunger, UNHCR for refugees, and the World Health Organization for health. Some are part of the UN itself; others are independent specialized agencies that work with it.",
            es: "Gran parte del trabajo de la ONU se realiza mediante entidades como UNICEF para la infancia, el Programa Mundial de Alimentos contra el hambre, ACNUR para las personas refugiadas y la Organización Mundial de la Salud. Algunas forman parte de la ONU; otras son organismos especializados independientes que colaboran con ella." },
    prompt: { en: "Which UN agency's work have you seen up close?",
              es: "¿El trabajo de qué agencia de la ONU has visto de cerca?" } },

  { id: "sdgs", source: "https://sdgs.un.org/goals",
    title: { en: "The Sustainable Development Goals", es: "Los Objetivos de Desarrollo Sostenible" },
    body: { en: "In 2015, every UN member state adopted 17 goals with 169 targets to reach by 2030. They cover poverty, health, education, climate, cities, peace, and more. They apply to every country, including the United States, and to every city.",
            es: "En 2015, todos los Estados miembros de la ONU adoptaron 17 objetivos con 169 metas para 2030. Abarcan pobreza, salud, educación, clima, ciudades, paz y más. Se aplican a todos los países, incluidos los Estados Unidos, y a todas las ciudades." },
    prompt: { en: "Pick one goal. Where is our city ahead, and where is it behind?",
              es: "Elijan un objetivo. ¿En qué va adelantada nuestra ciudad y en qué va atrasada?" } },

  { id: "peacekeeping", source: "https://peacekeeping.un.org/",
    title: { en: "Peacekeeping", es: "Mantenimiento de la paz" },
    body: { en: "UN peacekeepers, known as Blue Helmets, are soldiers, police, and civilians from member states who help countries move from conflict to peace. The Security Council authorizes each mission. The first mission began in 1948.",
            es: "Las fuerzas de paz de la ONU, conocidas como Cascos Azules, son militares, policías y civiles de los Estados miembros que ayudan a los países a pasar del conflicto a la paz. El Consejo de Seguridad autoriza cada misión. La primera comenzó en 1948." },
    prompt: { en: "What makes peace last after the fighting stops?",
              es: "¿Qué hace que la paz dure cuando terminan los combates?" } },

  { id: "human-rights", source: "https://www.ohchr.org/en/instruments-mechanisms/instruments/convention-rights-persons-disabilities",
    title: { en: "Human rights treaties", es: "Tratados de derechos humanos" },
    body: { en: "The Universal Declaration of Human Rights, adopted on December 10, 1948, set out rights for everyone, everywhere. It inspired binding treaties, like the Convention on the Rights of Persons with Disabilities (CRPD). A country is bound by a treaty only after it ratifies it. The United States signed the CRPD in 2009 but has not ratified it.",
            es: "La Declaración Universal de Derechos Humanos, aprobada el 10 de diciembre de 1948, enunció derechos para todas las personas, en todas partes. Inspiró tratados vinculantes, como la Convención sobre los Derechos de las Personas con Discapacidad (CDPD). Un país queda obligado por un tratado solo cuando lo ratifica. Estados Unidos firmó la CDPD en 2009, pero no la ha ratificado." },
    prompt: { en: "What changes when a country ratifies a treaty instead of only signing it?",
              es: "¿Qué cambia cuando un país ratifica un tratado en lugar de solo firmarlo?" } },

  { id: "funding", source: "https://www.un.org/en/about-us",
    title: { en: "How the UN is paid for", es: "Cómo se financia la ONU" },
    body: { en: "Member states pay assessed dues for the regular budget and for peacekeeping, set mostly by each country's ability to pay. Many UN agencies also rely on voluntary contributions from governments, foundations, and individuals.",
            es: "Los Estados miembros pagan cuotas obligatorias para el presupuesto ordinario y para el mantenimiento de la paz, fijadas sobre todo según la capacidad de pago de cada país. Muchas agencias de la ONU dependen además de contribuciones voluntarias de gobiernos, fundaciones y personas." },
    prompt: { en: "Who should decide how much each country pays, and how?",
              es: "¿Quién debería decidir cuánto paga cada país, y cómo?" } },

  { id: "una-usa", source: "https://unausa.org/",
    title: { en: "UNA-USA", es: "UNA-USA" },
    body: { en: "The United Nations Association of the USA is a grassroots movement of Americans who support the UN, organized in chapters across the country. It is a program of the UN Foundation. Chapters educate, advocate, and celebrate the UN's work locally. UNA-USA does not speak for the UN itself.",
            es: "La Asociación de las Naciones Unidas de los Estados Unidos es un movimiento de base de personas que apoyan a la ONU, organizado en capítulos por todo el país. Es un programa de la Fundación de las Naciones Unidas. Los capítulos educan, abogan y celebran localmente el trabajo de la ONU. UNA-USA no habla en nombre de la ONU." },
    prompt: { en: "Why did you join, and why might your neighbor?",
              es: "¿Por qué te uniste, y por qué podría unirse tu vecino?" } },

  { id: "languages", source: "https://www.un.org/en/our-work/official-languages",
    title: { en: "Why six languages", es: "Por qué seis idiomas" },
    body: { en: "The UN has six official languages: Arabic, Chinese, English, French, Russian, and Spanish. Major meetings are interpreted into all six, and key documents are published in each. It's why Chapter Compass speaks them too.",
            es: "La ONU tiene seis idiomas oficiales: árabe, chino, español, francés, inglés y ruso. Las reuniones principales se interpretan a los seis y los documentos clave se publican en cada uno. Por eso Chapter Compass también los habla." },
    prompt: { en: "Which languages does our chapter need to reach everyone in our city?",
              es: "¿Qué idiomas necesita nuestro capítulo para llegar a toda nuestra ciudad?" } }
];
