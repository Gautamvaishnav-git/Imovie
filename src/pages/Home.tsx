import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { IMovie } from "../components/interfaces";

type movieData = IMovie | null;

const Home = () => {
  const apiKey: string = import.meta.env.VITE_API_KEY;
  const baseUri: string = import.meta.env.VITE_BASE_URL;
  const moviesListBaseURI: URL = new URL("3/list/1", baseUri);
  const [movieList, setMovieList] = useState<movieData[]>([]);

  const fetchMovies = async (): Promise<void> => {
    let { href }: URL = new URL(`?api_key=${apiKey}`, moviesListBaseURI.href);
    const { data } = await axios.get(href);
    setMovieList(data.items);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <div className="flex flex-wrap w-full max-w-7xl mx-auto gap-3 p-2">
        {movieList &&
          movieList.map((movie: movieData) => (
            <MovieCard movieObj={movie} key={movie?.id} />
          ))}
      </div>
    </>
  );
};

export default Home;
