import { Logo } from "./logo"
import { NavMenu } from "./nav-menu"
import { NavigationSheet } from "./navigation-sheet"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useLanguage, useT } from "@/components/language-provider"

const Navbar04Page = () => {
  const { language, toggleLanguage } = useLanguage()
  const t = useT()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/6 bg-[#05070f]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 md:flex">
          <a href="#" aria-label="Home" className="text-slate-200">
            <Logo />
          </a>
          <NavMenu className="text-sm text-gray-200" />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <NavigationSheet />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="border-white/10 bg-white/5 text-slate-200 hover:bg-white/10">
            <a
              href="https://www.linkedin.com/in/muhammad-rahman-0874a229a"
              target="_blank"
              rel="noreferrer"
            >
              {t("nav.hireMe")}
            </a>
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400">
              {t("nav.language.id")}
            </span>
            <Switch
              aria-label="Toggle language"
              checked={language === "en"}
              onCheckedChange={toggleLanguage}
              size="sm"
            />
            <span className="text-[11px] font-semibold text-slate-400">
              {t("nav.language.en")}
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar04Page
