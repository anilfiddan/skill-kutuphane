"use client";

import { useState, useMemo, useCallback } from "react";
import { skills } from "@/data/skills";
import { categories } from "@/data/categories";
import { CategoryKey, SectorKey, ImportanceLevel, Skill } from "@/types";
import SkillCard from "./SkillCard";
import SkillModal from "./SkillModal";
import Sidebar from "./Sidebar";

const PAGE_SIZE = 60;

export default function SkillLibrary() {
  const [search, setSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState<SectorKey | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | "all">("all");
  const [selectedImportance, setSelectedImportance] = useState<ImportanceLevel | "all">("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return skills.filter((skill) => {
      if (selectedSector !== "all" && skill.sector !== selectedSector) return false;
      if (selectedCategory !== "all" && skill.category !== selectedCategory) return false;
      if (selectedImportance !== "all" && skill.importance !== selectedImportance) return false;
      if (q) {
        return `${skill.name} ${skill.description} ${skill.tags.join(" ")}`.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, selectedSector, selectedCategory, selectedImportance]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const resetFilters = useCallback(() => {
    setSearch("");
    setSelectedSector("all");
    setSelectedCategory("all");
    setSelectedImportance("all");
    setVisibleCount(PAGE_SIZE);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of skills) counts[s.category] = (counts[s.category] || 0) + 1;
    return counts;
  }, []);

  const activeCategory = categories.find((c) => c.key === selectedCategory);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar — sabit, kendi ici scroll */}
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={(v) => { setSelectedCategory(v); setVisibleCount(PAGE_SIZE); }}
        selectedSector={selectedSector}
        setSelectedSector={(v) => { setSelectedSector(v); setSelectedCategory("all"); setVisibleCount(PAGE_SIZE); }}
        selectedImportance={selectedImportance}
        setSelectedImportance={(v) => { setSelectedImportance(v); setVisibleCount(PAGE_SIZE); }}
        categoryCounts={categoryCounts}
        resetFilters={resetFilters}
      />

      {/* Main — sabit header, liste scroll */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Search bar — sabit */}
        <div className="shrink-0 border-b border-zinc-100 bg-white">
          <div className="flex items-center gap-3 px-5 py-2.5">
            <svg className="h-4 w-4 shrink-0 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Ara..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE); }}
              className="flex-1 bg-transparent text-[13px] text-zinc-700 placeholder-zinc-400 outline-none"
            />
            <span className="shrink-0 rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-zinc-500">
              {filtered.length} sonuc
            </span>
          </div>
        </div>

        {/* Page header — sabit */}
        <div className="shrink-0 border-b border-zinc-50 px-5 pt-5 pb-4">
          <h1 className="text-[15px] font-semibold text-zinc-800">
            {selectedCategory !== "all" ? activeCategory?.name : "Tum Skill'ler"}
          </h1>
          {selectedCategory !== "all" && activeCategory ? (
            <p className="mt-0.5 text-[12px] text-zinc-400">{activeCategory.description}</p>
          ) : (
            <p className="mt-0.5 text-[12px] text-zinc-400">
              Kalfa, Tezgah ve SaaS Launcher'dan derlenen operasyonel prosedürler.
            </p>
          )}
        </div>

        {/* Skill listesi — sadece burasi scroll */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-20">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 text-zinc-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[13px] text-zinc-500">Aramanizla eslesen skill bulunamadi.</p>
              <button
                onClick={resetFilters}
                className="mt-2 text-[12px] font-medium text-zinc-900 underline decoration-zinc-300 hover:decoration-zinc-500"
              >
                Filtreleri temizle
              </button>
            </div>
          ) : (
            <>
              <div className="mb-1 flex items-center gap-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                <span className="w-5" />
                <span className="flex-1">Skill</span>
                <span className="hidden w-40 sm:block">Kategori</span>
                <span className="hidden w-20 md:block">Onem</span>
                <span className="w-6" />
              </div>

              <div className="divide-y divide-zinc-50">
                {visible.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    onClick={() => setActiveSkill(skill)}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="mt-5 flex justify-center pb-4">
                  <button
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="rounded-lg bg-zinc-900 px-5 py-2 text-[12px] font-medium text-white transition-colors hover:bg-zinc-800"
                  >
                    Daha fazla yukle &middot; {filtered.length - visibleCount} kaldi
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {activeSkill && (
        <SkillModal skill={activeSkill} onClose={() => setActiveSkill(null)} />
      )}
    </div>
  );
}
