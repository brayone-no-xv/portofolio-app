import { Brain, Code2 } from "lucide-react";

const skills = [
    {
        title: "Web Development",
        description:
            "Membangun aplikasi fullstack web menggunakan teknologi populer.",
        icon: Code2,
    },
    {
        title: "AI Model Development",
        description: "Membangun model machine learning.",
        icon: Brain,
    },
];

export default function MySkill() {
    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
            <div className="mb-8 text-center sm:mb-10 md:mb-12">
                <span className="mb-3 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold tracking-[0.15em] text-cyan-300 uppercase sm:text-xs">
                    My Skill
                </span>
                <h2 className="text-emboss text-2xl font-extrabold tracking-tight text-slate-50 sm:text-3xl md:text-4xl">
                    Main Skill
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-xs text-slate-400 sm:text-sm">
                    Layanan yang saya tawarkan dengan fokus pada kualitas dan dampak.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                {skills.map((skill) => {
                    const Icon = skill.icon;

                    return (
                        <div
                            key={skill.title}
                            className="glass-surface tilt-card relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-6"
                        >
                            <div className="absolute inset-0 spotlight-overlay opacity-60" />
                            <div className="absolute inset-0 glass-border opacity-40" />
                            <div className="relative z-10 flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-base font-bold text-slate-50 sm:text-lg">
                                        {skill.title}
                                    </h3>
                                    <p className="text-xs text-slate-400 sm:text-sm">
                                        {skill.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}