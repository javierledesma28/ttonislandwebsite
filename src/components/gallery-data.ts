export interface GalleryItem {
  filename: string;
  category: GalleryCategory;
  year: number;
  caption: string;
}

export type GalleryCategory =
  | "origen"
  | "branding"
  | "lore"
  | "eventos"
  | "comunidad"
  | "roleplay"
  | "bases"
  | "fotos";

export const CATEGORY_LABEL: Record<GalleryCategory | "todos", string> = {
  todos: "TODO",
  origen: "ORIGEN",
  branding: "BRANDING",
  lore: "LORE",
  eventos: "EVENTOS",
  comunidad: "COMUNIDAD",
  roleplay: "ROLEPLAY",
  bases: "BASES ÉPICAS",
  fotos: "OJO TETÓN",
};

export const GALLERY_ITEMS: GalleryItem[] = [
  // Día 1 — el nacimiento (28-Ago-2021)
  {
    filename: "2021-08-28_banner-original.jpg",
    category: "origen",
    year: 2021,
    caption: "Banner del primer día — 28 de agosto de 2021",
  },
  {
    filename: "2021-08-28_letras.jpg",
    category: "origen",
    year: 2021,
    caption: "Las letras del logo original",
  },
  {
    filename: "2021-08-28_IP.jpg",
    category: "origen",
    year: 2021,
    caption: "La IP del server, día uno",
  },
  {
    filename: "2021-08-28_frente.jpg",
    category: "origen",
    year: 2021,
    caption: "El frente del servidor — primera carta de presentación pública",
  },
  {
    filename: "2021-08-28_scum-hd.png",
    category: "origen",
    year: 2021,
    caption: "Logo SCUM-HD del primer día",
  },
  // Sept 2021 — primeras semanas
  {
    filename: "2021-09-02_medical-banner.png",
    category: "branding",
    year: 2021,
    caption: "Banner médico — primeros días",
  },
  {
    filename: "2021-09-02_DjweFEwX.jpg",
    category: "lore",
    year: 2021,
    caption: "El universo SCUM en imagen — material gráfico de los primeros días",
  },
  {
    filename: "2021-09-02_99db0d96.jpg",
    category: "lore",
    year: 2021,
    caption: "Screenshot oficial SCUM — septiembre 2021",
  },
  {
    filename: "2021-09-02_ca5e73e.jpg",
    category: "lore",
    year: 2021,
    caption: "El mundo SCUM, en sus inicios",
  },
  {
    filename: "2021-09-02_951f209.jpg",
    category: "lore",
    year: 2021,
    caption: "Concept SCUM — material de prensa de los primeros meses",
  },
  {
    filename: "2021-09-02_t17rit26qbq11.jpg",
    category: "lore",
    year: 2021,
    caption: "Material gráfico oficial — el ADN visual del juego",
  },
  {
    filename: "2021-09-02_fdcb39e.jpg",
    category: "lore",
    year: 2021,
    caption: "Imagen del universo SCUM — atmósfera del mundo donde vivimos cinco años",
  },
  {
    filename: "2021-09-02_943853.jpg",
    category: "lore",
    year: 2021,
    caption: "Postal del mundo SCUM — el escenario de todas las historias",
  },
  {
    filename: "2021-09-08_selfie-epica.png",
    category: "comunidad",
    year: 2021,
    caption: "Así luce J@voc — selfie épica del owner, septiembre de 2021",
  },
  {
    filename: "2021-09-10_tton-scum-banner.jpg",
    category: "branding",
    year: 2021,
    caption: "Banner oficial TTON-SCUM",
  },
  {
    filename: "2021-09-10_reglas-generales.png",
    category: "branding",
    year: 2021,
    caption: "Reglas generales del server",
  },
  {
    filename: "2021-09-10_reglas-raid.png",
    category: "branding",
    year: 2021,
    caption: "Reglas de raid",
  },
  {
    filename: "2021-09-10_acostado.png",
    category: "branding",
    year: 2021,
    caption: "'Acostado' — propaganda interna, alguien que dormía cuando no debía",
  },
  {
    filename: "2021-09-20_drdealer.png",
    category: "roleplay",
    year: 2021,
    caption: "Dr. Dealer — uno de los primeros personajes icónicos del RP",
  },
  {
    filename: "2021-09-21_restart.png",
    category: "branding",
    year: 2021,
    caption: "El restart diario a las 5 AM Argentina — religión del primer año",
  },
  {
    filename: "2021-09-23_mas-airdrops.png",
    category: "eventos",
    year: 2021,
    caption: "¡Más airdrops! — la dopamina del loot caía del cielo",
  },
  {
    filename: "2021-09-15_carrera-cuatris.png",
    category: "eventos",
    year: 2021,
    caption: "Carrera de cuatriciclos",
  },
  {
    filename: "2021-09-16_normalidad.png",
    category: "branding",
    year: 2021,
    caption: "Volvió la normalidad",
  },
  {
    filename: "2021-09-16_open-comercio.png",
    category: "branding",
    year: 2021,
    caption: "Apertura del comercio",
  },
  {
    filename: "2021-10-07_car.png",
    category: "lore",
    year: 2021,
    caption: "Los autos llegan a la isla — un antes y un después en la movilidad",
  },
  {
    filename: "2021-10-09_bici.jpg",
    category: "eventos",
    year: 2021,
    caption: "¡Llegan las bicis!",
  },
  {
    filename: "2021-10-09_gportal.png",
    category: "branding",
    year: 2021,
    caption: "G-Portal — el hosting que aguantó los primeros años del server",
  },
  {
    filename: "2021-10-13_offline.jpg",
    category: "branding",
    year: 2021,
    caption: "'Server offline' — cada mantenimiento era un mini-evento de la comunidad",
  },
  {
    filename: "2021-10-13_scum-logo.jpg",
    category: "branding",
    year: 2021,
    caption: "Logo oficial SCUM — la marca que nos definió",
  },
  {
    filename: "2021-10-14_webcam.png",
    category: "comunidad",
    year: 2021,
    caption: "Cámara web — capturando la vida del server en directo",
  },
  {
    filename: "2021-10-18_antihack.jpeg",
    category: "branding",
    year: 2021,
    caption: "Antihack — la cruzada contra los tramposos, desde el día uno",
  },
  {
    filename: "2021-11-03_4242560.jpg",
    category: "lore",
    year: 2021,
    caption: "Fotograma SCUM — material gráfico que circulaba en propaganda interna",
  },
  {
    filename: "2022-01-26_24horas.jpg",
    category: "eventos",
    year: 2022,
    caption: "¡24 horas! — anuncio de un evento maratónico de la comunidad",
  },
  {
    filename: "2021-10-12_mechs.png",
    category: "lore",
    year: 2021,
    caption: "Los Mechs — temidos enemigos de la isla",
  },
  {
    filename: "2022-01-26_zombies.jpg",
    category: "lore",
    year: 2022,
    caption: "Zombies en la isla",
  },
  {
    filename: "2022-10-13_dano-habilitado.png",
    category: "branding",
    year: 2022,
    caption: "Daño habilitado — un cambio mayor que ajustó toda la economía PVP",
  },
  // 2023 — Outfreak/Warfare/Banana
  {
    filename: "2023-05-08_vehiculos-perdidos.png",
    category: "branding",
    year: 2023,
    caption: "Vehículos perdidos",
  },
  {
    filename: "2023-05-14_wipe-vehiculos.png",
    category: "branding",
    year: 2023,
    caption: "Wipe de vehículos",
  },
  {
    filename: "2023-05-18_inmobiliaria.png",
    category: "roleplay",
    year: 2023,
    caption: "Banner Inmobiliaria — economía RP",
  },
  {
    filename: "2023-05-18_proximamente.png",
    category: "branding",
    year: 2023,
    caption: "Próximamente...",
  },
  {
    filename: "2023-05-20_welcome.png",
    category: "branding",
    year: 2023,
    caption: "Bienvenido — era Outfreak/Warfare",
  },
  {
    filename: "2023-06-08_fuerza-militarizada.jpg",
    category: "lore",
    year: 2023,
    caption: "La fuerza militarizada... está llegando",
  },

  // ────────────────────────────────────────────
  // BASES ÉPICAS — del canal #bases-epicas (curadas por reacciones)
  // ────────────────────────────────────────────
  {
    filename: "2023-11-17_bases_Xemaxote_00.png",
    category: "bases",
    year: 2023,
    caption:
      "La Ciudadela — Distrito Delta de Isla Ponzoña. Una de las construcciones más fotogénicas del server. Foto: Xemaxote.",
  },
  {
    filename: "2023-07-09_bases_Xemaxote_01.png",
    category: "bases",
    year: 2023,
    caption: "Base PVE de Outfreak Island — el refugio de los pioneros del 2023. Foto: Xemaxote.",
  },
  {
    filename: "2023-07-09_bases_Xemaxote_03.png",
    category: "bases",
    year: 2023,
    caption: "Distrito Zero — el barrio roleplay de Outfreak donde se cocinaba lore en cada esquina. Foto: Xemaxote.",
  },
  {
    filename: "2023-07-09_bases_Xemaxote_04.png",
    category: "bases",
    year: 2023,
    caption: "Otra esquina del Distrito Zero — Outfreak en su mejor momento. Foto: Xemaxote.",
  },
  {
    filename: "2023-11-17_bases_Xemaxote_05.png",
    category: "bases",
    year: 2023,
    caption: "Distrito Delta de Ponzoña — obra colectiva, captura de la era roleplay. Foto: Xemaxote.",
  },
  {
    filename: "2025-06-14_bases_T-TON_Island_J_voc_02.png",
    category: "bases",
    year: 2025,
    caption: "Una base de la era VERMIS — captura del propio J@voc. Junio 2025.",
  },

  // ────────────────────────────────────────────
  // OJO TETÓN — del canal #fotografías (curadas por reacciones)
  // ────────────────────────────────────────────
  {
    filename: "2024-05-17_fotos_𝕸𝖔𝖗𝖙𝖆𝖑𝕲𝖆𝖙𝖔_00.jpg",
    category: "fotos",
    year: 2024,
    caption:
      '"Se dice por ahí que en algún lugar de la isla espera a ser encontrada la familia de Lobo." — Mortal Gato.',
  },
  {
    filename: "2024-03-14_fotos_Rincewind_01.png",
    category: "fotos",
    year: 2024,
    caption: '"Las inauguraciones de los bares yo las recordaba de otra manera." — Rincewind.',
  },
  {
    filename: "2024-03-17_fotos_Rincewind_02.png",
    category: "fotos",
    year: 2024,
    caption:
      '"Para cualquier plan siempre empezamos y terminamos en el bar — y eso que todavía no lo han inaugurado." — Rincewind.',
  },
  {
    filename: "2024-03-09_fotos_Alex_Rosas_03.jpg",
    category: "fotos",
    year: 2024,
    caption: '"Tres doritos después" — Alex Rosas. La frase que se convirtió en meme interno.',
  },
  {
    filename: "2024-04-18_fotos_Sita1313_04.jpg",
    category: "fotos",
    year: 2024,
    caption:
      '"No sé por qué, pero a veces el destino hace cosas." — Sita1313. Una de esas casualidades inolvidables de la isla.',
  },
  {
    filename: "2024-03-18_fotos_Rincewind_05.png",
    category: "fotos",
    year: 2024,
    caption: "Un cumpleaños en la isla — captura de Rincewind. La comunidad celebrando incluso entre zombies.",
  },
  {
    filename: "2025-02-10_fotos_T-TON_Island_J_voc_06.png",
    category: "fotos",
    year: 2025,
    caption: "J@voc, en gratitud a la comunidad y al creador de SCUM. Febrero 2025.",
  },
  {
    filename: "2024-03-14_fotos_Rincewind_07.png",
    category: "fotos",
    year: 2024,
    caption: '"Los vecinos han secuestrado a Mudo y piden rescate. PIDEN RESCATE." — Rincewind. Lore en vivo.',
  },
  {
    filename: "2025-01-09_fotos_Rincewind_08.png",
    category: "fotos",
    year: 2025,
    caption: '"Esta señal debería estar por todo el mapa." — Rincewind. Pura ironía de superviviente.',
  },
  {
    filename: "2024-04-10_fotos_Nikolai_09.png",
    category: "fotos",
    year: 2024,
    caption: "Captura silenciosa pero potente — el ojo de un Tetón anónimo de los buenos años.",
  },
  {
    filename: "2024-05-30_fotos_MrSamizilla_10.png",
    category: "fotos",
    year: 2024,
    caption: '"A veces vender me hace perder dinero." — MrSamizilla, contando la verdad del comercio en la isla.',
  },
  {
    filename: "2024-05-19_fotos_MrSamizilla_11.png",
    category: "fotos",
    year: 2024,
    caption:
      '"Pero qué calor — de buenas que el jefe me dejó media cerveza caliente en la basura." — MrSamizilla.',
  },
  {
    filename: "2025-06-18_fotos_ByCarol_12.png",
    category: "fotos",
    year: 2025,
    caption: '"Odio ir andando." — ByCarol. Cualquiera que caminó la isla sin auto entiende.',
  },
  {
    filename: "2025-01-18_fotos_Tremix_13.jpg",
    category: "fotos",
    year: 2025,
    caption:
      '"Nuevo Centlo de Entletenimieto — pita de moto, boxeo, alo de la muete, tlagos, kalaoke." — Tremix (el Chino), en su mejor personaje.',
  },
  {
    filename: "2025-01-10_fotos_𝕸𝖔𝖗𝖙𝖆𝖑𝕲𝖆𝖙𝖔_14.jpg",
    category: "fotos",
    year: 2025,
    caption: "Mortal Gato — una postal de su ojo sobre la isla.",
  },
  {
    filename: "2024-09-01_fotos_Nikolai_15.png",
    category: "fotos",
    year: 2024,
    caption:
      '"Estrenando el nuevo rol Bomb Defuser — para recoger mis extremidades si corto el cable incorrecto."',
  },
  {
    filename: "2025-03-24_fotos_𝕸𝖔𝖗𝖙𝖆𝖑𝕲𝖆𝖙𝖔_16.webp",
    category: "fotos",
    year: 2025,
    caption: "Ilustración de un Tetón por Mortal Gato — arte digital nacido de la comunidad.",
  },
  {
    filename: "2025-03-13_fotos_𝕸𝖔𝖗𝖙𝖆𝖑𝕲𝖆𝖙𝖔_17.webp",
    category: "fotos",
    year: 2025,
    caption: '"Lobo esperar nueva isla." — Mortal Gato. Esperando, siempre esperando.',
  },
];
