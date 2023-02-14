import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMovieInfo } from "../components/interfaces";
import notAvailable from "../assets/notAvailable.webp";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type info = IMovieInfo | null;

const MovieInfo = () => {
  const [info, setInfo] = useState<info>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const apiKey: string = import.meta.env.VITE_API_KEY;
  const baseUri: string = import.meta.env.VITE_BASE_URL;
  const imageUrlPrefix: string = import.meta.env.VITE_IMAGE_PREFIX;
  const posterPrefix: string = import.meta.env.VITE_POSTER_PREFIX;
  const { id } = useParams();
  const uriStr = `${baseUri}/movie/${id}?api_key=${apiKey}&language=en-US`;
  const fetchMovieInfo = async (URI: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(URI);
      setInfo(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setFetchError(true);
    }
  };
  useEffect(() => {
    fetchMovieInfo(uriStr);
  }, []);

  if (loading)
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="loader w-20 h-20 border-t-2 border-teal-500 rounded-full"></div>
      </div>
    );

  if (fetchError) return <div>Fetch Error... </div>;
  return (
    <>
      <div className="w-full">
        <img
          src={
            info?.backdrop_path
              ? `${imageUrlPrefix}/${info?.backdrop_path}`
              : notAvailable
          }
          className="w-full"
          alt="poster"
        />
      </div>
      <div className="w-full bg-slate-900 px-4 py-3 text-white">
        <div className="max-w-7xl mx-auto h-full flex flex-col justify-end gap-3">
          <h1 className="text-2xl font-semibold">
            {info?.title}
            <span className="text-xs text-white bg-teal-900/80 px-2 py-1 ml-3 rounded font-normal">
              {info?.adult ? "Adult" : "For all"}
            </span>
          </h1>
          <p className="text-md text-slate-400 leading-5">{info?.overview}</p>
          <div className="py-2 bg-slate-800 rounded px-2 flex flex-col gap-2 capitalize">
            <div className="flex justify-between border-b border-slate-600 py-1">
              <span className="font-medium">budget</span>
              <span className="text-teal-500">
                {Intl.NumberFormat("en-us", {
                  currency: "usd",
                  style: "currency",
                }).format(Number(info?.budget))}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-600 py-1">
              <span className="font-medium">original title</span>
              <span className="text-teal-500">{info?.original_title}</span>
            </div>
            <div className="flex justify-between border-b border-slate-600 py-1">
              <span className="font-medium">Original Language</span>
              <span className="text-teal-500">{info?.original_language}</span>
            </div>
            <div className="flex justify-between border-b border-slate-600 py-1">
              <span className="font-medium">tagline</span>
              <span className="text-teal-500">{info?.tagline}</span>
            </div>
            <div className="flex justify-between border-b border-slate-600 py-1">
              <span className="font-medium">popularity</span>
              <span className="text-teal-500">{info?.popularity}</span>
            </div>
            <div className="flex justify-between border-b border-slate-600 py-1">
              <span className="font-medium">release date</span>
              <span className="text-teal-500">{info?.release_date}</span>
            </div>
            <div className="flex justify-between border-b border-slate-600 py-1">
              <span className="font-medium">revenue</span>
              <span className="text-teal-500">{info?.revenue}</span>
            </div>
            <div className="flex justify-between border-b border-slate-600 py-1">
              <span className="font-medium">runtime</span>
              <span className="text-teal-500">{info?.runtime}</span>
            </div>
            <div className="flex justify-between border-b border-slate-600 py-1">
              <span className="font-medium">vote average</span>
              <span className="text-teal-500">{info?.vote_average}</span>
            </div>
            <div className="flex justify-between border-b border-slate-600 py-1">
              <span className="font-medium">vote count</span>
              <span className="text-teal-500">{info?.vote_count}</span>
            </div>
          </div>
          <a
            href={info?.homepage}
            className="px-4 py-2 hover:bg-slate-800 duration-150 capitalize w-fit rounded text-white border border-slate-800"
            target="_blank"
          >
            Go To Movie Homepage
          </a>
        </div>
      </div>
      <div className="px-3 py-4">
        <div className="space-y-2 mt-4 max-w-7xl mx-auto">
          <h3 className="text-xl font-medium text-slate-900">
            Productions Companies-
          </h3>
          <div className="flex gap-2 items-center flex-wrap justify-between">
            {info?.production_companies.map((company) => {
              return (
                <img
                  src={`${posterPrefix}/${company.logo_path}`}
                  key={company.id}
                  alt="company"
                  className="w-1/4 grayscale hover:grayscale-0 duration-100"
                />
              );
            })}
          </div>
        </div>
        <div className="my-5 max-w-7xl mx-auto">
          <div className="flex gap-3 items-center">
            <h3 className="text-xl font-medium text-slate-900 mb-3">
              {info?.belongs_to_collection.name}
            </h3>
          </div>
          <Carousel
            showArrows={false}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            autoPlay
            interval={2000}
            infiniteLoop
          >
            <div className="h-[80vh] overflow-hidden">
              <img
                src={`${imageUrlPrefix}/${info?.belongs_to_collection.backdrop_path}`}
                alt="belong to path"
                className="f-full"
              />
            </div>
            <div className="h-[80vh] overflow-hidden">
              <img
                src={`${imageUrlPrefix}/${info?.belongs_to_collection.poster_path}`}
                alt="belong to path"
                className="f-full"
              />
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
