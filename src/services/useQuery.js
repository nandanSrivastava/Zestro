import { useState, useEffect } from "react";

const cache = {};

const useQuery = (
  endpoint = "",
  query = {},
  additionalParam = {
    autoFetch: true,
    processData: () => {},
    baseUrl: "",
    skipCache: false,
    ttl: 5000, // 5 sec
  }
) => {
  const getEndPoint = () => {
    const BASE_URL = "https://jsonplaceholder.typicode.com";
    return `${BASE_URL}/${endpoint}`;
  };

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState(getEndPoint());

  const handleViaCache = (key) => {
    const cachedData = cache[key];
    if (!additionalParam.skipCache && cachedData) {
      const { data, timestamp } = cachedData;
      const now = Date.now();
      if (now - timestamp > additionalParam.ttl) {
        delete cache[key]; // remove stale data
        return false;
      } else {
        setData(data);
        return true;
      }
    }
    return false;
  };

  const refetch = async () => {
    setIsLoading(true);
    try {
      const cachKey = url;
      const isServedViaCache = handleViaCache(cachKey);
      if (!isServedViaCache) {
        console.log("fetching from network");
        const res = await fetch(url);
        const parsedData = await res.json();
        cache[cachKey] = {
          data: parsedData,
          timestamp: Date.now(),
        };
        console.log("fetchedData", parsedData);
        if (additionalParam.processData) {
          const processData = additionalParam.processData(parsedData);
          setData(processData);
        } else {
          setData(parsedData);
        }
      }
    } catch (error) {
      console.error("Error in useQuery:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (additionalParam.autoFetch) {
      refetch();
    }
  }, []);

  return { data, error, isLoading, refetch };
};
export default useQuery;
