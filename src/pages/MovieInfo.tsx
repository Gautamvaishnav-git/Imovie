import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMovieInfo } from "../components/interfaces";
import notAvailable from "../assets/notAvailable.webp";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loader from "../components/Loader";
import useFetch from "../Hooks/useFetch";

interface info extends IMovieInfo {
  images: {
    backdrops: [{ file_path: string }];
    logos: [{ file_path: string }];
    posters: [{ file_path: string }];
  };
  alternative_titles: {
    titles: [{ iso_3166_1: string; title: string; type: string }];
  };
}

type alternativeNamesType = {
  iso_3166_1: string;
  title: string;
  type: string;
} | null;

type alternativeFetchType = {
  id: number;
  titles: alternativeNamesType[];
} | null;

const MovieInfo = () => {
  const { id } = useParams();
  const apiKey: string = import.meta.env.VITE_API_KEY;
  const baseUri: string = import.meta.env.VITE_BASE_URL;
  const imageUrlPrefix: string = import.meta.env.VITE_IMAGE_PREFIX;
  const posterPrefix: string = import.meta.env.VITE_POSTER_PREFIX;
  const infoUri: string = `${baseUri}/movie/${id}?api_key=${apiKey}&append_to_response=images,alternative_titles`;

  const { data: info, loading, fetchError } = useFetch<info>({ url: infoUri });

  useEffect(() => {
    setTimeout(() => {
      console.log(info);
    }, 1000);
  }, []);

  if (loading) return <Loader />;
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
      <div className="px-3 py-4 bg-slate-900">
        <div className="space-y-2 mt-4 max-w-7xl mx-auto">
          <h3 className="text-xl font-medium text-slate-100">
            Productions Companies-
          </h3>
          <div className="flex gap-2 items-center flex-wrap justify-between">
            {info?.production_companies.map((company) => {
              return (
                <img
                  src={
                    company.logo_path
                      ? `${posterPrefix}/${company.logo_path}`
                      : notAvailable
                  }
                  key={company.id}
                  alt="company"
                  className="w-1/4 opacity-40 hover:opacity-100 duration-100"
                />
              );
            })}
          </div>
        </div>
        <div className="my-5 max-w-7xl mx-auto">
          <Carousel
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            autoPlay
            interval={2000}
            infiniteLoop
          >
            {info?.images.backdrops &&
              info?.images.backdrops.slice(0, 8).map((backdrop) => {
                return (
                  <img
                    src={`${imageUrlPrefix}/${backdrop?.file_path}`}
                    alt="backdrop"
                    key={backdrop?.file_path}
                    loading="lazy"
                  />
                );
              })}
          </Carousel>
        </div>
      </div>
      <div className="w-full bg-slate-900 px-4 py-3 text-white">
        <div className="max-w-7xl mx-auto h-full flex flex-col  gap-3">
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
              <span className="text-teal-500">{info?.vote_count}</span>
            </div>
            <div className="flex justify-between border-b border-slate-600 py-1">
              <span className="font-medium">vote count</span>
              <span className="text-teal-500">{info?.vote_average}</span>
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
        <div className="flex flex-col gap-2 bg-slate-800 p-2 my-2 rounded max-w-7xl mx-auto">
          {info?.alternative_titles?.titles && (
            <>
              <h1 className="text-2xl font-semibold">Alternate Names</h1>
              {info?.alternative_titles?.titles.map((altName, index) => {
                return (
                  <div
                    className="flex justify-between border-b border-slate-500 py-1"
                    key={index}
                  >
                    <span className="font-medium">{altName?.iso_3166_1}</span>
                    <span className="text-teal-500">{altName?.title}</span>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
