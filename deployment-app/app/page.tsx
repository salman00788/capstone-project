export default function Home() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold">Capstone App</h1>
      <p className="mt-4">Welcome to the application.</p>

      <div className="mt-6 flex gap-6">
        <a href="/about">About</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/health">Health</a>
      </div>
    </main>
  );
}