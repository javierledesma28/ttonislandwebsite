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
  | "roleplay";

export const CATEGORY_LABEL: Record<GalleryCategory | "todos", string> = {
  todos: "TODO",
  origen: "ORIGEN",
  branding: "BRANDING",
  lore: "LORE",
  eventos: "EVENTOS",
  comunidad: "COMUNIDAD",
  roleplay: "ROLEPLAY",
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
];
