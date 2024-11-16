export const modifyQueryFromURL = (key, value) => {
  if (!value) {
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete(key);
    window.history.pushState(
      null,
      "",
      `${location.pathname}?${queryParams.toString()}`
    );
    return;
  }

  const queryParams = new URLSearchParams(location.search);
  queryParams.set(key, value);
  window.history.pushState(
    null,
    "",
    `${location.pathname}?${queryParams.toString()}`
  );
};