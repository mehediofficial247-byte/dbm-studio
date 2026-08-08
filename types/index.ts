export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  image: string;
  gallery: string[];
  problem: string;
  solution: string;
  process: string[];
  features: string[];
  performance: { label: string; value: string }[];
  liveUrl: string;
  githubUrl: string;
  client: string;
  role: string;
  duration: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
  startingPrice: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  faqs: { question: string; answer: string }[];
  rating: number;
  reviewCount: number;
  tech: string[];
}

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  duration: string;
  views: string;
  publishedAt: string;
  thumbnail: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  org: string;
  description: string;
  type: "experience" | "education" | "achievement";
}

export interface FaqItem {
  question: string;
  answer: string;
}
