import * as React from "react"
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Award,
  Briefcase,
  Wrench,
  FileText,
  ExternalLink,
  Maximize2
} from "lucide-react"

// Interface data terstruktur
interface EducationItem {
  id: number;
  type: string;
  institution: string;
  program: string;
  period: string;
  gpa: string;
  experience: string[];
  skills: string[];
  certificates: { name: string; url: string }[];
}

interface CertificateItem {
  id: number;
  name: string;
  issuer: string;
  year: string;
  url: string;
}

export default function AboutMe() {
  const [selectedEducation, setSelectedEducation] = React.useState<EducationItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [showAllVerifiedCertificates, setShowAllVerifiedCertificates] = React.useState(false);

  const VERIFIED_CERTS_PREVIEW_COUNT = 4;

  const toWebsiteUrl = (url: string) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    if (typeof window === "undefined") {
      return url;
    }

    return new URL(url, window.location.origin).toString();
  };

  const springTransition = {
    type: "spring",
    stiffness: 120,
    damping: 18,
  } as const

  const handleSpotlight = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    event.currentTarget.style.setProperty("--spot-x", `${x}%`)
    event.currentTarget.style.setProperty("--spot-y", `${y}%`)
  }

  const handleSpotlightLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--spot-x", "50%")
    event.currentTarget.style.setProperty("--spot-y", "50%")
  }

  const openEducationDetails = (edu: EducationItem) => {
    setSelectedEducation(edu);
    setIsDialogOpen(true);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: springTransition },
  }

  // Data Akademis & Beasiswa lengkap
  const educationList: EducationItem[] = [
    {
      id: 1,
      type: "College · 2023-Now",
      institution: "UNISKA MAB",
      program: "Informatics Technology (IT) degree",
      period: "2023 - Present",
      gpa: "GPA: 3.75 / 4.00",
      experience: [
        "Mengembangkan sistem informasi kelompok mahasiswa angkatan TI E'23.",
        "Membantu rekan mahasiswa dalam memahami struktur data dan pemrograman web dasar.",
        "Aktif berpartisipasi dalam program-program kemahasiswaan bidang riset teknologi."
      ],
      skills: ["Algoritma & Struktur Data", "Basis Data (SQL)", "Rekayasa Perangkat Lunak", "Pemrograman Berorientasi Objek (OOP)"],
      certificates: [
        { name: "Sertifikat Kelulusan Program Kampus", url: "/certificate/sertifikat/sertifikat-kelulusan.pdf" },
        { name: "Logika Pemrograman Dasar", url: "/certificate/sertifikat/logika.pdf" },
        { name: "Pengenalan Software Engineering", url: "/certificate/sertifikat/software.pdf" }
      ]
    },
    {
      id: 2,
      type: "Scholarship · SIB",
      institution: "Pijak By Dicoding 2026",
      program: "AI Engineering path",
      period: "2026",
      gpa: "GPA: 3.75 / 4.00",
      experience: [
        "Merancang pipeline pemrosesan data untuk model Computer Vision menggunakan YOLOv11.",
        "Mengimplementasikan evaluasi metrik akurasi (mAP, Precision, Recall) untuk project klasifikasi.",
        "Melakukan deployment model AI ke dalam bentuk web API sederhana."
      ],
      skills: ["Python", "Machine Learning", "Computer Vision", "YOLOv11", "Scikit-Learn", "Web Scraping"],
      certificates: [
        { name: "AI Engineering Certificate", url: "/certificate/sertifikat/ai.pdf" },
        { name: "Cloud Computing Essentials", url: "/certificate/sertifikat/cloud.pdf" },
        { name: "Git & GitHub Version Control", url: "/certificate/sertifikat/git.pdf" }
      ]
    },
    {
      id: 3,
      type: "Scholarship · SIB",
      institution: "Asah By Dicoding 2025",
      program: "React & Back-end (REBE) path",
      period: "2025",
      gpa: "GPA: 3.75 / 4.00",
      experience: [
        "Membangun aplikasi single page application (SPA) interaktif menggunakan React dengan integrasi state management global.",
        "Merancang RESTful API aman menggunakan Node.js, Express, dan PostgreSQL dengan enkripsi JWT.",
        "Melakukan optimasi kinerja rendering frontend dan query database."
      ],
      skills: ["React.js", "Node.js", "Express", "RESTful API", "PostgreSQL", "JavaScript (ES6+)"],
      certificates: [
        { name: "Backend Developer Certificate", url: "/certificate/sertifikat/backend.pdf" },
        { name: "Frontend Developer Certificate", url: "/certificate/sertifikat/frontend.pdf" },
        { name: "Fundamental Backend Developer", url: "/certificate/sertifikat/fundamental-backend.pdf" },
        { name: "Fundamental React Developer", url: "/certificate/sertifikat/fundamental-react.pdf" },
        { name: "Basic React Developer", url: "/certificate/sertifikat/basic-react.pdf" },
        { name: "JavaScript Programming", url: "/certificate/sertifikat/javascript.pdf" },
        { name: "Web Development Fundamentals", url: "/certificate/sertifikat/web.pdf" }
      ]
    }
  ];

  // Data sertifikat yang ditampilkan langsung secara rapi di dalam section education
  const verifiedCertificates: CertificateItem[] = [
    { id: 1, name: "AI Engineering", issuer: "Dicoding", year: "2026", url: "/certificate/sertifikat/ai.pdf" },
    { id: 2, name: "Backend Developer", issuer: "Dicoding", year: "2025", url: "/certificate/sertifikat/backend.pdf" },
    { id: 3, name: "Frontend Developer", issuer: "Dicoding", year: "2025", url: "/certificate/sertifikat/frontend.pdf" },
    { id: 4, name: "Cloud Computing Essentials", issuer: "Dicoding", year: "2026", url: "/certificate/sertifikat/cloud.pdf" },
    { id: 5, name: "Git & GitHub Version Control", issuer: "Dicoding", year: "2025", url: "/certificate/sertifikat/git.pdf" },
    { id: 6, name: "JavaScript", issuer: "Dicoding", year: "2025", url: "/certificate/sertifikat/javascript.pdf" }
  ];

  const visibleVerifiedCertificates = showAllVerifiedCertificates
    ? verifiedCertificates
    : verifiedCertificates.slice(0, VERIFIED_CERTS_PREVIEW_COUNT);

  return (
    <section
      id="about"
      className="mx-auto w-full max-w-6xl px-4 py-16 perspective-[1000px] sm:px-6 sm:py-20 md:py-24"
    >
      {/* Section Header */}
      <div className="mb-8 text-center sm:mb-10 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <span className="mb-3 inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold tracking-[0.15em] text-amber-300 uppercase sm:text-xs">
            About Me
          </span>
          <h2 className="text-emboss text-2xl font-extrabold tracking-tight text-slate-50 sm:text-3xl md:text-4xl">
            Who I Am
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs text-slate-400 sm:text-sm">
            Fokus pada produk web yang rapi, cepat, dan punya depth visual modern.
          </p>
        </motion.div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {/* Bio Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ rotateX: -4, rotateY: 4, translateY: -6 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          className="flex"
        >
          <Card
            className="glass-surface tilt-card relative flex flex-col overflow-hidden w-full"
            onMouseMove={handleSpotlight}
            onMouseLeave={handleSpotlightLeave}
          >
            <div className="spotlight-overlay absolute inset-0 opacity-70" />
            <div className="glass-border absolute inset-0 opacity-50" />
            <CardHeader>
              <CardDescription className="relative z-10 text-xs leading-relaxed text-slate-400 sm:text-sm">
                An undergraduate Informatics Engineering student at UNISKA MAB Banjarmasin, focusing on
                FullStack Web (React, Vue.JS). Eager to continue
                learning, collaborating, and actively contributing to the community to build innovative solutions.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 mt-auto grid gap-4">
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="tilt-child rounded-lg border border-white/10 bg-amber-300/15 px-3 py-2.5 sm:px-4 sm:py-3">
                  <p className="text-[10px] text-slate-400 sm:text-xs">Experience</p>
                  <p className="text-base font-semibold text-slate-50 sm:text-xl">
                    1+ years
                  </p>
                </div>
                <div className="tilt-child rounded-lg border border-white/10 bg-green-300/15 px-3 py-2.5 sm:px-4 sm:py-3">
                  <p className="text-[10px] text-slate-400 sm:text-xs">Projects</p>
                  <p className="text-base font-semibold text-slate-50 sm:text-xl">
                    2+ projects
                  </p>
                </div>
                <div className="tilt-child rounded-lg border border-white/10 bg-red-600/15 px-3 py-2.5 sm:px-4 sm:py-3">
                  <p className="text-[10px] text-slate-400 sm:text-xs">Currently Focus</p>
                  <p className="text-base font-semibold text-slate-50 sm:text-xl">
                    AI Engineer
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-400 sm:text-sm">
                Currently exploring advanced component architecture, design
                systems, and performance tuning for modern web apps.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Education Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ rotateX: -4, rotateY: -4, translateY: -6 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          className="flex"
        >
          <Card
            className="glass-surface tilt-card relative flex flex-col overflow-hidden w-full"
            onMouseMove={handleSpotlight}
            onMouseLeave={handleSpotlightLeave}
          >
            <div className="spotlight-overlay absolute inset-0 opacity-70" />
            <div className="glass-border absolute inset-0 opacity-50" />
            <CardHeader>
              <CardTitle className="relative z-10 text-slate-50">Education</CardTitle>
              <CardDescription className="relative z-10 text-slate-400">
                Where I learned the foundations. Klik kartu untuk melihat detail.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 grid gap-4 max-h-[520px] overflow-y-auto pr-2">
              {/* Education List */}
              <div className="grid gap-3">
                {educationList.map((edu) => (
                  <div
                    key={edu.id}
                    onClick={() => openEducationDetails(edu)}
                    className="group/edu tilt-child rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 sm:px-4 sm:py-3 hover:bg-white/10 hover:border-indigo-400/30 transition-all duration-300 cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[10px] text-slate-400 sm:text-xs font-mono">{edu.type}</p>
                      <p className="text-sm font-bold text-slate-50 sm:text-base">{edu.institution}</p>
                      <p className="text-xs text-slate-400 sm:text-sm">{edu.program}</p>
                      <p className="text-xs font-semibold text-indigo-300 sm:text-sm mt-0.5">{edu.gpa}</p>
                    </div>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950/60 border border-white/10 group-hover/edu:bg-indigo-500/10 group-hover/edu:text-indigo-300 text-slate-400 transition-colors">
                      <Maximize2 className="h-3.5 w-3.5" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="my-2 border-t border-white/10" />

              {/* Verified Certificates Sub-section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-300" />
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Sertifikat Terverifikasi (Dicoding)
                  </h4>
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {visibleVerifiedCertificates.map((cert) => (
                    <a
                      key={cert.id}
                      href={toWebsiteUrl(cert.url)}
                      target="_blank"
                      rel="noreferrer"
                      className="group/cert relative flex items-center gap-2.5 rounded-lg border border-white/5 bg-white/5 p-2 hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/20 group-hover/cert:bg-amber-400/20 group-hover/cert:text-amber-200 transition-colors">
                        <FileText className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0 grow">
                        <p className="truncate text-[11px] font-bold text-slate-200 group-hover/cert:text-slate-50 transition-colors">
                          {cert.name}
                        </p>
                        <p className="text-[9px] text-slate-400">
                          {cert.issuer} · {cert.year}
                        </p>
                      </div>
                      <ExternalLink className="h-3 w-3 shrink-0 text-slate-500 group-hover/cert:text-amber-300 transition-colors" />
                    </a>
                  ))}
                </div>

                {verifiedCertificates.length > VERIFIED_CERTS_PREVIEW_COUNT && (
                  <div className="flex justify-center pt-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-slate-300 hover:bg-white/5 hover:text-slate-50"
                      onClick={() => setShowAllVerifiedCertificates((v) => !v)}
                    >
                      {showAllVerifiedCertificates ? "Show less" : "See all"}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recruiter Education Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedEducation && (
          <DialogContent className="sm:max-w-2xl bg-[#0d1224] border border-white/10 text-slate-100 shadow-2xl overflow-y-auto max-h-[85vh] p-6 focus:outline-none">
            <DialogHeader className="border-b border-white/10 pb-4 mb-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 px-2.5 py-0.5 text-[10px] font-mono text-indigo-300">
                {selectedEducation.type}
              </div>
              <DialogTitle className="text-2xl font-extrabold text-slate-50 mt-2">
                {selectedEducation.institution}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-slate-400 mt-1">
                {selectedEducation.program} · {selectedEducation.gpa}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Relevant Experience Section */}
              <div className="space-y-2.5">
                <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2 uppercase tracking-wider">
                  <Briefcase className="h-4 w-4 shrink-0 text-indigo-400" />
                  Pengalaman Relevan
                </h3>
                <div className="space-y-2">
                  {selectedEducation.experience.map((exp, i) => (
                    <div key={i} className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-slate-950/40 p-3.5 text-xs sm:text-sm leading-relaxed text-slate-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Skills Section */}
              <div className="space-y-2.5">
                <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2 uppercase tracking-wider">
                  <Wrench className="h-4 w-4 shrink-0 text-cyan-400" />
                  Skill / Keahlian Berkaitan
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedEducation.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specific Certificates Earned Section */}
              <div className="space-y-2.5">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2 uppercase tracking-wider">
                  <Award className="h-4 w-4 shrink-0 text-amber-400" />
                  Sertifikat yang Dimiliki
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {selectedEducation.certificates.map((cert, i) => (
                    <a
                      key={i}
                      href={toWebsiteUrl(cert.url)}
                      target="_blank"
                      rel="noreferrer"
                      className="group/certitem flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-slate-950/40 p-3 hover:bg-white/5 hover:border-amber-400/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText className="h-4 w-4 shrink-0 text-slate-400 group-hover/certitem:text-amber-300 transition-colors" />
                        <span className="truncate text-xs text-slate-300 group-hover/certitem:text-slate-200 transition-colors font-medium">
                          {cert.name}
                        </span>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-500 group-hover/certitem:text-amber-300 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end border-t border-white/10 pt-4">
              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/10 hover:text-white cursor-pointer"
                onClick={() => setIsDialogOpen(false)}
              >
                Close Details
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}
