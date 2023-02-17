import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = <T,>({ url }: { url: string }) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      const { data } = await axios.get(url);
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setFetchError(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, fetchError };
};

export default useFetch;
