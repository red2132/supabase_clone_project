import ChatPeopleList from "components/chat/ChatPeopleList";
import ChatScreen from "components/chat/ChatScreen";
import { createServerSupabaseClient } from "utils/supabase/server";

export default async function ChatPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {session ? <ChatPeopleList loggedInUser={session} /> : <p>Loading...</p>}
      <ChatScreen />
    </div>
  );
}