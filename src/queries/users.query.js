export const loginQuery = (data) => {
  return queryOptions({
    queryKey: ["login", data],
    queryFn: () => loginUser(data).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });
};
