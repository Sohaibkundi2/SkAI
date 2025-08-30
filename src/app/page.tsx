import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl p-6">
        
        <Link
          href="/chatbot"
          className="group relative p-10 rounded-2xl 
            shadow-md shadow-pink-500/20 
            bg-white/5 backdrop-blur-md border border-pink-500/30 
            transition-all duration-300 
            hover:scale-105 hover:shadow-lg hover:shadow-pink-500/40 active:shadow-lg active:shadow-pink-500/40"
        >
          <h2 className="text-2xl font-semibold mb-2 group-hover:text-pink-400 transition-colors">
            Chatbot
          </h2>
          <p className="text-gray-400 text-sm">
            Talk with AI in real time with a sleek interface.
          </p>
        </Link>

        <Link
          href="/image-editor"
          className="group relative p-10 rounded-2xl 
            shadow-md shadow-pink-500/20 
            bg-white/5 backdrop-blur-md border border-pink-500/30 
            transition-all duration-300 
            hover:scale-105 hover:shadow-lg hover:shadow-pink-500/40 active:shadow-lg active:shadow-pink-500/40"
        >
          <h2 className="text-2xl font-semibold mb-2 group-hover:text-pink-400 transition-colors">
            Image Editor
          </h2>
          <p className="text-gray-400 text-sm">
            Edit, enhance, and style images with AI-powered tools.
          </p>
        </Link>

      </div>
    </main>
  );
}
