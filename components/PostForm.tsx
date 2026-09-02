"use client";

import { useState } from "react";
import { PostFormData, Platform, Tone, Goal } from "@/lib/types";

interface Props {
  onSubmit: (data: PostFormData) => void;
  isLoading: boolean;
}

const platforms: { value: Platform; label: string; icon: string }[] = [
  { value: "linkedin", label: "LinkedIn", icon: "in" },
  { value: "instagram", label: "Instagram", icon: "ig" },
  { value: "facebook", label: "Facebook", icon: "fb" },
];

const tones: { value: Tone; label: string; desc: string }[] = [
  { value: "professional", label: "Profesjonalny", desc: "Poważny, bez slangu" },
  { value: "casual", label: "Luźny", desc: "Przyjazny, jak do kolegi" },
  { value: "expert", label: "Ekspercki", desc: "Dane, insighty, autorytet" },
  { value: "humorous", label: "Humorystyczny", desc: "Lekki, z dystansem" },
];

const goals: { value: Goal; label: string }[] = [
  { value: "promotion", label: "🎯 Promocja / sprzedaż" },
  { value: "education", label: "📚 Edukacja" },
  { value: "recruitment", label: "💼 Rekrutacja" },
  { value: "engagement", label: "💬 Zaangażowanie" },
  { value: "announcement", label: "📣 Ogłoszenie" },
];

export default function PostForm({ onSubmit, isLoading }: Props) {
  const [form, setForm] = useState<PostFormData>({
    industry: "",
    companyName: "",
    goal: "promotion",
    tone: "professional",
    platform: "linkedin",
    additionalContext: "",
  });

  function set<K extends keyof PostFormData>(key: K, value: PostFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit() {
    if (!form.industry.trim()) return;
    onSubmit(form);
  }

  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 space-y-6">
      {/* Platform selector */}
      <div>
        <label className="block text-xs text-white/40 mb-2 font-medium">Platforma</label>
        <div className="grid grid-cols-3 gap-2">
          {platforms.map((p) => (
            <button
              key={p.value}
              onClick={() => set("platform", p.value)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                form.platform === p.value
                  ? "bg-violet-600 text-white"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Company name */}
      <div>
        <label className="block text-xs text-white/40 mb-2 font-medium">
          Nazwa firmy <span className="text-white/20">(opcjonalne)</span>
        </label>
        <input
          type="text"
          placeholder="np. Acme Studio"
          value={form.companyName}
          onChange={(e) => set("companyName", e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
        />
      </div>

      {/* Industry */}
      <div>
        <label className="block text-xs text-white/40 mb-2 font-medium">
          Branża <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="np. marketing cyfrowy, e-commerce, fintech..."
          value={form.industry}
          onChange={(e) => set("industry", e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
        />
      </div>

      {/* Goal */}
      <div>
        <label className="block text-xs text-white/40 mb-2 font-medium">Cel postu</label>
        <div className="grid grid-cols-1 gap-1.5">
          {goals.map((g) => (
            <button
              key={g.value}
              onClick={() => set("goal", g.value)}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                form.goal === g.value
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                  : "text-white/50 hover:bg-white/5 hover:text-white/70 border border-transparent"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tone */}
      <div>
        <label className="block text-xs text-white/40 mb-2 font-medium">Ton wypowiedzi</label>
        <div className="grid grid-cols-2 gap-2">
          {tones.map((t) => (
            <button
              key={t.value}
              onClick={() => set("tone", t.value)}
              className={`text-left px-3 py-2 rounded-lg text-xs transition-all ${
                form.tone === t.value
                  ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                  : "text-white/50 hover:bg-white/5 hover:text-white/70 border border-transparent"
              }`}
            >
              <div className="font-medium">{t.label}</div>
              <div className="text-white/30 mt-0.5">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Context */}
      <div>
        <label className="block text-xs text-white/40 mb-2 font-medium">
          Dodatkowy kontekst <span className="text-white/20">(opcjonalne)</span>
        </label>
        <textarea
          rows={3}
          placeholder="np. Właśnie wdrożyliśmy nową funkcję X, chcemy ogłosić partnerstwo z Y..."
          value={form.additionalContext}
          onChange={(e) => set("additionalContext", e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all resize-none"
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isLoading || !form.industry.trim()}
        className="w-full py-2.5 rounded-lg font-medium text-sm bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generuję post...
          </span>
        ) : (
          "Generuj post →"
        )}
      </button>
    </div>
  );
}
