import MovieList from "@/components/movie/MovieList";
import Header from "@/components/ui/Header";
import { getHorrorMovies } from "@/lib/tmdb";

export default async function Home() {
  const movies = await getHorrorMovies();

  return (
    <>
      <Header />
      <MovieList movies={movies} />
    </>
  );
}
