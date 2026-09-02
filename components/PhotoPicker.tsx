"use client";

import { UnsplashPhoto } from "@/lib/types";

interface Props {
  photos: UnsplashPhoto[];
  isLoading: boolean;
  selectedId: string | null;
  onSelect: (photo: UnsplashPhoto) => void;
}

export default function PhotoPicker({ photos, isLoading, selectedId, onSelect }: Props) {
  if (isLoading) {
    return (
      <div>
        <p className="text-xs text-white/30 mb-3 uppercase tracking-wider font-medium">
          Wyszukuję zdjęcia Unsplash...
        </p>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-video rounded-lg bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (photos.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-white/30 uppercase tracking-wider font-medium">
          Dobierz zdjęcie · Unsplash
        </p>
        <span className="text-xs text-white/20">darmowe do użytku komercyjnego</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {photos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => onSelect(photo)}
            className={`relative aspect-video rounded-lg overflow-hidden transition-all ${
              selectedId === photo.id
                ? "ring-2 ring-violet-500 scale-[0.98]"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={photo.thumbUrl}
              alt={`Photo by ${photo.authorName}`}
              className="w-full h-full object-cover"
            />
            {selectedId === photo.id && (
              <div className="absolute inset-0 bg-violet-500/20 flex items-center justify-center">
                <span className="text-white text-lg">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
      {photos[0] && (
        <p className="text-xs text-white/20 mt-2">
          Photo by{" "}
          <a
            href={photos[0].authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {photos[0].authorName}
          </a>{" "}
          on Unsplash
        </p>
      )}
    </div>
  );
}
