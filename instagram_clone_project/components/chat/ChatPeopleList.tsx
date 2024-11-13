"use client";

import type { Session } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import Person from "./Person";
import { useRecoilState } from "recoil";
import { getAllusers } from "actions/chatActions";
import {
  presentState,
  selectedUserIdState,
  selectedUserIndexState,
} from "utils/recoil/atoms";
import { createBrowserSupabaseClient } from "utils/supabase/client";
import { useEffect } from "react";

export default function ChatPeopleList({
  loggedInUser,
}: {
  loggedInUser: Session;
}): JSX.Element {
  const [selectedUserId, setSelectedUserId] =
    useRecoilState(selectedUserIdState);
  const [selectedUserIndex, setSelectedUserIndex] = useRecoilState(
    selectedUserIndexState
  );
  const [presence, setPresence] = useRecoilState(presentState);
  const supabase = createBrowserSupabaseClient();

  const getAllusersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const allUsers = await getAllusers();
      const otherUsers = allUsers.filter(
        (user) => user.id !== loggedInUser.user.id
      );
      return otherUsers;
    },
  });

  useEffect(() => {
    const channel = supabase.channel("online_users", {
      config: {
        presence: {
          key: loggedInUser.user.id,
        },
      },
    });

    channel.on("presence", { event: "sync" }, () => {
      const newState = JSON.parse(JSON.stringify(channel.presenceState()));
      setPresence(newState);
    });

    channel.subscribe(async (status) => {
      if (status !== "SUBSCRIBED") {
        return;
      }

      const newPresenceStatus = await channel.track({
        onlineAt: new Date().toISOString(),
      });
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);
  return (
    <div className="h-screen min-w-60 flex flex-col bg-gray-50">
      {getAllusersQuery.data?.map((user, index) => (
        <Person
          key={user.id} // key 추가
          onClick={() => {
            setSelectedUserId(user.id);
            setSelectedUserIndex(index);
          }}
          index={index}
          isActive={selectedUserId === user.id}
          name={user.email.split("@")[0]}
          onChatScreen={false}
          onlineAt={presence?.[user.id]?.[0]?.onlineAt}
          userId={user.id}
        />
      ))}
    </div>
  );
}
