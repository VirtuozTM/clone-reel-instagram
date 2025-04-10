// services/mockData.ts
import { faker } from "@faker-js/faker";
import { fetchPixabayVideos } from "@/api"; // <-- on importe la fonction de l’API
faker.seed(100);

const categories = [
  "cat",
  "dog",
  "nature",
  "city",
  "food",
  "people",
  "animals",
  "sports",
  "business",
  "technics",
];

export type Comment = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
  likesCount: number;
};

export type Friend = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
};

/**
 * Appelle l’API Pixabay pour récupérer un set de vidéos,
 * et retourne un tableau simulé (Faker) pour compléter ces vidéos.
 */
export async function fetchMockData() {
  // 1) On choisit un mot-clé au hasard (facultatif)
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];

  // 2) On récupère un lot de vidéos (par ex. 30)
  const pixabayResponse = await fetchPixabayVideos({
    q: randomCategory,
    per_page: 30,
  });

  // Récupération du tableau de vidéos : (hits: [...])
  const hits = pixabayResponse.hits || [];

  // 3) On mappe chaque vidéo pour créer un "fake item" + la vidéo
  //    On limite à 30 items maxi (ou la longueur de hits si <30)
  const data = hits.slice(0, 30).map((hit) => {
    const randomId = faker.string.uuid();
    // On prend par exemple la version medium de la vidéo, ou small
    const videoSource = hit.videos.medium?.url || hit.videos.small?.url || "";

    const generateComments = () =>
      Array.from({ length: faker.number.int({ min: 0, max: 20 }) }).map(() => ({
        id: faker.string.uuid(),
        user: {
          name: faker.person.fullName(),
          avatar: faker.image.avatar(),
        },
        text: faker.lorem.sentence({ min: 4, max: 12 }),
        timestamp: faker.date.recent().toISOString(),
        likesCount: faker.number.int({ min: 0, max: 250 }),
      }));

    const generateFriends = () =>
      Array.from({ length: faker.number.int({ min: 10, max: 20 }) }).map(
        () => ({
          id: faker.string.uuid(),
          user: {
            name: faker.person.fullName(),
            avatar: faker.image.avatar(),
          },
        })
      );

    return {
      key: randomId, // identifiant unique pour nos items
      title: faker.music.songName(),
      image: faker.image.urlPicsumPhotos({
        width: 1000,
        height: 1000,
      }),
      bg: faker.color.rgb(),
      description: faker.lorem.sentences({ min: 1, max: 4 }),
      author: {
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
      },
      music: faker.image.urlPicsumPhotos({
        width: 300,
        height: 300,
      }),
      likesCount: faker.number.int({ min: 100, max: 10000 }),
      commentsCount: faker.number.int({ min: 10, max: 1000 }),
      sharesCount: faker.number.int({ min: 5, max: 500 }),
      videoSource,
      comments: generateComments(),
      friends: generateFriends(),
    };
  });

  return data;
}

// On peut définir un type si on veut
export type Item = Awaited<ReturnType<typeof fetchMockData>>[number];
