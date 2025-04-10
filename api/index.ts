// api/index.ts
import axios from "axios";

// On s'attend à ce que tu aies ta clé dans process.env.EXPO_PUBLIC_API_KEY
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

// URL de base pour Pixabay
const apiUrl = `https://pixabay.com/api/videos/?key=${API_KEY}`;

// Typages simplifiés
type PixabayVideosResponse = {
  total: number;
  totalHits: number;
  hits: Array<{
    id: number;
    pageURL: string;
    tags: string;
    duration: number;
    videos: {
      large?: VideoVariant;
      medium?: VideoVariant;
      small?: VideoVariant;
      tiny?: VideoVariant;
    };
    views: number;
    downloads: number;
    likes: number;
    comments: number;
    user_id: number;
    user: string;
    userImageURL: string;
  }>;
};

type VideoVariant = {
  url: string;
  width: number;
  height: number;
  size: number;
  thumbnail: string;
};

// Options qu’on peut passer à la fonction de fetch
type FetchPixabayOptions = {
  q?: string; // query
  page?: number;
  per_page?: number;
  video_type?: "all" | "film" | "animation";
  order?: "popular" | "latest";
  safesearch?: boolean;
  // etc. si besoin
};

/**
 * Récupère des vidéos Pixabay selon différents filtres.
 */
export async function fetchPixabayVideos(options: FetchPixabayOptions = {}) {
  try {
    const {
      q,
      page = 1,
      per_page = 20,
      order = "popular",
      safesearch = false,
      video_type = "all",
    } = options;

    // On construit les paramètres
    const params = new URLSearchParams();
    if (q) params.append("q", q);
    params.append("page", String(page));
    params.append("per_page", String(per_page));
    params.append("order", order);
    params.append("safesearch", safesearch ? "true" : "false");
    params.append("video_type", video_type);

    // URL finale
    const finalUrl = `${apiUrl}&${params.toString()}`;

    const response = await axios.get<PixabayVideosResponse>(finalUrl);
    return response.data; // => { total, totalHits, hits: [...] }
  } catch (error) {
    console.error("Pixabay fetch error:", error);
    throw new Error("Failed to fetch videos from Pixabay");
  }
}
