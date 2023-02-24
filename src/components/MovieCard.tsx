import { Link } from "react-router-dom";
import { IMovie } from "../components/interfaces";

import notAvailable from "../assets/notAvailable.webp";

type movieDataType = IMovie | null;

const MovieCard = ({ movieObj }: { movieObj: movieDataType }) => {
  const posterPrefix: string = import.meta.env.VITE_POSTER_PREFIX;

  return (
    <Link
      to={`/movie/${String(movieObj?.id)}`}
      className="flex flex-col shadow grow w-full sm:w-1/3 md:w-1/5 overflow-hidden rounded-md bg-slate-900 hover:shadow-none hover:scale-[1.03] duration-300 ease-in"
    >
      <div className="w-full relative h-fit overflow-hidden rounded-md movieBox">
        <img
          className="w-full"
          loading="lazy"
          src={
            movieObj?.poster_path
              ? `${posterPrefix}/${movieObj?.poster_path}`
              : notAvailable
          }
          alt="poster"
          draggable="false"
        />
        <div className="info w-full h-full bg-gradient-to-t from-slate-900 absolute sm:-bottom-[100%] pl-2 py-1 flex flex-col justify-end bottom-0">
          <h2 className="text-md text-white w-4/5">{movieObj?.title}</h2>
          <h3 className="text-xs text-gray-300">{movieObj?.release_date}</h3>
        </div>
        <div className="absolute bottom-1 right-2 w-8 h-8 text-xs bg-transparent rounded-full flex items-center justify-center shadow border">
          <h1 className="text-white font-bold absolute">
            {Math.round(Number(movieObj?.vote_average))}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
