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
  // Sept 2021 — primeras semanas
  {
    filename: "2021-09-02_medical-banner.png",
    category: "branding",
    year: 2021,
    caption: "Banner médico — primeros días",
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
    filename: "2021-10-09_bici.jpg",
    category: "eventos",
    year: 2021,
    caption: "¡Llegan las bicis!",
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
