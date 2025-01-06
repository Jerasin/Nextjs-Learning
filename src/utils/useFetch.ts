export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export const fetchers = (urls: string[]) =>
  Promise.all(urls.map((url) => fetch(url).then((res) => res.json())));
