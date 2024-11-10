"use server";
import { type User } from "@supabase/supabase-js";
import { createServerSupabaseAdminClient } from "utils/supabase/server";

export async function getAllusers(): Promise<User[]> {
  // 모든 유저의 데이터를 가지고 오기 위해 어드민 API 이용
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    return [];
  }
  return data.users;
}

export async function getUserById(userId: string): Promise<User> {
  // 모든 유저의 데이터를 가지고 오기 위해 어드민 API 이용
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error) {
    return null;
  }
  return data.user;
}
