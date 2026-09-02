"use client";

import { GeneratedPost, Platform, UnsplashPhoto } from "@/lib/types";
import { useState } from "react";

interface Props {
  post: GeneratedPost;
  platform: Platform;
  selectedPhoto: UnsplashPhoto | null;
  editedText: string;
  onTextChange: (text: string) => void;
}

export default function PostPreview({ post, platform, selectedPhoto, editedText, onTextChange }: Props) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fullText = `${editedText}\n\n${post.callToAction}\n\n${post.hashtags.map((h) => `#${h}`).join(" ")}`;

  async function copyToClipboard() {
    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-3">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/30 uppercase tracking-wider font-medium">
          Podgląd · {platform}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1.5 rounded-lg text-xs bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
          >
            {isEditing ? "Gotowe" : "Edytuj tekst"}
          </button>
          <button
            onClick={copyToClipboard}
            className="px-3 py-1.5 rounded-lg text-xs bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 transition-all"
          >
            {copied ? "Skopiowano ✓" : "Kopiuj post"}
          </button>
        </div>
      </div>

      {/* Mockup */}
      {platform === "linkedin" ? (
        <LinkedInMockup
          post={post}
          photo={selectedPhoto}
          editedText={editedText}
          isEditing={isEditing}
          onTextChange={onTextChange}
        />
      ) : (
        <InstagramMockup
          post={post}
          photo={selectedPhoto}
          editedText={editedText}
          isEditing={isEditing}
          onTextChange={onTextChange}
        />
      )}

      {/* Hashtags */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {post.hashtags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function LinkedInMockup({ post, photo, editedText, isEditing, onTextChange }: any) {
  return (
    <div className="bg-[#1B1B24] border border-white/[0.08] rounded-2xl overflow-hidden">
      {/* LinkedIn header */}
      <div className="p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex-shrink-0" />
        <div>
          <div className="text-sm font-semibold text-white/90">Twoja Firma</div>
          <div className="text-xs text-white/30 mt-0.5">2,400 followers · Just now</div>
        </div>
      </div>

      {/* Text */}
      <div className="px-4 pb-3">
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={(e) => onTextChange(e.target.value)}
            rows={6}
            className="w-full bg-white/5 border border-violet-500/30 rounded-lg p-2 text-sm text-white/80 focus:outline-none resize-none"
            autoFocus
          />
        ) : (
          <p className="text-sm text-white/70 whitespace-pre-line leading-relaxed">
            {editedText}
          </p>
        )}
        {!isEditing && (
          <p className="text-sm text-white/50 mt-2">{post.callToAction}</p>
        )}
      </div>

      {/* Image */}
      {photo && (
        <div className="aspect-video w-full overflow-hidden">
          <img src={photo.url} alt="Post visual" className="w-full h-full object-cover" />
        </div>
      )}

      {/* LinkedIn actions */}
      <div className="px-4 py-3 border-t border-white/5 flex gap-4">
        {["👍 Like", "💬 Comment", "🔁 Repost", "📤 Send"].map((action) => (
          <span key={action} className="text-xs text-white/20">
            {action}
          </span>
        ))}
      </div>
    </div>
  );
}

function InstagramMockup({ post, photo, editedText, isEditing, onTextChange }: any) {
  return (
    <div className="bg-[#1B1B24] border border-white/[0.08] rounded-2xl overflow-hidden max-w-sm mx-auto">
      {/* IG header */}
      <div className="p-3 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex-shrink-0" />
        <span className="text-sm font-semibold text-white/90">twoja_firma</span>
        <span className="ml-auto text-white/20 text-lg">···</span>
      </div>

      {/* Image */}
      {photo ? (
        <div className="aspect-square w-full overflow-hidden">
          <img src={photo.url} alt="Post visual" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="aspect-square bg-white/5 flex items-center justify-center">
          <span className="text-white/20 text-sm">Wybierz zdjęcie poniżej</span>
        </div>
      )}

      {/* IG actions */}
      <div className="p-3 flex gap-3">
        {["🤍", "💬", "📤"].map((icon) => (
          <span key={icon} className="text-lg">
            {icon}
          </span>
        ))}
        <span className="ml-auto text-white/20">🔖</span>
      </div>

      {/* Caption */}
      <div className="px-3 pb-4">
        <span className="text-sm font-semibold text-white/80 mr-1.5">twoja_firma</span>
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={(e) => onTextChange(e.target.value)}
            rows={4}
            className="w-full mt-1 bg-white/5 border border-violet-500/30 rounded-lg p-2 text-xs text-white/70 focus:outline-none resize-none"
            autoFocus
          />
        ) : (
          <span className="text-sm text-white/60 whitespace-pre-line">{editedText}</span>
        )}
      </div>
    </div>
  );
}
