"use client";

import type { Session } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import Person from "./Person";
import { useRecoilState } from "recoil";
import { getAllusers } from "actions/chatActions";
import {
  selectedUserIdState,
  selectedUserIndexState,
} from "utils/recoil/atoms";

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
          onlineAt={new Date().toISOString()}
          userId={user.id}
        />
      ))}
    </div>
  );
}
