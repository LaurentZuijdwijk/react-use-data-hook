import { renderHook, act } from "@testing-library/react-hooks";
import useFetchDataHook from "./index";

test("should use the useFetchDataHook -- happy path", async () => {
  const dataFn = (id) => Promise.resolve(id * 2);

  const { result, waitForNextUpdate } = renderHook(() =>
    useFetchDataHook({ fn: dataFn }, 1)
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
  let cnt = 0
    const dataFn = (id) => {
        cnt++
      return Promise.resolve("some data" + cnt);
  }
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