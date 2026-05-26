"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Briefcase, Calendar, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

type ExperienceItem = {
  id: number
  role: string
  organization: string
  period: string
  achievements: string[]
}

// Data Riwayat Nyata yang Disesuaikan Secara Profesional
const EXPERIENCES: ExperienceItem[] = [
  {
    id: 1,
    organization: "Pijak by Dicoding",
    role: "AI Engineering Student (Scholarship)",
    period: "January 2026 - Present",
    achievements: [
      "Mempelajari integrasi Machine Learning pipeline ke dalam lingkungan produksi web.",
      "Mengembangkan model komputer visi untuk klasifikasi data berbasis objek.",
      "Berkolaborasi dalam tim lintas fungsi untuk menyelesaikan proyek capstone AI."
    ],
  },
  {
    id: 2,
    organization: "Google Student Ambassador",
    role: "Ambassador - Alumni",
    period: "Batch 1 (September 2025 - Februari 2026)",
    achievements: [
      "Menjembatani komunitas mahasiswa dengan sumber daya teknologi dan materi edukasi Google.",
      "Mengkreasi konten tentang fitur-fitur Gemini untuk membantu audiens dengan produkvitas sehari-hari"
    ],
  },
  {
    id: 3,
    organization: "UNISKA MAB",
    role: "Informatics Technologies Student",
    period: "2023 - Present",
    achievements: [
      "Fokus pada pendalaman arsitektur Full-Stack Web dan implementasi kecerdasan buatan.",
      "Mempertahankan capaian akademis yang relevan dengan target industri software engineering."
    ],
  },
  {
    id: 4,
    organization: "Indosat Ooredo Hutchison Digital Camp (ID Camp)",
    role: "AI Multi-platform App Participation",
    period: "2026",
    achievements: [
      "Fokus pada pendalaman arsitektur Full-Stack Web dan implementasi kecerdasan buatan.",
    ],
  },
  {
    id: 5,
    organization: "Asah Led By Dicoding - React & Back-End (REBE) kohort",
    role: "Participation",
    period: "2026",
    achievements: [
      "Fokus pada pendalaman arsitektur Full-Stack Web dan implementasi kecerdasan buatan.",
    ],
  }
]

export default function ExperienceCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const progress = count > 0 ? (current * 100) / count : 0

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  // Fungsi navigasi manual eksternal untuk kontrol tombol yang lebih fleksibel
  const scrollPrev = () => api?.scrollPrev()
  const scrollNext = () => api?.scrollNext()

  return (
    <section id="experience" className="mx-auto w-full max-w-6xl px-4 py-16 perspective-distant sm:px-6 sm:py-20 md:py-24">
      {/* Section Header */}
      <div className="mb-8 text-center sm:mb-10 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <span className="mb-3 inline-block rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-[11px] font-semibold tracking-[0.15em] text-indigo-300 uppercase sm:text-xs">
            Journey
          </span>
          <h2 className="text-emboss text-2xl font-extrabold tracking-tight text-slate-50 sm:text-3xl md:text-4xl">
            Experience
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs text-slate-400 sm:text-sm">
            Rekam jejak akademis, beasiswa kontemporer, dan keterlibatan saya dalam komunitas teknologi.
          </p>
        </motion.div>
      </div>

      <div className="mb-6 flex flex-col items-center gap-3 sm:mb-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
          My Experience So Far
        </p>

        <div className="flex items-center justify-center gap-6 sm:gap-10">
          <img
            src="/achievement/gsa.png"
            alt="Google Student Ambassador"
            className="h-8 w-auto opacity-90 sm:h-10"
            loading="lazy"
            decoding="async"
          />
          <img
            src="/achievement/asah.png"
            alt="Asah Led"
            className="h-8 w-auto opacity-90 sm:h-10"
            loading="lazy"
            decoding="async"
          />
          <img
            src="/achievement/pijak.png"
            alt="Pijak"
            className="h-8 w-auto opacity-90 sm:h-10"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* Carousel */}
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent className="-ml-4">
          {EXPERIENCES.map((item, index) => (
            <CarouselItem key={item.id} className="pl-4 md:basis-1/1">
              <motion.div
                animate={{ rotateY: current - 1 === index ? 0 : index < current - 1 ? -8 : 8 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className="tilt-card"
              >
                <Card className="relative overflow-hidden glass-surface">
                  <div className="absolute inset-0 glass-border opacity-40" />
                  <CardHeader className="border-b border-white/10 bg-white/5 px-4 py-4 sm:px-6 sm:py-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-50 sm:text-lg md:text-xl">
                          <Briefcase className="h-4 w-4 shrink-0 text-indigo-300" />
                          <span className="line-clamp-2 sm:line-clamp-none">{item.organization}</span>
                        </CardTitle>
                        <span className="text-xs font-semibold text-cyan-300 sm:text-sm">
                          {item.role}
                        </span>
                      </div>
                      <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#0b1020] px-2.5 py-1 text-[10px] font-mono text-slate-400 border border-white/10 sm:px-3 sm:text-xs">
                        <Calendar className="h-3 w-3 text-indigo-300" />
                        {item.period}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="px-4 py-4 sm:px-6 sm:py-6">
                    <ul className="space-y-2.5 sm:space-y-3">
                      {item.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-400 sm:gap-3 sm:text-sm">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300/90 sm:h-4 sm:w-4" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Carousel Controls */}
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 sm:mt-6">
        <div className="text-[10px] font-mono text-slate-500 sm:text-xs">
          Slide <span className="text-slate-200">{current}</span> of <span className="text-slate-200">{count}</span>
        </div>

        <div className="mx-3 grow max-w-32 sm:mx-4 sm:max-w-50 md:max-w-75">
          <Progress value={progress} className="h-1 bg-[#0b1020] border border-white/10 sm:h-1.5" />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            disabled={current === 1}
            className="h-7 w-7 border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white disabled:opacity-30 sm:h-8 sm:w-8"
          >
            <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={current === count}
            className="h-7 w-7 border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white disabled:opacity-30 sm:h-8 sm:w-8"
          >
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}