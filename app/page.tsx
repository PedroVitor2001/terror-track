import MovieList from "@/components/movie/MovieList";
import Header from "@/components/ui/Header";
import { getHorrorMovies, searchHorrorMovies } from "@/lib/tmdb";
import Pagination from "@/components/ui/pagination";
import FilterBar from "@/components/ui/FilterBar";

type Props = {
  searchParams: Promise<{
    search?: string;
    page?: string;
    generos?: string;
    ordem?: string;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const { search, page, generos, ordem } = await searchParams;
  const currentPage = Number(page ?? 1);
  const currentGeneros = generos ?? "27";
  const currentOrdem = ordem ?? "popularity.desc";

  const movies = search
    ? await searchHorrorMovies(search, currentPage)
    : await getHorrorMovies(currentPage, currentGeneros, currentOrdem);

  return (
    <>
      <Header />
      <FilterBar currentGeneros={currentGeneros} currentOrdem={currentOrdem} />
      <MovieList movies={movies} />
      <Pagination currentPage={currentPage} search={search} />
    </>
  );
}
