import { PostFormData, GeneratedPost } from "./types";

export function buildSystemPrompt(): string {
  return `You are an expert social media copywriter with 10+ years of experience creating viral, high-engagement content for B2B and B2C companies across all industries.

Your task is to generate a social media post based on the parameters provided by the user.

CRITICAL: You MUST respond ONLY with a valid JSON object. No markdown, no backticks, no explanation — raw JSON only.

JSON schema (follow exactly):
{
  "text": "The main post body. Use line breaks (\\n) for readability. Emojis are welcome when appropriate for the tone. Do NOT include hashtags in the text — they go in a separate field.",
  "hashtags": ["array", "of", "hashtags", "without", "the", "hash", "symbol"],
  "imageKeywords": ["2-4 short English keywords", "suitable for stock photo search", "describing ideal image for this post"],
  "callToAction": "A single short sentence CTA (e.g. 'Leave a comment below 👇' or 'Apply now via the link in bio')"
}

PLATFORM GUIDELINES:
- linkedin: Professional tone even when casual, 150-300 words, storytelling structure (hook → insight → value → CTA), 3-5 hashtags
- instagram: Visual-first, punchy opener, 80-150 words, 8-15 hashtags, emoji-rich when casual
- facebook: Conversational, 100-200 words, question-based CTA, 2-4 hashtags

TONE GUIDELINES:
- professional: Authoritative, polished, no slang
- casual: Friendly, relatable, like talking to a peer
- expert: Data-driven, insightful, thought leadership
- humorous: Witty, light, self-aware — but never unprofessional

GOAL GUIDELINES:
- promotion: Highlight benefits, create urgency, feature-focused
- education: Teach something valuable, position as authority
- recruitment: Sell company culture, inspire candidates
- engagement: Ask questions, invite opinions, spark discussion
- announcement: News-forward, exciting, share-worthy

Always write in the language of the user's input (if they write in Polish, generate the post in Polish).`;
}

export function buildUserPrompt(data: PostFormData): string {
  const goalLabels: Record<string, string> = {
    promotion: "Promotion / Sales",
    education: "Educational content",
    recruitment: "Recruitment",
    engagement: "Community engagement",
    announcement: "Announcement / News",
  };

  const toneLabels: Record<string, string> = {
    professional: "Professional",
    casual: "Casual & friendly",
    expert: "Expert / Thought leader",
    humorous: "Humorous",
  };

  return `Generate a ${data.platform.toUpperCase()} post for the following company:

Company name: ${data.companyName || "not specified"}
Industry: ${data.industry}
Post goal: ${goalLabels[data.goal]}
Tone: ${toneLabels[data.tone]}
Platform: ${data.platform}
Additional context / topic: ${data.additionalContext || "none — pick a relevant topic for this industry and goal"}

Generate the post now. Return only the JSON object.`;
}

export function parseAIResponse(raw: string): GeneratedPost {
  // Strip any accidental markdown fences
  const clean = raw.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);

  return {
    text: parsed.text ?? "",
    hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags : [],
    imageKeywords: Array.isArray(parsed.imageKeywords) ? parsed.imageKeywords : [],
    callToAction: parsed.callToAction ?? "",
  };
}
