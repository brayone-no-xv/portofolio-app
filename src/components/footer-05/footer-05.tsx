import { Separator } from "@/components/ui/separator";
import { GitHubBrandIcon, InstagramBrandIcon, LinkedInBrandIcon } from "@/components/icons/brand-icons";

const Footer05Page = () => {
  return (
    <footer className="border-t border-white/6 bg-[#05070f]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Footer top - links & info */}
        <div className="grid gap-8 py-10 sm:grid-cols-2 sm:py-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-50 sm:text-base">Muhammad Rahman</h3>
            <p className="max-w-xs text-xs leading-relaxed text-slate-400 sm:text-sm">
              Full-Stack Web Developer & AI Engineer based in Banjarmasin, Indonesia.
            </p>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest text-slate-300 uppercase">Connect</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/muhammad-rahman-0874a229a"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white sm:h-9 sm:w-9"
              >
                <LinkedInBrandIcon className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/brayone_xv"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white sm:h-9 sm:w-9"
              >
                <InstagramBrandIcon className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/brayone-no-xv"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white sm:h-9 sm:w-9"
              >
                <GitHubBrandIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-white/6" />

        {/* Footer bottom - copyright */}
        <div className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row sm:py-8">
          <span className="text-xs text-slate-500 sm:text-sm">
            &copy; {new Date().getFullYear()}{" "}
            <a href="/" className="text-slate-400 transition-colors hover:text-white">
              Muhammad Rahman
            </a>
            . All rights reserved.
          </span>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-slate-400 sm:text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Available for projects
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer05Page;
