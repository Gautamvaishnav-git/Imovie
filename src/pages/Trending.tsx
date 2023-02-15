import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { IMovie } from "../components/interfaces";
import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard";

type trendingDataType = IMovie | null;

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState<trendingDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const posterPrefix: string = import.meta.env.VITE_IMAGE_PREFIX;
  const trendingUrl: string = `${
    import.meta.env.VITE_BASE_URL
  }/trending/movie/day?api_key=${import.meta.env.VITE_API_KEY}`;
  const fetchTrending = async (url: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(url);
      setTrendingMovies(data.results);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setFetchError(true);
    }
  };

  useEffect(() => {
    fetchTrending(trendingUrl);
  }, []);

  if (loading) return <Loader />;
  if (fetchError) return <h1>Fetch Error ...</h1>;

  return (
    <>
      <h1 className="text-xl px-2 py-2 text-slate-900 font-semibold">
        Trending Movies Of the day -
      </h1>
      <Carousel
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        interval={2000}
        className="relative"
      >
        {trendingMovies &&
          trendingMovies.slice(0, 5).map((trending) => {
            return (
              <div className="max-h-[80vh] overflow-hidden" key={trending?.id}>
                <img
                  src={`${posterPrefix}/${trending?.backdrop_path}`}
                  alt="Trending"
                />
                <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-slate-900/50 flex flex-col justify-end items-start">
                  <div className="px-2 py-2">
                    <p className="text-xl font-semibold text-teal-500 bg-slate-900 px-2 py-1 rounded">
                      {trending?.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </Carousel>
      <div className="py-2 flex gap-3 flex-wrap max-w-7xl mx-auto px-2">
        {trendingMovies &&
          trendingMovies.map((trending: trendingDataType) => {
            return <MovieCard movieObj={trending} key={trending?.id} />;
          })}
      </div>
      {}
    </>
  );
};

export default Trending;
