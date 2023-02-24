import axios from "axios";
import { useEffect, useState } from "react";
import { IMovie } from "../components/interfaces";
import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard";
import useFetch from "../Hooks/useFetch";

type searchListType = IMovie[] | null;

type fetchSearchType = {
  results: searchListType | null;
};

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchList, setSearchList] = useState<searchListType>([]);
  const baseURI = import.meta.env.VITE_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  let url = `${baseURI}/search/movie?api_key=${apiKey}&query=${searchQuery}`;
  const trendingUrl: string = `${baseURI}/trending/movie/week?api_key=${apiKey}`;
  const { fetchOnAction } = useFetch<fetchSearchType | null>({ url });
  const { data: trendingOfTheDay, loading } = useFetch<fetchSearchType | null>({
    url: trendingUrl,
  });

  useEffect(() => {
    const debounceSearch = setTimeout(async () => {
      setSearchQuery(query);
      let data = await fetchOnAction(url);
      data?.results && setSearchList(data?.results);
    }, 300);

    return () => clearInterval(debounceSearch);
  }, [query, searchList]);

  return (
    <>
      <div className="flex justify-center w-fit mx-auto items-center pt-8 relative">
        <input
          type="text"
          placeholder="Search movie"
          className="bg-gray-800 py-1 px-3 outline-none border border-slate-700 focus:border-teal-500 duration-100 text-white"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div
          className="absolute right-2 bottom-[5px] cursor-pointer text-white font-light text-xl"
          onClick={() => setQuery("")}
        >
          x
        </div>
      </div>
      <div className="w-full h-auto">
        {searchList && (
          <div className="flex flex-wrap gap-4 w-full px-3 py-8 items-stretch">
            {searchList.map((movie) => {
              return <MovieCard movieObj={movie} key={movie.id} />;
            })}
          </div>
        )}
        <div className="px-3 py-4 w-full">
          {loading && <Loader />}
          <div className="flex flex-wrap gap-4 w-full items-stretch">
            {searchList?.length === 0 &&
              trendingOfTheDay?.results &&
              trendingOfTheDay?.results.map((movie) => {
                return <MovieCard movieObj={movie} key={movie.id} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
