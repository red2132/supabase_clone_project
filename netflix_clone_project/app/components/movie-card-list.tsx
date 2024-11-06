"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import MovieCard from "./movie-card";
import { searchMovies } from "actions/movieActions";
import { Spinner } from "@material-tailwind/react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { searchState } from "utils/recoil/atoms";
import { useInView } from "react-intersection-observer";

export default function MovieCardList() {
  const search = useRecoilValue(searchState);
  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ["movie", search],
      queryFn: ({ pageParam }) =>
        searchMovies({ search, page: pageParam, pageSize: 12 }),
      getNextPageParam: (lastPage) =>
        lastPage.page ? lastPage.page + 1 : undefined,
    });

  const movieData = data?.pages?.map((page) => page.data)?.flat();

  const { ref, inView } = useInView({
    rootMargin: "100px",
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div className="grid gap-1 md:grid-cols-4 grid-cols-3 w-full h-full">
      {
        <>
          {movieData?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
          <div ref={ref}></div>
        </>
      }
      {isFetching && <Spinner />}
    </div>
  );
}
