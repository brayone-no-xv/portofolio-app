import { motion } from "framer-motion"
import { ArrowUpRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section id="contact" className="relative w-full overflow-hidden py-16 sm:py-20 md:py-28">
      {/* Background glow effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/15 blur-[140px] sm:h-96 sm:w-96" />
        <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-emerald-300 uppercase sm:text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Open to Opportunities
          </span>

          {/* Heading */}
          <div className="space-y-3">
            <h2 className="text-emboss text-2xl font-extrabold tracking-tight text-slate-50 sm:text-3xl md:text-4xl lg:text-5xl">
              Let's Build Something{" "}
              <span className="bg-linear-to-r from-indigo-300 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            <p className="mx-auto max-w-lg text-xs leading-relaxed text-slate-400 sm:text-sm md:text-base">
              I'm available for freelance work, full-time roles, and exciting collaborations.
              Let's connect and create something impactful.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Button
              asChild
              size="lg"
              className="group w-full bg-linear-to-r from-indigo-500 to-cyan-500 font-semibold text-slate-950 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(99,102,241,0.45)] sm:w-auto"
            >
              <a href="mailto:your-email@example.com">
                <Mail className="mr-2 h-4 w-4" />
                Send Me an Email
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </Button>
          </div>

          {/* Decorative divider */}
          <div className="mx-auto flex items-center gap-3 pt-4 sm:pt-6">
            <div className="h-px grow bg-linear-to-r from-transparent to-white/10" />
            <span className="text-[10px] font-mono tracking-wider text-slate-500 sm:text-xs">
              muhammad.rahman
            </span>
            <div className="h-px grow bg-linear-to-l from-transparent to-white/10" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
