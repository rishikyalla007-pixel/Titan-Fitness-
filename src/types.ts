export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  badge?: string;
  color: string;
}

export interface PlanItem {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  popular: boolean;
  features: string[];
  badge?: string;
}

export interface TrainerItem {
  name: string;
  role: string;
  specialty: string;
  experience: string;
  image: string;
  socials: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
}

export interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
  transformation?: {
    beforeWeight: string;
    afterWeight: string;
    duration: string;
  };
}

export interface GalleryItem {
  id: string;
  url: string;
  category: "Strength" | "Cardio" | "Recovery" | "Combat" | "Mindfulness";
  title: string;
}
