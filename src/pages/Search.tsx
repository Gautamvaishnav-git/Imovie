import axios from "axios";
import { useEffect, useState } from "react";
import { IMovie } from "../components/interfaces";
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
  const { fetchOnAction } = useFetch<fetchSearchType | null>({ url });

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
      <div className="flex justify-center w-fit mx-auto items-center py-4 relative">
        <input
          type="text"
          placeholder="Search movie"
          className="bg-gray-800 py-1 px-3 outline-none border border-slate-700 focus:border-teal-500 duration-100 text-white "
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div
          className="absolute right-2 top-4 cursor-pointer text-white font-light text-xl"
          onClick={() => setQuery("")}
        >
          x
        </div>
      </div>
      <div className="w-full h-auto">
        {searchList?.length === 0 && (
          <div className="flex w-full items-center justify-center sm:h-[60vh] h-auto text-2xl text-white">
            Search Movie.
          </div>
        )}
        <div className="flex flex-wrap gap-4 w-full px-3 py-2 items-stretch">
          {searchList &&
            searchList.map((movie) => {
              return <MovieCard movieObj={movie} key={movie.id} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Search;
