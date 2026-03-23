export interface Skill {
  id: string;
  name: string;
  description: string;
  category: CategoryKey;
  sector: SectorKey;
  importance: ImportanceLevel;
  source: "kalfa" | "tezgah" | "saas-launcher";
  tags: string[];
  slug: string;
  filePath: string;
}

export type CategoryKey =
  | "ai-automation"
  | "content"
  | "consulting"
  | "customer-success"
  | "design"
  | "development"
  | "ecommerce"
  | "email"
  | "finance"
  | "marketing"
  | "product"
  | "productivity"
  | "sales"
  | "seo"
  | "social-media"
  | "startup"
  | "saas";

export type SectorKey =
  | "teknoloji"
  | "pazarlama"
  | "is-yonetimi"
  | "satis"
  | "tasarim"
  | "kisisel-gelisim"
  | "girisimcilik";

export type ImportanceLevel = "kritik" | "yuksek" | "orta" | "dusuk";

export interface Category {
  key: CategoryKey;
  name: string;
  description: string;
  sector: SectorKey;
  icon: string;
}

export interface Sector {
  key: SectorKey;
  name: string;
  color: string;
}

export interface ImportanceInfo {
  key: ImportanceLevel;
  name: string;
  color: string;
}
