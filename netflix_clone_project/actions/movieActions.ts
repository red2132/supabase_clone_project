"use server";

import type { Movie } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";
function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function searchMovies({ search, page, pageSize }) {
  const supabase = await createServerSupabaseClient();
  const { data, count, error } = await supabase
    .from("movie")
    .select("*", { count: "exact" })
    .like("title,", `%${search}%`)
    // 시작값과 끝나는 값을 받음
    .range((page - 1) * pageSize, page * pageSize - 1);

  const hasNextPage = count > page * pageSize;

  if (error) {
    console.error(error);
    return {
      data: [],
      count: 0,
      page: null,
      pageSize: null,
      error,
    };
  }

  return {
    data,
    page,
    pageSize,
    hasNextPage,
  };
}

export async function getMovie(id: number): Promise<Movie> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("movie")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  handleError(error);
  return data;
}
