import StatsBar from "@/components/StatsBar";
import SkillLibrary from "@/components/SkillLibrary";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-lg">
              S
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-zinc-100">
                Skill Kutuphanesi
              </h1>
              <p className="text-sm text-zinc-500">Sirket Ici Arac Seti</p>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Kalfa, Tezgah ve SaaS Launcher projelerinden derlenen 1000+
            profesyonel skill. Yapay zeka, pazarlama, gelistirme, satis,
            tasarim ve daha fazlasi — tek bir kutuphanede.
          </p>
        </div>
      </header>

      {/* Stats */}
      <StatsBar />

      {/* Skill Library with Filters */}
      <SkillLibrary />

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
        Skill Kutuphanesi — Sirket ici kullanim icin. Kalfa &amp; Tezgah
        &amp; SaaS Launcher Skills.
      </footer>
    </main>
  );
}
