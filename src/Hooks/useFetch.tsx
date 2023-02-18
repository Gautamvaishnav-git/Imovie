import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = <T,>({ url }: { url: string }) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const fetchData = async (URL: string = url): Promise<void> => {
    try {
      setLoading(true);
      const { data } = await axios.get(URL);
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setFetchError(true);
    }
  };

  const fetchOnAction = async (URL: string) => {
    await fetchData(URL);
    return await data;
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, fetchError, fetchOnAction };
};

export default useFetch;
