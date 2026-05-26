import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedTabs, type AnimatedTab } from "@/components/ui/animated-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ExternalLink,
  Code,
  Target,
  Users,
  Cpu,
  Trophy,
  Maximize2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Definisikan Interface data yang ketat
interface ProjectCardProps {
  id: number;
  name: string;
  description: string;
  tags?: string[];
  demoUrl?: string;
  repoUrl?: string;
  category: "web" | "mobile" | "saas";
  banner: {
    src: string;
    alt: string;
  };
  // Detail tambahan untuk recruiter modal
  goal: string;
  userStory: string[];
  requirements: string[];
  outcome: string[];
}

export default function CardPost() {
  const [selectedProject, setSelectedProject] = React.useState<ProjectCardProps | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState<"all" | "web" | "mobile" | "saas">("all");

  const projectTabs: AnimatedTab[] = [
    { value: "all", label: "All" },
    { value: "web", label: "Web" },
    { value: "mobile", label: "Mobile" },
    { value: "saas", label: "SaaS" },
  ];

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

  const openProjectDetails = (project: ProjectCardProps) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const bannerToneByCategory: Record<ProjectCardProps["category"], string> = {
    web: "from-indigo-500/35 via-transparent to-cyan-500/30",
    mobile: "from-sky-500/30 via-transparent to-emerald-500/25",
    saas: "from-amber-400/30 via-transparent to-rose-500/25",
  };

  // Data proyek portofolio dengan detail super-lengkap untuk recruiter
  const projectList: ProjectCardProps[] = [
    {
      id: 1,
      name: "CivicNode AI",
      description: "Aplikasi deteksi dan klasifikasi jenis sampah real-time menggunakan WebCam berbasis YOLOv11.",
      tags: ["React", "Python", "YOLOv11"],
      category: "web",
      banner: {
        src: "/project/civicnode-app/Screenshot%202026-04-27%20at%2018-47-58%20CivicNode%20AI.png",
        alt: "CivicNode AI preview",
      },
      demoUrl: "https://github.com",
      repoUrl: "https://github.com",
      goal: "Mengembangkan sistem kecerdasan buatan berbasis computer vision untuk mendeteksi, mengenali, dan mengklasifikasikan kategori sampah secara real-time dari umpan video kamera, dengan tujuan mempercepat proses pemilahan sampah mandiri bagi warga dan otomatisasi pemilahan di fasilitas daur ulang.",
      userStory: [
        "Sebagai seorang pengelola fasilitas daur ulang, saya ingin sistem mendeteksi jenis sampah secara otomatis dan instan dari umpan video kamera, sehingga proses pemilahan dapat dipercepat tanpa kebingungan manual.",
        "Sebagai warga yang peduli lingkungan, saya ingin mengarahkan kamera ponsel/webcam saya ke suatu benda untuk mengetahui apakah itu organik, anorganik, atau limbah berbahaya, agar saya membuangnya di tempat yang tepat."
      ],
      requirements: [
        "Inferensi webcam real-time (kamera 720p/1080p) dengan latensi minimal (<50ms).",
        "Model YOLOv11 dengan arsitektur terlatih (custom trained) untuk mengenali kelas sampah: Plastik, Kertas, Logam, Organik, B3, Residu.",
        "Antarmuka visual responsif berbasis React.js untuk menggambar bounding-box dan persentase keyakinan (confidence score) secara presisi.",
        "Server backend berbasis Python (FastAPI) untuk memproses unggahan gambar/video inferencing berkecepatan tinggi."
      ],
      outcome: [
        "Berhasil dideploy dengan performa deteksi real-time mencapai 30+ FPS pada perangkat GPU standar.",
        "Akurasi deteksi model (mAP@0.5) mencapai 88.5% dalam mengenali 6 kategori sampah umum di lingkungan pemukiman.",
        "Uji coba awal di fasilitas lokal menunjukkan pengurangan kesalahan klasifikasi sampah manual sebesar 42%."
      ]
    },
    {
      id: 2,
      name: "BankScore AI",
      description: "Sistem clustering data keuangan untuk mendeteksi anomali transaksi pada sistem database Kemenkeu.",
      tags: ["Next.js", "Python", "Scikit-Learn"],
      category: "saas",
      banner: {
        src: "/project/bankscore-ai/bankscore-banner.svg",
        alt: "BankScore AI preview",
      },
      demoUrl: "https://github.com",
      repoUrl: "https://github.com",
      goal: "Membangun platform analitis cerdas menggunakan algoritma unsupervised learning (clustering) untuk mendeteksi anomali pola transaksi keuangan yang mencurigakan di database kementerian, meminimalkan potensi kecurangan (fraud) dan mempermudah proses audit keuangan negara.",
      userStory: [
        "Sebagai seorang auditor kepatuhan keuangan di Kemenkeu, saya ingin mengelompokkan transaksi otomatis berdasarkan kemiripan pola agar saya dapat dengan cepat mengidentifikasi klaster transaksi dengan skor risiko anomali tinggi.",
        "Sebagai analis sistem, saya ingin visualisasi interaktif dari klaster transaksi agar saya mudah mempresentasikan temuan anomali kepada pimpinan."
      ],
      requirements: [
        "Pipeline pengolahan data masif (data cleansing & normalisasi) menggunakan Python Pandas dan Scikit-Learn.",
        "Implementasi algoritma clustering K-Means / DBSCAN dengan optimasi Silhouette Score dan analisis Elbow Method.",
        "Dashboard front-end modern berbasis Next.js dengan visualisasi grafis interaktif (Chart.js / D3.js) untuk memetakan klaster transaksi secara 2D/3D.",
        "Autentikasi ketat berbasis Role-Based Access Control (RBAC) dengan audit log komprehensif untuk keamanan akses data."
      ],
      outcome: [
        "Berhasil mengidentifikasi lebih dari 150 transaksi anomali bernilai tinggi dari dataset simulasi 100,000+ entri.",
        "Menghemat waktu peninjauan awal transaksi yang mencurigakan hingga 70% dibanding audit manual tradisional.",
        "Sistem pengelompokan yang sangat responsif dengan metrik Silhouette Score mencapai 0.74, menjamin keakuratan pemisahan klaster."
      ]
    },
    {
      id: 3,
      name: "My Portfolio",
      description: "Portofolio digital modern yang interaktif dengan estetika premium yang memikat recruiter, menampilkan keahlian Full-Stack Web dan AI Engineering saya.",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      category: "web",
      banner: {
        src: "/project/portofolio/portofolio.png",
        alt: "Portfolio website preview",
      },
      demoUrl: "https://github.com",
      repoUrl: "https://github.com",
      goal: "Membangun portofolio digital pribadi berstandar industri dengan performa load tinggi, estetika visual premium, dan pengalaman interaktif modern (seperti glassmorphic surface dan dynamic spotlights) untuk menunjukkan kompetensi teknis saya kepada recruiter secara komprehensif.",
      userStory: [
        "Sebagai seorang perekrut teknologi (recruiter), saya ingin melihat deskripsi proyek yang mendalam, pengalaman relevan, dan bukti kompetensi (sertifikat) secara terintegrasi dan cepat di satu tempat, dengan interaksi visual yang mulus.",
        "Sebagai pengembang, saya ingin portofolio yang dapat menampilkan keahlian saya dengan sentuhan desain state-of-the-art (glassmorphic, tilt-effects, dynamic spotlights) untuk menunjukkan perhatian saya terhadap kualitas visual dan UX."
      ],
      requirements: [
        "Pemuatan aset instan dan build super-cepat menggunakan bundler Vite dengan TypeScript.",
        "Sistem desain modern, gelap (dark mode-first), responsif terhadap ukuran layar apa pun memakai Tailwind CSS.",
        "Animasi antarmuka yang sangat halus, transisi layout halaman dinamis, serta efek interaktif 3D tilt menggunakan Framer Motion.",
        "Integrasi komponen modular shadcn/ui berbasis Radix UI untuk menjamin aksesibilitas dan fungsionalitas UI yang andal."
      ],
      outcome: [
        "Mencapai skor performa audit Google Lighthouse sebesar 98% untuk kategori Best Practices dan SEO.",
        "Menyediakan fitur modal detail interaktif untuk mempermudah recruiter melakukan peninjauan mendalam.",
        "Berhasil menarik perhatian beberapa partner industri melalui tampilan portofolio yang wows dan berkelas premium."
      ]
    },
  ];

  const visibleProjects =
    activeCategory === "all"
      ? projectList
      : projectList.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-4 py-16 perspective-distant sm:px-6 sm:py-20 md:py-24">
      {/* Section Header */}
      <div className="mb-8 text-center sm:mb-10 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <span className="mb-3 inline-block rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-[11px] font-semibold tracking-[0.15em] text-rose-300 uppercase sm:text-xs">
            Portfolio
          </span>
          <h2 className="text-emboss text-2xl font-extrabold tracking-tight text-slate-50 sm:text-3xl md:text-4xl">
            Featured Projects
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs text-slate-400 sm:text-sm">
            Proyek yang menonjol dengan fokus pada AI, visual modern, dan hasil yang bisa dipakai.
          </p>

          <div className="mt-5 flex justify-center">
            <AnimatedTabs
              tabs={projectTabs}
              value={activeCategory}
              onValueChange={(next) => setActiveCategory(next as typeof activeCategory)}
            />
          </div>
        </motion.div>
      </div>

      {/* Project Cards Grid — 1 col mobile, 2 col on sm+ */}
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        {visibleProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ rotateX: -4, rotateY: 4, translateY: -6 }}
            transition={{ type: "spring", stiffness: 130, damping: 18, delay: index * 0.08 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex"
          >
            <Card
              className="group relative flex h-full w-full flex-col justify-between overflow-hidden glass-surface tilt-card cursor-pointer"
              onMouseMove={handleSpotlight}
              onMouseLeave={handleSpotlightLeave}
              onClick={() => openProjectDetails(project)}
            >
              <div className="absolute inset-0 spotlight-overlay opacity-70" />
              <div className="absolute inset-0 glass-border opacity-40" />

              <CardContent className="relative z-10 p-0 grow">
                {/* Project thumbnail area */}
                <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-[#0b1020]">
                  <img
                    src={project.banner.src}
                    alt={project.banner.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-linear-to-br ${bannerToneByCategory[project.category]} opacity-80`} />
                  <div className="absolute inset-0 bg-linear-to-t from-[#05070f] via-transparent to-transparent" />
                  
                  {/* Click indicator button */}
                  <div className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/80 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="h-4 w-4 text-indigo-300 animate-pulse" />
                  </div>
                </div>
                
                {/* Project info */}
                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  <CardTitle className="text-lg font-bold text-slate-50 transition-colors group-hover:text-indigo-300 sm:text-xl">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:mt-2 sm:text-sm">
                    {project.description}
                  </CardDescription>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-cyan-200 tilt-child sm:px-2.5 sm:text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter 
                className="relative z-10 flex gap-2 border-t border-white/10 px-4 py-2.5 bg-white/5 sm:py-3"
                onClick={(e) => e.stopPropagation()} // Prevent triggering parent Card click
              >
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="grow text-xs text-slate-300 hover:bg-white/10 hover:text-indigo-300 gap-2 active:scale-95 sm:text-sm cursor-pointer"
                  asChild
                >
                  <a href={project.repoUrl} target="_blank" rel="noreferrer">
                    <Code className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Code</span>
                  </a>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="grow text-xs text-slate-300 hover:bg-white/10 hover:text-cyan-300 gap-2 active:scale-95 sm:text-sm cursor-pointer"
                  asChild
                >
                  <a href={project.demoUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Live Demo</span>
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recruiter Project Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedProject && (
          <DialogContent className="sm:max-w-2xl bg-[#0d1224] border border-white/10 text-slate-100 shadow-2xl overflow-y-auto max-h-[85vh] p-6 focus:outline-none">
            <DialogHeader className="border-b border-white/10 pb-4 mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedProject.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-indigo-500/10 border border-indigo-400/20 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-300 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <DialogTitle className="text-2xl font-extrabold text-slate-50">
                {selectedProject.name}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-slate-400 mt-1">
                Detail komprehensif, tujuan, user story, kebutuhan sistem, dan pencapaian proyek.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Goal Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2 uppercase tracking-wider">
                  <Target className="h-4 w-4 shrink-0 text-indigo-400" />
                  Tujuan Awal Project
                </h3>
                <div className="rounded-lg border border-white/5 bg-white/5 p-3.5 text-xs sm:text-sm leading-relaxed text-slate-300">
                  {selectedProject.goal}
                </div>
              </div>

              {/* User Story Section */}
              <div className="space-y-2.5">
                <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2 uppercase tracking-wider">
                  <Users className="h-4 w-4 shrink-0 text-cyan-400" />
                  User Story
                </h3>
                <div className="space-y-2">
                  {selectedProject.userStory.map((story, i) => (
                    <div key={i} className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-slate-950/40 p-3 text-xs sm:text-sm leading-relaxed text-slate-300">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-400/20">
                        {i + 1}
                      </div>
                      <span>{story}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements Section */}
              <div className="space-y-2.5">
                <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2 uppercase tracking-wider">
                  <Cpu className="h-4 w-4 shrink-0 text-purple-400" />
                  Kebutuhan Sistem / Requirements
                </h3>
                <ul className="grid gap-2">
                  {selectedProject.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-slate-950/40 p-3 text-xs sm:text-sm leading-relaxed text-slate-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcome Section */}
              <div className="space-y-2.5">
                <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2 uppercase tracking-wider">
                  <Trophy className="h-4 w-4 shrink-0 text-emerald-400" />
                  Hasil Akhir & Pencapaian
                </h3>
                <div className="space-y-2">
                  {selectedProject.outcome.map((out, i) => (
                    <div key={i} className="flex items-start gap-2.5 rounded-lg border border-emerald-500/10 bg-emerald-500/5 p-3 text-xs sm:text-sm leading-relaxed text-slate-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                      <span>{out}</span>
                    </div>
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
  );
}