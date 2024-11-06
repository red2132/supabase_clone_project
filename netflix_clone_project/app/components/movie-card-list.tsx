"use client";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "./movie-card";
import { Spinner } from "@material-tailwind/react";
import { searchMovies } from "actions/movieActions";
import { useRecoilValue } from "recoil";
import { searchState } from "utils/recoil/atoms";

export default function MovieCardList() {
  const search = useRecoilValue(searchState);
  const getAllMoviesQuery = useQuery({
    queryKey: ["movies", search],
    queryFn: () => searchMovies(search),
  });

  return (
    <div className="grid gap-2 md:grid-cols-4 grid-cols-3 w-full h-full">
      {getAllMoviesQuery.isLoading && <Spinner />}
      {getAllMoviesQuery.data &&
        getAllMoviesQuery.data.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
  );
}
