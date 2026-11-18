/*
 * Local issues and how they connect to the UN.
 * Each issue lists SDG targets (paraphrased, with the official target number),
 * one UN connection, related observance ids (from data/observances.js),
 * discussion prompts, and partner types to invite.
 *
 * Sources:
 *   SDG targets: https://sdgs.un.org/goals (paraphrased in plain language)
 *   CRPD:        https://www.ohchr.org/en/instruments-mechanisms/instruments/convention-rights-persons-disabilities
 *   UDHR:        https://www.un.org/en/about-us/universal-declaration-of-human-rights
 * Last verified: November 2026.
 */
window.CC = window.CC || {};
window.CC.issues = [
  {
    id: "transit",
    name: { en: "Transit and getting around", es: "Transporte y movilidad" },
    targets: [
      { t: "11.2", en: "Safe, affordable, accessible transport for everyone.", es: "Transporte seguro, asequible y accesible para todas las personas." },
      { t: "9.1",  en: "Reliable, resilient infrastructure people can actually use.", es: "Infraestructura fiable y resiliente que la gente realmente pueda usar." },
      { t: "3.6",  en: "Cut deaths and injuries from road traffic.", es: "Reducir las muertes y lesiones por accidentes de tráfico." }
    ],
    un: { en: "Target 11.2 names Disabled people, older people, women and children as riders transit must serve.",
          es: "La meta 11.2 nombra a personas Discapacitadas, personas mayores, mujeres y niñez como usuarios a los que el transporte debe servir." },
    days: ["cities-day", "road-victims", "habitat-day"],
    prompts: [
      { en: "Which trip in our city is hardest without a car? Who makes it every day?", es: "¿Qué trayecto de nuestra ciudad es más difícil sin auto? ¿Quién lo hace cada día?" },
      { en: "If an elevator is out, what happens to a wheelchair user's commute?", es: "Si un ascensor no funciona, ¿qué pasa con el trayecto de una persona usuaria de silla de ruedas?" },
      { en: "What would it take to make transit free or reduced-fare for people who need it most?", es: "¿Qué haría falta para que el transporte sea gratuito o más barato para quienes más lo necesitan?" }
    ],
    partners: { en: ["Transit rider groups", "Disability rights organizations", "Street-safety advocates", "Your transit agency's accessibility office"],
                es: ["Grupos de usuarios del transporte", "Organizaciones de derechos de personas Discapacitadas", "Defensores de la seguridad vial", "Oficina de accesibilidad de tu agencia de transporte"] }
  },
  {
    id: "housing",
    name: { en: "Housing", es: "Vivienda" },
    targets: [
      { t: "11.1", en: "Adequate, safe and affordable housing for all.", es: "Vivienda adecuada, segura y asequible para todas las personas." },
      { t: "1.4",  en: "Equal rights to economic resources and basic services.", es: "Igualdad de derechos a los recursos económicos y servicios básicos." }
    ],
    un: { en: "Article 25 of the Universal Declaration of Human Rights includes housing in the right to an adequate standard of living.",
          es: "El artículo 25 de la Declaración Universal de Derechos Humanos incluye la vivienda en el derecho a un nivel de vida adecuado." },
    days: ["habitat-day", "poverty-day", "cities-day"],
    prompts: [
      { en: "How many accessible, affordable units exist in our city, and who knows the number?", es: "¿Cuántas viviendas accesibles y asequibles hay en nuestra ciudad, y quién conoce la cifra?" },
      { en: "What does 'adequate' housing mean during a heat wave?", es: "¿Qué significa una vivienda 'adecuada' durante una ola de calor?" },
      { en: "Which local policy could our members support this year?", es: "¿Qué política local podrían apoyar nuestros miembros este año?" }
    ],
    partners: { en: ["Tenant unions", "Housing counseling agencies", "Centers for independent living", "Community land trusts"],
                es: ["Sindicatos de inquilinos", "Agencias de asesoría de vivienda", "Centros de vida independiente", "Fideicomisos comunitarios de tierras"] }
  },
  {
    id: "heat",
    name: { en: "Extreme heat and climate", es: "Calor extremo y clima" },
    targets: [
      { t: "13.1", en: "Strengthen resilience to climate hazards and disasters.", es: "Fortalecer la resiliencia ante riesgos climáticos y desastres." },
      { t: "11.5", en: "Reduce disaster deaths, focusing on people most at risk.", es: "Reducir las muertes por desastres, con atención a quienes corren más riesgo." },
      { t: "11.7", en: "Green, public spaces that are accessible to everyone.", es: "Espacios verdes y públicos accesibles para todas las personas." }
    ],
    un: { en: "Target 11.7 calls for green public spaces accessible to women, children, older people and Disabled people.",
          es: "La meta 11.7 pide espacios verdes públicos accesibles para mujeres, niñez, personas mayores y personas Discapacitadas." },
    days: ["mother-earth", "environment-day", "cities-day"],
    prompts: [
      { en: "Which blocks have the least shade, and who lives there?", es: "¿Qué cuadras tienen menos sombra y quién vive allí?" },
      { en: "Can a Disabled neighbor reach the nearest cooling center?", es: "¿Puede una vecina Discapacitada llegar al centro de enfriamiento más cercano?" },
      { en: "What would a heat plan written by residents include?", es: "¿Qué incluiría un plan de calor escrito por los propios residentes?" }
    ],
    partners: { en: ["Tree and parks groups", "Climate justice organizations", "Public health departments", "Libraries and recreation centers"],
                es: ["Grupos de árboles y parques", "Organizaciones de justicia climática", "Departamentos de salud pública", "Bibliotecas y centros recreativos"] }
  },
  {
    id: "voting",
    name: { en: "Voting access", es: "Acceso al voto" },
    targets: [
      { t: "16.7", en: "Inclusive, participatory decision-making at every level.", es: "Decisiones inclusivas y participativas en todos los niveles." },
      { t: "10.2", en: "Political inclusion of all, regardless of disability, age, race or status.", es: "Inclusión política de todas las personas, sin importar discapacidad, edad, raza o condición." }
    ],
    un: { en: "Article 29 of the CRPD protects Disabled people's right to vote, including accessible polling places and help from a person of their choice.",
          es: "El artículo 29 de la CDPD protege el derecho al voto de las personas Discapacitadas, con centros accesibles y ayuda de una persona de su elección." },
    days: ["democracy-day", "disability-day"],
    prompts: [
      { en: "Is your own polling place step-free? How would you find out?", es: "¿Tu centro de votación no tiene escalones? ¿Cómo lo averiguarías?" },
      { en: "Who in our community is eligible to vote but faces the most barriers?", es: "¿Quién en nuestra comunidad tiene derecho a votar pero enfrenta más barreras?" },
      { en: "How can we stay strictly nonpartisan while still helping people vote?", es: "¿Cómo seguimos siendo estrictamente no partidistas mientras ayudamos a votar?" }
    ],
    partners: { en: ["Nonpartisan voter groups", "Election officials", "Disability voting coalitions", "Libraries"],
                es: ["Grupos de votantes no partidistas", "Autoridades electorales", "Coaliciones de voto de personas Discapacitadas", "Bibliotecas"] }
  },
  {
    id: "disability",
    name: { en: "Disability rights", es: "Derechos de las personas Discapacitadas" },
    targets: [
      { t: "10.2", en: "Social, economic and political inclusion, regardless of disability.", es: "Inclusión social, económica y política, sin importar la discapacidad." },
      { t: "4.5",  en: "Equal access to education for Disabled students.", es: "Igualdad de acceso a la educación para estudiantes Discapacitados." },
      { t: "8.5",  en: "Decent work and equal pay, including for Disabled workers.", es: "Trabajo decente e igual salario, también para trabajadores Discapacitados." }
    ],
    un: { en: "The Convention on the Rights of Persons with Disabilities (CRPD), adopted in 2006, is the UN's disability rights treaty. Article 9 covers accessibility.",
          es: "La Convención sobre los Derechos de las Personas con Discapacidad (CDPD), aprobada en 2006, es el tratado de la ONU sobre estos derechos. El artículo 9 trata la accesibilidad." },
    days: ["disability-day", "crpd-anniversary", "sign-languages", "autism-day"],
    prompts: [
      { en: "Nothing about us without us: which Disabled-led groups should co-lead this?", es: "Nada sobre nosotros sin nosotros: ¿qué grupos dirigidos por personas Discapacitadas deberían codirigir esto?" },
      { en: "Pick one CRPD article. How would our city grade on it?", es: "Elijan un artículo de la CDPD. ¿Qué calificación tendría nuestra ciudad?" },
      { en: "What does our own chapter need to fix to be accessible?", es: "¿Qué debe corregir nuestro propio capítulo para ser accesible?" }
    ],
    partners: { en: ["Disabled-led organizations", "Centers for independent living", "Deaf and hard of hearing groups", "Your city's disability commission"],
                es: ["Organizaciones dirigidas por personas Discapacitadas", "Centros de vida independiente", "Grupos de personas sordas e hipoacúsicas", "Comisión de discapacidad de tu ciudad"] }
  },
  {
    id: "refugees",
    name: { en: "Refugees and newcomers", es: "Personas refugiadas y recién llegadas" },
    targets: [
      { t: "10.7", en: "Safe, orderly and responsible migration.", es: "Migración segura, ordenada y responsable." },
      { t: "8.8",  en: "Labor rights and safe work for everyone, including migrant workers.", es: "Derechos laborales y trabajo seguro para todas las personas, incluidos los migrantes." }
    ],
    un: { en: "The 1951 Refugee Convention defines who is a refugee. UNHCR, the UN Refugee Agency, works to protect them.",
          es: "La Convención sobre el Estatuto de los Refugiados de 1951 define quién es refugiado. ACNUR, la Agencia de la ONU para los Refugiados, trabaja para protegerlos." },
    days: ["refugee-day", "humanitarian-day", "mother-language"],
    prompts: [
      { en: "Which communities have arrived here most recently? What do they say they need?", es: "¿Qué comunidades han llegado más recientemente? ¿Qué dicen que necesitan?" },
      { en: "What languages should our next flyer be in?", es: "¿En qué idiomas debería estar nuestro próximo volante?" },
      { en: "How can we welcome newcomers into the chapter itself?", es: "¿Cómo podemos dar la bienvenida a personas recién llegadas al capítulo?" }
    ],
    partners: { en: ["Resettlement agencies", "Immigrant-led community groups", "ESL programs", "Faith communities"],
                es: ["Agencias de reasentamiento", "Grupos comunitarios dirigidos por inmigrantes", "Programas de inglés como segundo idioma", "Comunidades de fe"] }
  },
  {
    id: "food",
    name: { en: "Food security", es: "Seguridad alimentaria" },
    targets: [
      { t: "2.1",  en: "End hunger and give everyone access to safe, nutritious food.", es: "Poner fin al hambre y dar acceso a alimentos sanos y nutritivos." },
      { t: "12.3", en: "Halve food waste.", es: "Reducir a la mitad el desperdicio de alimentos." }
    ],
    un: { en: "Article 25 of the Universal Declaration of Human Rights includes food in the right to an adequate standard of living.",
          es: "El artículo 25 de la Declaración Universal de Derechos Humanos incluye la alimentación en el derecho a un nivel de vida adecuado." },
    days: ["food-day", "poverty-day"],
    prompts: [
      { en: "Where is the nearest grocery store with fresh food, and can you get there without a car?", es: "¿Dónde está la tienda con alimentos frescos más cercana, y se puede llegar sin auto?" },
      { en: "Where does surplus food in our city end up?", es: "¿Adónde va el excedente de alimentos de nuestra ciudad?" }
    ],
    partners: { en: ["Food banks", "Community gardens", "School meal programs", "Mutual aid networks"],
                es: ["Bancos de alimentos", "Huertos comunitarios", "Programas de comidas escolares", "Redes de ayuda mutua"] }
  },
  {
    id: "water",
    name: { en: "Clean water", es: "Agua limpia" },
    targets: [
      { t: "6.1", en: "Safe, affordable drinking water for all.", es: "Agua potable segura y asequible para todas las personas." },
      { t: "6.3", en: "Better water quality and less pollution.", es: "Mejor calidad del agua y menos contaminación." }
    ],
    un: { en: "In 2010 the UN General Assembly recognized the human right to water and sanitation (resolution 64/292).",
          es: "En 2010 la Asamblea General de la ONU reconoció el derecho humano al agua y al saneamiento (resolución 64/292)." },
    days: ["water-day", "toilet-day", "oceans-day"],
    prompts: [
      { en: "Where does our tap water come from?", es: "¿De dónde viene el agua de nuestro grifo?" },
      { en: "Are there lead service lines in our neighborhoods?", es: "¿Hay tuberías de plomo en nuestros barrios?" }
    ],
    partners: { en: ["Water utilities", "Watershed associations", "Environmental justice groups"],
                es: ["Empresas de agua", "Asociaciones de cuencas", "Grupos de justicia ambiental"] }
  },
  {
    id: "gender",
    name: { en: "Gender equity", es: "Equidad de género" },
    targets: [
      { t: "5.5", en: "Women's full participation and equal leadership.", es: "Participación plena de las mujeres e igualdad en el liderazgo." },
      { t: "5.2", en: "End violence against women and girls.", es: "Eliminar la violencia contra las mujeres y las niñas." }
    ],
    un: { en: "CEDAW, adopted by the UN General Assembly in 1979, is often called an international bill of rights for women.",
          es: "La CEDAW, aprobada por la Asamblea General de la ONU en 1979, suele describirse como una carta internacional de derechos de las mujeres." },
    days: ["womens-day", "women-science", "violence-women"],
    prompts: [
      { en: "Who holds leadership roles in our city, and who doesn't?", es: "¿Quién ocupa cargos de liderazgo en nuestra ciudad, y quién no?" },
      { en: "How do Disabled women experience the barriers we're discussing?", es: "¿Cómo viven las mujeres Discapacitadas las barreras que estamos discutiendo?" }
    ],
    partners: { en: ["Women's leadership groups", "Domestic violence service providers", "LGBTQ+ centers"],
                es: ["Grupos de liderazgo de mujeres", "Servicios contra la violencia doméstica", "Centros LGBTQ+"] }
  },
  {
    id: "youth",
    name: { en: "Youth and education", es: "Juventud y educación" },
    targets: [
      { t: "4.7", en: "Education in human rights, peace and global citizenship.", es: "Educación en derechos humanos, paz y ciudadanía mundial." },
      { t: "4.4", en: "Skills for decent jobs.", es: "Habilidades para empleos dignos." }
    ],
    un: { en: "Target 4.7 calls for global citizenship education, which is most of what a UNA chapter does on a good night.",
          es: "La meta 4.7 pide educación para la ciudadanía mundial, que es casi todo lo que hace un capítulo de UNA en una buena noche." },
    days: ["youth-day", "education", "un-day"],
    prompts: [
      { en: "Which schools near us have a Model UN team, and which don't?", es: "¿Qué escuelas cercanas tienen equipo de Modelo de la ONU, y cuáles no?" },
      { en: "How can students lead, not just attend?", es: "¿Cómo pueden los estudiantes liderar, y no solo asistir?" }
    ],
    partners: { en: ["Campus chapters", "Model UN programs", "School districts", "Youth councils"],
                es: ["Capítulos universitarios", "Programas de Modelo de la ONU", "Distritos escolares", "Consejos juveniles"] }
  },
  {
    id: "peace",
    name: { en: "Peace and community safety", es: "Paz y seguridad comunitaria" },
    targets: [
      { t: "16.1", en: "Significantly reduce all forms of violence.", es: "Reducir significativamente todas las formas de violencia." },
      { t: "16.7", en: "Inclusive, participatory decision-making.", es: "Decisiones inclusivas y participativas." }
    ],
    un: { en: "Article 1 of the UN Charter makes maintaining international peace and security the UN's first purpose.",
          es: "El artículo 1 de la Carta de la ONU establece el mantenimiento de la paz y la seguridad internacionales como primer propósito." },
    days: ["peace-day", "tolerance-day", "mandela-day"],
    prompts: [
      { en: "What makes a neighborhood feel safe to the people who live there?", es: "¿Qué hace que un barrio se sienta seguro para quienes viven allí?" },
      { en: "Which local peacebuilders deserve a UN Day award?", es: "¿Qué constructores de paz locales merecen un reconocimiento el Día de la ONU?" }
    ],
    partners: { en: ["Violence-interruption programs", "Interfaith councils", "Mediation centers"],
                es: ["Programas de interrupción de la violencia", "Consejos interreligiosos", "Centros de mediación"] }
  }
];
