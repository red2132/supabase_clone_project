"use server";
import { type User } from "@supabase/supabase-js";
import {
  createServerSupabaseAdminClient,
  createServerSupabaseClient,
} from "utils/supabase/server";

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

export async function sendMessage({
  message,
  chatUserId,
}: {
  message: string;
  chatUserId: string;
}): Promise<{ [key: string]: any }[] | Error> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session.user) {
    return new Error("User is not authenticated");
  }

  const { data, error: sendMessageError } = await supabase
    .from("message")
    .insert({
      message,
      receiver: chatUserId,
      sender: session.user.id,
    });

  if (sendMessageError) {
    return new Error(sendMessageError.message);
  }

  return data;
}

export async function getAllMessages({
  chatUserId,
}: {
  chatUserId: string;
}): Promise<{ [key: string]: any }[]> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session.user) {
    console.error("User is not authenticated");
  }

  const { data, error: getMessageError } = await supabase
    .from("message")
    .select("*")
    .or(`receiver.eq.${chatUserId},receiver.eq.${session.user.id}`)
    .or(`sender.eq.${chatUserId},sender.eq.${session.user.id}`)
    .order("created_at", { ascending: true });

  if (getMessageError) {
    console.error(getMessageError.message);
  }

  return data;
}
