const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = process.env.TMDB_TOKEN;

export type TMDBMovie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
};

export type TMDBCastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type TMDBMovieDetails = {
  id: number;
  title: string;
  overview: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  genres: { id: number; name: string }[];
  credits: {
    cast: TMDBCastMember[];
  };
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

export async function getMovieDetails(id: number): Promise<TMDBMovieDetails> {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?language=pt-BR&append_to_response=credits`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  );
  return response.json();
}
