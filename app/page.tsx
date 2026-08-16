import MovieList from "@/components/movie/MovieList";
import Header from "@/components/ui/Header";
import Pagination from "@/components/ui/pagination";
import { getHorrorMovies, searchHorrorMovies } from "@/lib/tmdb";

type Props = {
  searchParams: Promise<{ search?: string; page?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { search, page } = await searchParams;
  const currentPage = Number(page ?? 1);

  const movies = search
    ? await searchHorrorMovies(search, currentPage)
    : await getHorrorMovies(currentPage);

  return (
    <>
      <Header />
      <MovieList movies={movies} />
      <Pagination currentPage={currentPage} search={search} />
    </>
  );
}
