import * as React from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import {
  FileText,
  Mail,
  ArrowUpRight,
  MapPin,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [spotlight, setSpotlight] = React.useState({ x: 50, y: 50 })
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const tiltX = useSpring(rotateX, { stiffness: 160, damping: 18 })
  const tiltY = useSpring(rotateY, { stiffness: 160, damping: 18 })
  const springTransition = {
    type: "spring",
    stiffness: 100,
    damping: 15,
  } as const

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  }

  const handleCardMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    const rotateXValue = ((y - 50) / 50) * -8
    const rotateYValue = ((x - 50) / 50) * 10

    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)
    setSpotlight({ x, y })
  }

  const handleCardLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setSpotlight({ x: 50, y: 50 })
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: springTransition,
    },
  }

  return (
    <section className="relative w-full overflow-hidden px-4 py-16 perspective-[1000px] sm:px-6 sm:py-20 md:py-28 lg:px-8">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 -left-20 h-60 w-60 rounded-full bg-indigo-500/12 blur-[120px] sm:h-80 sm:w-80 sm:blur-[140px]" />
        <div className="absolute top-40 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px] sm:h-96 sm:w-96 sm:blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-indigo-400/10 blur-[120px] sm:h-72 sm:w-72 sm:blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.14),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[60px_60px] opacity-60" />
      </div>

      <motion.div
        className="mx-auto w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Text content */}
          <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-cyan-200 sm:px-4"
            >
              <span className="flex h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
              Available for Projects & Internship
            </motion.div>

            <div className="space-y-3">
              <motion.p
                variants={itemVariants}
                className="text-sm font-semibold text-slate-400"
              >
                Hi, I'm
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="text-emboss text-3xl font-extrabold tracking-tight text-slate-50 sm:text-4xl md:text-5xl lg:text-6xl"
              >
                <span className="bg-linear-to-r from-indigo-300 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  Muhammad Rahman
                </span>
              </motion.h1>
              <motion.h2
                variants={itemVariants}
                className="text-xl font-semibold text-slate-100 sm:text-2xl md:text-3xl"
              >
                Full-Stack Web Developer & AI Engineer
              </motion.h2>
            </div>

            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base md:text-lg lg:mx-0"
            >
                I build clean, responsive interfaces with a focus on clarity and
                performance. I enjoy turning complex problems into simple,
                usable experiences.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="group w-full bg-linear-to-r from-indigo-500 to-cyan-500 font-semibold text-slate-950 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(99,102,241,0.45)] sm:w-auto"
              >
                <a href="#projects">
                  View My Work
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full border-white/10 bg-white/5 text-slate-100 backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto"
              >
                <a href="#contact">
                  <Mail className="mr-2 h-4 w-4 text-cyan-300" />
                  Get In Touch
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="w-full text-slate-300 transition-all hover:bg-white/5 hover:text-white sm:w-auto"
              >
                <a href="/resume.pdf" target="_blank" rel="noreferrer">
                  <FileText className="mr-2 h-4 w-4 text-indigo-300" />
                  Download CV
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Profile card */}
          <div className="flex justify-center lg:col-span-5">
            <motion.div
              variants={itemVariants}
              className="glass-surface tilt-card relative w-full max-w-sm overflow-hidden rounded-2xl p-5 shadow-[0_40px_90px_rgba(4,7,15,0.8)] sm:max-w-96 sm:p-6"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                rotateX: tiltX,
                rotateY: tiltY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
            >
              <div
                className="spotlight-overlay absolute inset-0 opacity-80"
                style={
                  {
                    "--spot-x": `${spotlight.x}%`,
                    "--spot-y": `${spotlight.y}%`,
                  } as React.CSSProperties
                }
              />
              <div className="glass-border absolute inset-0 opacity-40" />
              <div className="absolute top-0 right-0 h-20 w-20 bg-linear-to-bl from-indigo-400/10 to-transparent blur-md" />
              <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/10 blur-2xl" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="tilt-child relative mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-slate-950/80 p-0.5 ring-4 ring-indigo-500/10 sm:h-24 sm:w-24 sm:p-1">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-indigo-500/20 to-cyan-500/20 text-gray-400">
                    <img src="profile.jpg" alt="Muhammad Rahman" className="h-full w-full object-cover" />
                  </div>
                </div>

                <h3 className="tilt-child text-lg font-bold text-white sm:text-xl">
                  Muhammad Rahman
                </h3>
                <p className="tilt-child mt-0.5 text-[10px] font-semibold tracking-[0.2em] text-cyan-200/90 uppercase sm:text-xs">
                  INFP-T
                </p>

                <div className="my-4 w-full border-t border-white/10 sm:my-5" />

                {/* Contact info list */}
                <ul className="w-full space-y-2.5 text-left text-xs text-slate-400 sm:space-y-3.5 sm:text-sm">
                  <li className="tilt-child flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-indigo-300 sm:h-4 sm:w-4" />
                    <span>Banjarmasin, Indonesia</span>
                  </li>
                  <li className="tilt-child flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-cyan-300 sm:h-4 sm:w-4" />
                    <span className="font-mono text-[11px] tracking-wide sm:text-xs">
                      +62 882-0219-04289
                    </span>
                  </li>
                </ul>

                <div className="tilt-child mt-4 w-full rounded-lg border border-white/10 bg-slate-950/80 p-2.5 text-left font-mono text-[9px] text-slate-500 sm:mt-5 sm:p-3 sm:text-[10px]">
                  <span className="text-indigo-300">const</span> skills = [
                  <span className="text-cyan-300">"React"</span>,{" "}
                  <span className="text-cyan-300">"Python"</span>,{" "}
                  <span className="text-cyan-300">"AI"</span>];
                </div>

                <motion.div
                  variants={itemVariants}
                  className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 sm:mt-4 sm:gap-3"
                >
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] sm:px-3 sm:text-xs">
                    Web Developer
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] sm:px-3 sm:text-xs">
                    AI Engineer
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
