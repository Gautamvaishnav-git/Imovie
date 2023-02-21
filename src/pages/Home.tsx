import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { IMovie } from "../components/interfaces";
import Loader from "../components/Loader";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";

type movieData = IMovie | null;
type fetchMoviesList = {
  items: IMovie[] | null;
};

const Home = () => {
  const [movieList, setMovieList] = useState<IMovie[]>();
  const apiKey: string = import.meta.env.VITE_API_KEY;
  const baseUri: string = import.meta.env.VITE_BASE_URL;
  const moviesListBaseURI: URL = new URL("3/list/1", baseUri);
  const posterPrefix: string = import.meta.env.VITE_IMAGE_PREFIX;
  const { href }: URL = new URL(`?api_key=${apiKey}`, moviesListBaseURI.href);
  const { data, fetchError, loading } = useFetch<fetchMoviesList>({
    url: href,
  });

  useEffect(() => {
    data?.items && setMovieList(data?.items);
  }, [data]);

  if (loading) return <Loader />;
  if (fetchError) return <h1>Fetch Error ...</h1>;

  return (
    <>
      <Carousel
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        interval={2000}
        className="relative"
      >
        {movieList &&
          movieList.slice(0, 5).map((movie) => {
            return (
              <div className="max-h-[80vh] overflow-hidden" key={movie?.id}>
                <img
                  src={`${posterPrefix}/${movie?.backdrop_path}`}
                  alt="Movie"
                  loading="lazy"
                />
                <Link
                  to={`/movie/${String(movie?.id)}`}
                  className="text-xl font-semibold text-teal-500 bg-slate-900 px-2 py-1 rounded-t-md absolute bottom-0 left-0 h-fit w-fit z-4"
                >
                  {movie?.title}
                </Link>
              </div>
            );
          })}
      </Carousel>

      <div className="flex flex-wrap w-full max-w-7xl mx-auto gap-3 px-2 py-10">
        {movieList &&
          movieList.map((movie: movieData) => (
            <MovieCard movieObj={movie} key={movie?.id} />
          ))}
      </div>
    </>
  );
};

export default Home;
