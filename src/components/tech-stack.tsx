import * as React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Layout, 
  Server, 
  BrainCircuit, 
  Database as DbIcon, 
  Terminal,
  CheckCircle2
} from "lucide-react";



// 1. Definisikan interface data dengan tipe ikon yang valid
interface TechCategoryProps {
  id: number;
  name: string;
  icon: React.ReactNode;
  tech: string[];
  accentClass: string;
}

// 2. Kumpulan Ikon SVG Premium untuk Tech Stack
const techIcons: Record<string, React.ReactNode> = {
  "React.js": (
    <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
      <path d="M127.34 148.65L64.22 68v67.14H50V44h14.22l57.73 73.16V44h14.22v104.65h-12.83z" fill="currentColor"/>
    </svg>
  ),
  "Vue.js": (
    <svg viewBox="0 0 256 221" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M204.8 0H256L128 220.8L0 0h51.2L128 132.48L204.8 0z" fill="#41B883"/>
      <path d="M51.2 0L128 132.48L204.8 0h-47.36L128 92.16L70.4 0h-19.2z" fill="#35495E"/>
    </svg>
  ),
  "Tailwind CSS": (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#38bdf8]">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.597 15.027 12 18.002 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.203 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.2 2.538 2.576 5.513 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.403 8.975 12 6.001 12z" fill="currentColor"/>
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 256 284" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M141.1 278.3c-8.2 4.7-18.4 4.7-26.6 0L24.8 226.4c-8.2-4.7-13.3-13.5-13.3-23V97c0-9.5 5.1-18.3 13.3-23L114.5 22c8.2-4.7 18.4-4.7 26.6 0l89.7 51.9c8.2 4.7 13.3 13.5 13.3 23v106.3c0 9.5-5.1 18.3-13.3 23l-89.7 52.1z" fill="#339933"/>
    </svg>
  ),
  "Express": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-slate-300">
      <path d="m18 16 4-4-4-4"/>
      <path d="m6 8-4 4 4 4"/>
      <path d="m14.5 4-5 16"/>
    </svg>
  ),
  "RESTful API": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#38bdf8]">
      <rect x="2" y="2" width="20" height="8" rx="2"/>
      <rect x="2" y="14" width="20" height="8" rx="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/>
      <line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  "Python": (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M12.001 2c-5.523 0-5.523 2.378-5.523 2.378v2.106h5.523v.784H4.072C4.072 7.268 2 7.268 2 12.79c0 5.523 1.83 5.523 1.83 5.523h2.106V14.24c0-2.378 2.378-2.378 2.378-2.378h5.523v-5.523c0-4.116-4.116-4.116-4.116-4.116H12.001z" fill="#3776ab"/>
      <path d="M11.999 22c5.523 0 5.523-2.378 5.523-2.378v-2.106h-5.523v-.784h7.929c0 0 2.072 0 2.072-5.523 0-5.523-1.83-5.523-1.83-5.523h-2.106v4.073c0 2.378-2.378 2.378-2.378 2.378h-5.523v5.523c0 4.116 4.116 4.116 4.116 4.116h1.72z" fill="#ffd343"/>
    </svg>
  ),
  "YOLOv11 (Object Detection)": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-indigo-400">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M3 3h3v3M21 3h-3v3M3 21h3v-3M21 21h-3v-3" />
    </svg>
  ),
  "Scikit-Learn": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#f8991d]">
      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3ZM6 21a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v12a3 3 0 0 0 3 3Z"/>
      <path d="M9 12h6"/>
    </svg>
  ),
  "Scrapy (Web Scraping)": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-emerald-400">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  "PostgreSQL": (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm1.5-5.5c-.28 0-.5.22-.5.5v2c0 .28.22.5.5.5s.5-.22.5-.5v-2c0-.28-.22-.5-.5-.5zm-4 0c-.28 0-.5.22-.5.5v2c0 .28.22.5.5.5s.5-.22.5-.5v-2c0-.28-.22-.5-.5-.5z" fill="#336791"/>
    </svg>
  ),
  "MySQL": (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M12.11 3.5c-4.42 0-8 3.58-8 8s3.58 8 8 8c1.35 0 2.61-.34 3.73-.93.59.88 1.6 1.43 2.77 1.43 1.93 0 3.5-1.57 3.5-3.5 0-1.17-.55-2.18-1.43-2.77.59-1.12.93-2.38.93-3.73 0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill="#00758f"/>
    </svg>
  ),
  "Supabase": (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M21.362 10.404l-8.08 4.793 4.103 6.945c.42.712-.416 1.49-1.11 1.033L4.17 15.11a1.206 1.206 0 01-.532-1.01V5.706c0-.498.423-.915.932-.89l10.985.541-4.227-4.226c-.463-.464.07-.123-.058-.023a.925.925 0 011.082-.047l9.043 6.096a1.21 1.21 0 01-.033 2.257z" fill="#3ecf8e"/>
    </svg>
  ),
  "Linux": (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#fda82d"/>
    </svg>
  ),
  "Git & GitHub": (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#f05032"/>
    </svg>
  ),
  "Docker": (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.186V8.775c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.117c0 .103.084.186.186.186zm-2.937 0h2.119c.102 0 .186-.083.186-.186V8.775c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.117c0 .103.084.186.186.186zm-2.937 0h2.12c.102 0 .186-.083.186-.186V8.775c0-.102-.084-.186-.186-.186h-2.12c-.102 0-.186.084-.186.186v2.117c0 .103.084.186.186.186zm-2.937 0h2.119c.102 0 .186-.083.186-.186V8.775c0-.102-.084-.186-.186-.186H5.172c-.102 0-.186.084-.186.186v2.117c0 .103.084.186.186.186zm-2.936 0h2.119c.102 0 .186-.083.186-.186V8.775c0-.102-.084-.186-.186-.186H2.236c-.102 0-.186.084-.186.186v2.117c0 .103.084.186.186.186zm2.936-2.936h2.119c.102 0 .186-.083.186-.186V5.838c0-.102-.084-.186-.186-.186H5.172c-.102 0-.186.084-.186.186v2.118c0 .102.084.186.186.186zm2.937 0h2.12c.102 0 .186-.083.186-.186V5.838c0-.102-.084-.186-.186-.186h-2.12c-.102 0-.186.084-.186.186v2.118c0 .102.084.186.186.186zm2.937 0h2.119c.102 0 .186-.083.186-.186V5.838c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.118c0 .102.084.186.186.186zm-5.874-2.936h2.12c.102 0 .186-.083.186-.186V2.902c0-.102-.084-.186-.186-.186h-2.12c-.102 0-.186.084-.186.186v2.118c0 .102.084.186.186.186zm16.087 6.111c-.085-.027-.272-.047-.57-.047-.393 0-.916.104-1.32.28-.088.037-.184.092-.266.155a3.834 3.834 0 00-.73-2.023c-.768-1.026-1.905-1.579-3.203-1.556V9.45c0-.073-.06-.134-.134-.134h-.99a.135.135 0 00-.135.134v2.793c-.456.039-.893.123-1.296.257V5.5c0-.073-.06-.134-.134-.134h-.99a.135.135 0 00-.135.134v8.031c-.347.168-.667.387-.946.66l-.014.015c-.085-.231-.22-.441-.397-.618l-.946-.946a.135.135 0 00-.191 0l-.7.7a.135.135 0 000 .191l.745.744a3.818 3.818 0 00-.518 1.954c0 3.738 5.093 5.438 12.181 5.438 5.761 0 10.378-1.127 10.378-5.32 0-1.89-1.282-3.08-3.08-3.415z" fill="#2496ed"/>
    </svg>
  ),
  "Vite": (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M19.789 2l-7.394 13.918L5.001 2l-.842.842 4.632 8.758-5.632 4.4L12 22l8.841-4l-5.632-4.4 4.632-8.758L19.789 2z" fill="#bd34fe"/>
      <path d="M19.789 2L12 15.918 4.211 2" fill="#ffd343"/>
    </svg>
  ),
  "CloudFlare": (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M22.563 11.53c-.31-.19-.66-.3-1.02-.32a3.87 3.87 0 00-3.32-3.3c-.6-.1-1.2.1-1.68.5a7.35 7.35 0 00-13.43 1.9 4.3 4.3 0 00-1.11 8.24h20.56c1.1 0 2-.9 2-2 0-1.95-1.04-3.62-2-5.02z" fill="#f38020"/>
    </svg>
  )
};

export default function TechStack() {
  const springTransition = { type: "spring", stiffness: 140, damping: 20 } as const;
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: springTransition },
  };

  // 3. Isi data dengan stack asli yang relevan dengan fokus web & AI development kamu
  const techStackList: TechCategoryProps[] = [
    { 
      id: 1, 
      name: "Frontend Development", 
      icon: <Layout className="h-4 w-4 text-indigo-300 sm:h-5 sm:w-5" />,
      tech: ["React.js", "Next.js", "Vue.js", "Tailwind CSS"],
      accentClass: "bg-indigo-500/10"
    },
    { 
      id: 2, 
      name: "Backend Development", 
      icon: <Server className="h-4 w-4 text-cyan-300 sm:h-5 sm:w-5" />,
      tech: ["Node.js", "Express", "RESTful API"],
      accentClass: "bg-cyan-500/10"
    },
    { 
      id: 3, 
      name: "AI Engineering", 
      icon: <BrainCircuit className="h-4 w-4 text-purple-300 sm:h-5 sm:w-5" />,
      tech: ["Python", "YOLOv11 (Object Detection)", "Scikit-Learn", "Scrapy (Web Scraping)"],
      accentClass: "bg-purple-500/10"
    },
    { 
      id: 4, 
      name: "Database", 
      icon: <DbIcon className="h-4 w-4 text-emerald-300 sm:h-5 sm:w-5" />,
      tech: ["PostgreSQL", "MySQL", "Supabase"],
      accentClass: "bg-emerald-500/10"
    },
    { 
      id: 5, 
      name: "DevOps & Tools", 
      icon: <Terminal className="h-4 w-4 text-orange-300 sm:h-5 sm:w-5" />,
      tech: ["Linux", "Git & GitHub", "Docker", "Vite", "CloudFlare"],
      accentClass: "bg-orange-500/10"
    }
  ];

  return (
    <section id="skills" className="w-full py-16 px-4 max-w-6xl mx-auto perspective-[1000px] sm:px-6 sm:py-20 md:py-24">
      {/* Section Header */}
      <div className="mb-8 text-center sm:mb-10 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <span className="mb-3 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold tracking-[0.15em] text-cyan-300 uppercase sm:text-xs">
            Toolkit
          </span>
          <h2 className="text-emboss text-2xl font-extrabold tracking-tight text-slate-50 sm:text-3xl md:text-4xl">
            Tech Stack
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs text-slate-400 sm:text-sm">
            Kombinasi perkakas andalan yang saya gunakan untuk mentransformasikan ide mentah menjadi aplikasi cerdas yang scalable.
          </p>
        </motion.div>
      </div>

      {/* Tech Cards Grid — 1 col mobile, 2 col sm, 3 col lg */}
      <motion.div
        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {techStackList.map((category) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            whileHover={{ rotateX: -4, rotateY: 4, translateY: -6 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            className="flex"
          >
            <Card
              className="group relative flex h-full w-full flex-col justify-between overflow-hidden tilt-card glass-surface" 
              onMouseMove={handleSpotlight}
              onMouseLeave={handleSpotlightLeave}
            >
              <div className="absolute inset-0 spotlight-overlay opacity-70" />
              <div className="absolute inset-0 glass-border opacity-40" />
              <CardHeader className="relative z-10 flex flex-row items-center gap-2.5 px-4 pt-4 pb-2 sm:gap-3 sm:px-6 sm:pt-6 sm:pb-3">
                <div className={`hex-tile p-2.5 border border-white/10 sm:p-3 ${category.accentClass}`}>
                  {category.icon}
                </div>
                <CardTitle className="text-sm font-semibold text-slate-50 sm:text-base">
                  {category.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 px-4 pb-4 sm:px-6 sm:pb-6">
                <ul className="space-y-3 sm:space-y-3.5">
                  {category.tech.map((skill, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-xs text-slate-300 sm:text-sm"
                    >
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md bg-slate-950 p-1 border border-white ring-1 ring-black shadow-lg">
                        {techIcons[skill] || <CheckCircle2 className="h-3.5 w-3.5 text-slate-400" />}
                      </div>
                      <span className="font-medium text-slate-300 group-hover:text-slate-100 transition-colors">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}