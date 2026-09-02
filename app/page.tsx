"use client";

import { useState } from "react";
import PostForm from "@/components/PostForm";
import PostPreview from "@/components/PostPreview";
import PhotoPicker from "@/components/PhotoPicker";
import { GeneratedPost, PostFormData, UnsplashPhoto } from "@/lib/types";

export default function Home() {
  const [post, setPost] = useState<GeneratedPost | null>(null);
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<UnsplashPhoto | null>(null);
  const [platform, setPlatform] = useState<PostFormData["platform"]>("linkedin");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
  const [editedText, setEditedText] = useState("");

  async function handleGenerate(formData: PostFormData) {
    setIsGenerating(true);
    setPlatform(formData.platform);
    setPost(null);
    setPhotos([]);
    setSelectedPhoto(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setPost(data.post);
        setEditedText(data.post.text);
        fetchPhotos(data.post.imageKeywords);
      }
    } finally {
      setIsGenerating(false);
    }
  }

  async function fetchPhotos(keywords: string[]) {
    setIsLoadingPhotos(true);
    try {
      const res = await fetch(`/api/photos?keywords=${keywords.join(",")}`);
      const data = await res.json();
      if (data.success) setPhotos(data.photos);
    } finally {
      setIsLoadingPhotos(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-xs font-bold">
              P
            </div>
            <span className="font-semibold text-sm tracking-tight">PostCraft AI</span>
          </div>
          <span className="text-xs text-white/30">Powered by Claude Haiku</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Generuj posty{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              które angażują
            </span>
          </h1>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            Opisz swoją firmę, wybierz platformę — AI napisze post i dobierze zdjęcia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">
          {/* Left: Form */}
          <PostForm onSubmit={handleGenerate} isLoading={isGenerating} />

          {/* Right: Results */}
          {post ? (
            <div className="space-y-6">
              <PostPreview
                post={post}
                platform={platform}
                selectedPhoto={selectedPhoto}
                editedText={editedText}
                onTextChange={setEditedText}
              />
              <PhotoPicker
                photos={photos}
                isLoading={isLoadingPhotos}
                selectedId={selectedPhoto?.id ?? null}
                onSelect={setSelectedPhoto}
              />
            </div>
          ) : (
            <div className="hidden lg:flex items-center justify-center h-64 rounded-2xl border border-dashed border-white/10 text-white/20 text-sm">
              Twój post pojawi się tutaj
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
