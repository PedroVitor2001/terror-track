const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = process.env.TMDB_TOKEN;

export type TMDBMovie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
};

export async function getHorrorMovies(): Promise<TMDBMovie[]> {
  const response = await fetch(
    `${BASE_URL}/discover/movie?with_genres=27&language=pt-BR&sort_by=popularity.desc`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  );

  const data = await response.json();
  return data.results;
}
