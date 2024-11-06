"use server";

import type { Movie } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";
function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function searchMovies(search: string = ""): Promise<Movie[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("movie")
    .select("*")
    .like("title,", `${search}`);

  handleError(error);

  return data;
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
