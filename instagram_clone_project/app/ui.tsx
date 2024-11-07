import LogoutButton from "components/logout-button";

export default function UI() {
  return (
    <main className="w-full h-screen gap-2 flex flex-col items-center justify-center">
      <h1 className="font-bold text-xl">Welcome {`hyejin`}!</h1>
      <LogoutButton />
    </main>
  );
}
