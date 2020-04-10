import React, { useEffect, useState, useCallback, useRef } from "react";

type useFetchDataHookArguments = {
  fn: (...args:any) => Promise<any>;
  initialFetch?: boolean;
};

function useFetchDataHook(
  { fn, initialFetch=true }: useFetchDataHookArguments,
  ...rest
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [args, setArgs] = useState(rest);
  const initialFetchRef = useRef(initialFetch);

  const refetch = useCallback((...newArgs) => {
    setArgs(newArgs);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const getData = async () => {
      setLoading(true);
      try {
        const data = await fn(...args);
        if (!cancelled) {
          setData(data);
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    if (initialFetchRef.current) {
      getData();
    } else {
      initialFetchRef.current = true;
    }
    return () => {
      cancelled = true;
    };
  }, [fn, args]);
  return { data, loading, error, refetch };
}

export default useFetchDataHook;
