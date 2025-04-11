// services/mockData.ts
import { faker } from "@faker-js/faker";
import { fetchPixabayVideos } from "@/api";
import { categories } from "@/constants/data";

faker.seed(100);

/**
 * Appelle l’API Pixabay pour récupérer un set de vidéos,
 * et retourne un tableau simulé (Faker) pour compléter ces vidéos.
 */
export async function fetchMockData() {
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];

  const pixabayResponse = await fetchPixabayVideos({
    q: randomCategory,
    per_page: 30,
  });

  const hits = pixabayResponse.hits || [];

  const data = hits.slice(0, 30).map((hit) => {
    const randomId = faker.string.uuid();
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
      key: randomId,
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
