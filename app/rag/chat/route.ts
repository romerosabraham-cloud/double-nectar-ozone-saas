export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">double-nectar-ozone</h1>
        <p className="text-2xl text-gray-400 mb-10">
          Tu AI SaaS con RAG + Grok
        </p>
        <a 
          href="/sign-in"
          className="inline-block bg-white text-black px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-200"
        >
          Iniciar Sesión
        </a>
      </div>
    </div>
  );
}