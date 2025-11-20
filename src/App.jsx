import Hero from './components/Hero'
import HubTabs from './components/HubTabs'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(600px_circle_at_10%_10%,rgba(59,130,246,0.15),transparent_60%),radial-gradient(800px_circle_at_90%_20%,rgba(56,189,248,0.12),transparent_60%)]" />
        <div className="relative container mx-auto px-4 py-8 md:py-12">
          <header className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <img src="/flame-icon.svg" className="w-8 h-8" alt="UniVerse"/>
              <span className="font-semibold tracking-tight">UniVerse</span>
            </div>
            <nav className="flex items-center gap-3">
              <a href="#" className="text-slate-300 hover:text-white text-sm">About</a>
              <a href="#" className="text-slate-300 hover:text-white text-sm">Contact</a>
            </nav>
          </header>

          <Hero />

          <div className="mt-8 md:mt-12">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-100 mb-2">Hubs</h2>
            <p className="text-slate-300/90 mb-4">Explore academics, community, events, and marketplace. Create or remove items with instant updates.</p>
            <HubTabs />
          </div>

          <footer className="mt-16 py-8 text-center text-slate-400 text-sm">
            Built for campus life • Real-time updates • Secure student access
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App
