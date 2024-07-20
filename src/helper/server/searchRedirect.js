export default function searchRedirect(pathname, search, value, router) {
  const { query } = router;

  delete query[search];
  delete query["page"];

  router.push({
    pathname,
    query: {
      ...query,
      ...(value.trim() === "" ? {} : { [search]: value.trim() }),
    },
  });
}
