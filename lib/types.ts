export type Platform = "linkedin" | "instagram" | "facebook";
export type Tone = "professional" | "casual" | "expert" | "humorous";
export type Goal = "promotion" | "education" | "recruitment" | "engagement" | "announcement";

export interface PostFormData {
  industry: string;
  companyName: string;
  goal: Goal;
  tone: Tone;
  platform: Platform;
  additionalContext: string;
}

export interface GeneratedPost {
  text: string;
  hashtags: string[];
  imageKeywords: string[];
  callToAction: string;
}

export interface UnsplashPhoto {
  id: string;
  url: string;
  thumbUrl: string;
  authorName: string;
  authorUrl: string;
  downloadUrl: string;
}
