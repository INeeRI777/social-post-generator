import { UnsplashPhoto } from "./types";

export async function searchUnsplashPhotos(
  keywords: string[],
  count = 6
): Promise<UnsplashPhoto[]> {
  const query = keywords.join(" ");
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) throw new Error("UNSPLASH_ACCESS_KEY not set");

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
    {
      headers: { Authorization: `Client-ID ${accessKey}` },
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!res.ok) throw new Error(`Unsplash API error: ${res.status}`);

  const data = await res.json();

  return data.results.map((photo: any): UnsplashPhoto => ({
    id: photo.id,
    url: photo.urls.regular,
    thumbUrl: photo.urls.small,
    authorName: photo.user.name,
    authorUrl: photo.user.links.html,
    downloadUrl: photo.links.download_location,
  }));
}
