import { renderHook, act } from "@testing-library/react-hooks";
import useFetchDataHook from "./index";

test("should use the useFetchDataHook -- happy path", async () => {
  const dataFn = (id) => Promise.resolve(id * 2);

  const { result, waitForNextUpdate } = renderHook(() =>
    useFetchDataHook(dataFn, 1)
  );
  expect(result.current.loading).toBe(true);
  expect(result.current.data).toBe(null);
  expect(result.current.error).toBe(null);

  await waitForNextUpdate();
  expect(result.current.data).toBe(2);
  expect(result.current.loading).toBe(false);

  act(() => {
    result.current.refetch(2);
  });

  expect(result.current.loading).toBe(true);

  await waitForNextUpdate();
  expect(result.current.data).toBe(4);
  expect(result.current.loading).toBe(false);
});

test("should use the useFetchDataHook -- without initial fetch", async () => {
  let cnt = 0;
  const dataFn = (id) => {
    cnt++;
    return Promise.resolve("some data" + cnt);
  };
  const { result, waitForNextUpdate } = renderHook(() =>
    useFetchDataHook({ fn: dataFn, initialFetch: false })
  );
  expect(result.current.loading).toBe(false);
  expect(result.current.data).toBe(null);
  expect(result.current.error).toBe(null);

  act(() => {
    result.current.refetch();
  });

  expect(result.current.loading).toBe(true);

  await waitForNextUpdate();
  expect(result.current.data).toBe("some data1");
  expect(result.current.loading).toBe(false);

  act(() => {
    result.current.refetch();
  });

  expect(result.current.loading).toBe(true);

  await waitForNextUpdate();
  expect(result.current.data).toBe("some data2");
  expect(result.current.loading).toBe(false);
});


test("should use the useFetchDataHook -- with default option", async () => {
  let cnt = 0;
  const dataFn = (id) => {
    cnt++;
    return Promise.resolve("some data" + cnt);
  };
  const { result, waitForNextUpdate } = renderHook(() =>
    useFetchDataHook({ fn: dataFn, initialFetch: true, default: 'Default string' })
  );
  expect(result.current.loading).toBe(true);
  expect(result.current.data).toBe('Default string');
  expect(result.current.error).toBe(null);

  await waitForNextUpdate();

  expect(result.current.loading).toBe(false);
  expect(result.current.data).toBe('some data1');
  expect(result.current.error).toBe(null);


  act(() => {
    result.current.refetch();
  });

  expect(result.current.loading).toBe(true);

  await waitForNextUpdate();
  expect(result.current.data).toBe("some data2");
  expect(result.current.loading).toBe(false);
});

test("should use the useFetchDataHook -- with initial fetch", async () => {
  let cnt = 0;
  const dataFn = (id) => {
    cnt++;
    return Promise.resolve("some data" + cnt);
  };
  const { result, waitForNextUpdate } = renderHook(() =>
    useFetchDataHook({ fn: dataFn, initialFetch: true })
  );
  expect(result.current.loading).toBe(true);
  expect(result.current.data).toBe(null);
  expect(result.current.error).toBe(null);

  await waitForNextUpdate();
  expect(result.current.data).toBe("some data1");
  expect(result.current.loading).toBe(false);


  act(() => {
    result.current.refetch();
  });

  expect(result.current.loading).toBe(true);

  await waitForNextUpdate();
  expect(result.current.data).toBe("some data2");
  expect(result.current.loading).toBe(false);

  act(() => {
    result.current.refetch();
  });

  expect(result.current.loading).toBe(true);

  await waitForNextUpdate();
  expect(result.current.data).toBe("some data3");
  expect(result.current.loading).toBe(false);
});

test("should use the useFetchDataHook -- service rejects", async () => {
  const dataFn = (id) => Promise.reject("Oops, error");

  const { result, waitForNextUpdate } = renderHook(() =>
    useFetchDataHook({ fn: dataFn }, 1)
  );

  expect(result.current.loading).toBe(true);
  expect(result.current.data).toBe(null);
  expect(result.current.error).toBe(null);

  await waitForNextUpdate();
  expect(result.current.loading).toBe(false);
  expect(result.current.data).toBe(null);
  expect(result.current.error).toBe("Oops, error");
});

test("should use the useFetchDataHook -- cancel slow responses", async () => {
  let cnt = 0;
  let timeout;
  const dataFn = (id) =>
    new Promise((resolve, reject) => {
      cnt++;
      if (cnt === 1) timeout = 200;
      else timeout = 100;
      setTimeout(() => {
        resolve("data" + cnt);
      }, timeout);
    });

  const { result, waitForNextUpdate } = renderHook(() =>
    useFetchDataHook({ fn: dataFn, initialFetch: true }, 1)
  );

  expect(result.current.loading).toBe(true);
  expect(result.current.data).toBe(null);
  expect(result.current.error).toBe(null);

  act(() => {
    result.current.refetch();
  });

  await waitForNextUpdate();

  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBe(null);
  expect(result.current.data).toBe("data2");

});

test("should use the useFetchDataHook -- doesn't reject if cancelled", async () => {
  let cnt = 0;
  let timeout;
  const dataFn = (id) =>
    new Promise((resolve, reject) => {
      cnt++;
      if (cnt === 1) timeout = 200;
      else timeout = 100;
      setTimeout(() => {
        if (cnt === 1) reject("Oops, error");
        else resolve("data");
      }, timeout);
    });

  const { result, waitForNextUpdate } = renderHook(() =>
    useFetchDataHook({ fn: dataFn, initialFetch: true }, 1)
  );

  expect(result.current.loading).toBe(true);
  expect(result.current.data).toBe(null);
  expect(result.current.error).toBe(null);

  act(() => {
    result.current.refetch();
  });

  await waitForNextUpdate();
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBe(null);
  expect(result.current.data).toBe("data");
});
