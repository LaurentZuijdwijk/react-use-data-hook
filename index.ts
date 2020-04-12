import { useEffect, useState, useCallback, useRef } from "react";

type useAsyncDataHookArguments = {
  fn: (...args: any) => Promise<any>;
  initialFetch?: boolean;
  debug?: boolean;
};

function useAsyncDataHook(
  { fn, initialFetch = true, debug = false }: useAsyncDataHookArguments,
  ...rest
) {
  const [args, setArgs] = useState(rest);
  const initialFetchRef = useRef(initialFetch);

  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null,
  });

  const refetch = useCallback((...newArgs) => {
    setArgs(newArgs);
  }, []);

  const log = debug ? console.log : () => {};
  useEffect(() => {
    let cancelled = false;

    const getData = async () => {
      const newState = {
        loading: false,
        error: null,
        data: null,
      };
      try {
        log("useAsyncDataHook -- fetch", fn.name, ...args);
        setState({ ...state, loading: true });

        const data = await fn(...args);
        if (!cancelled) {
          newState.data = data;
          setState(newState);
          log("useAsyncDataHook -- loaded", data);
        }
      } catch (e) {
        if (!cancelled) {
          log("useAsyncDataHook -- error", e);
          newState.error = e;
          setState(newState);
        }
      }
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
  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    refetch,
  };
}

export default useAsyncDataHook;
