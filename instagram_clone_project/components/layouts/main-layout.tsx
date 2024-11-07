import Sidebar from "components/sidebar";

export default function MainLayout({ children }) {
  return (
    <main className="w-full h-screen flex items-center jsutify-center">
      <Sidebar />
      {children}
    </main>
  );
}
