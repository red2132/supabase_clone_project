import LogoutButton from "components/logout-button";

export default function UI({ session }) {
  return (
    <main className="w-full h-screen gap-2 flex flex-col items-center justify-center">
      <h1 className="font-bold text-xl">
        Welcome {session?.user?.email?.split("@")?.[0]}!
      </h1>
      <LogoutButton />
    </main>
  );
}
