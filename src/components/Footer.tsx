export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-10 text-center text-sm text-zinc-500">
        
        <div className="mb-4 text-yellow-500 font-semibold tracking-widest">
          GP31 11U GOLD
        </div>

        <div className="space-y-1">
          <p>Built on Faith. Built on Development. Built to Compete.</p>
          <p>© {new Date().getFullYear()} GP31 Baseball</p>
          <p className="text-xs text-zinc-600">Romans 8:31</p>
        </div>

      </div>
    </footer>
  );
}
