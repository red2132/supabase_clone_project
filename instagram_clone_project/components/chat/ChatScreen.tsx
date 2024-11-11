"use client";

import Person from "./Person";
import Message from "./Message";
import { useRecoilValue } from "recoil";
import {
  selectedUserIdState,
  selectedUserIndexState,
} from "utils/recoil/atoms";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllMessages, getUserById, sendMessage } from "actions/chatActions";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const selectedUserId = useRecoilValue(selectedUserIdState);
  const selectedUserIndex = useRecoilValue(selectedUserIndexState);
  const supabase = createBrowserSupabaseClient();

  const selectedUserQuery = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: () => getUserById(selectedUserId),
  });

  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      return sendMessage({
        message,
        chatUserId: selectedUserId,
      });
    },
    onSuccess: () => {
      setMessage("");
    },
  });

  const getAllMessageQuery = useQuery({
    queryKey: ["messages", selectedUserId],
    queryFn: () => getAllMessages({ chatUserId: selectedUserId }),
  });

  useEffect(() => {
    // 채널로 메시지 실시간 변화 감지
    const channel = supabase
      .channel("message_change_observer")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "message",
        },
        (payload) => {
          if (
            payload.eventType === "INSERT" &&
            !payload.errors &&
            !!payload.new
          ) {
            getAllMessageQuery.refetch();
          }
        }
      )
      .subscribe();
    // clear
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return selectedUserQuery.data !== null ? (
    <div className="w-full h-screen flex flex-col">
      {/* Active 유저 영역 */}
      <Person
        index={selectedUserIndex}
        isActive={false}
        name={selectedUserQuery.data?.email?.split("@")?.[0]}
        onChatScreen={true}
        onlineAt={new Date().toISOString()}
        userId={selectedUserQuery.data?.id}
      />

      {/* 채팅 영역 */}
      <div className="w-full overflow-y-scroll flex-1 flex flex-col p-4 gap-3">
        {getAllMessageQuery.data?.map((message) => (
          <Message
            key={message.id}
            message={message.message}
            isFromMe={message.receiver === selectedUserId}
          />
        ))}
      </div>
      <div className="flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-3 w-full border-2 border-light-blue-600"
          placeholder="메시지를 입력하세요."
        />

        <button
          onClick={() => sendMessageMutation.mutate()}
          className="min-w-20 p-3 bg-light-blue-600 text-white"
          color="light-blue"
        >
          {sendMessageMutation.isPending ? <Spinner /> : <span>전송</span>}
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full"></div>
  );
}
