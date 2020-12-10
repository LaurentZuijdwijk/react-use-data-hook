import { useEffect, useState, useCallback, useRef } from "react";

type options = {
  fn: (...args: any) => Promise<any>;
  initialFetch?: boolean;
  debug?: boolean;
};

type asyncDataHookArguments = options | Function;

function useAsyncDataHook(options: asyncDataHookArguments, ...rest) {
  let fn,
    debug = false,
    initialFetch = true;

  if (typeof options === "function") {
    fn = options;
  } else {
    fn = options.fn;
    debug = options.debug ?? false;
    initialFetch = options.initialFetch ?? true;
  }

  const [args, setArgs] = useState(rest);
  const initialFetchRef = useRef(initialFetch);

  const [state, setState] = useState({
    loading: initialFetch,
    error: null,
    data: options.default || null,
  });

  const refetch = useCallback((...newArgs) => {
    setArgs(newArgs);
  }, []);

  const log = debug ? console.log : () => {};
  useEffect(() => {
    let cancelled = false;

    const getData = async () => {
      const doneState = {
        loading: false,
        error: null,
        data: null,
      };
      try {
        log("useAsyncDataHook -- fetch", fn.name, ...args);
        setState({ ...state, loading: true });

        // execute the async function to get data
        const data = await fn(...args);
        if (!cancelled) {
          doneState.data = data;
          setState(doneState);
          log("useAsyncDataHook -- loaded", data);
        }
      } catch (e) {
        if (!cancelled) {
          log("useAsyncDataHook -- error", e);
          doneState.error = e;
          setState(doneState);
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
