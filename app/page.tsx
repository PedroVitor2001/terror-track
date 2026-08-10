import MovieList from "@/components/movie/MovieList";
import Header from "@/components/ui/Header";
import { getHorrorMovies, searchHorrorMovies } from "@/lib/tmdb";

type Props = {
  searchParams: Promise<{ search?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { search } = await searchParams;

  const movies = search
    ? await searchHorrorMovies(search)
    : await getHorrorMovies();

  return (
    <>
      <Header />
      <MovieList movies={movies} />
    </>
  );
}
