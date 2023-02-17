import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import useFetch from "../Hooks/useFetch";

type fetchType = {
  backdrops: [
    {
      file_path: string;
    }
  ];
};

const Tv = () => {
  const apiKey: string = import.meta.env.VITE_API_KEY;
  const baseUri: string = import.meta.env.VITE_BASE_URL;
  const url = `${baseUri}/tv/15/images?api_key=${apiKey}`;
  const posterPrefix: string = import.meta.env.VITE_IMAGE_PREFIX;
  const { data: images, fetchError, loading } = useFetch<fetchType>({ url });

  if (loading) return <Loader />;
  if (fetchError) return <h1>fetch error</h1>;

  return (
    <>
      {images &&
        images.backdrops.map((item) => (
          <img
            key={item.file_path}
            src={`${posterPrefix}/${item.file_path}`}
            alt="poster"
          />
        ))}
    </>
  );
};

export default Tv;
