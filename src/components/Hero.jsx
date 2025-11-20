import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/hGDm7Foxug7C6E8s/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full w-full bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-20 flex items-end p-6 md:p-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow">UniVerse</h1>
          <p className="mt-3 md:mt-4 text-slate-200/90 max-w-2xl">
            Your campus community hub for academics, clubs, events, and the student marketplace — all in one place.
          </p>
        </div>
      </div>
    </section>
  )
}
