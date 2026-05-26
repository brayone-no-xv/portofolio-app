/* eslint-disable react-refresh/only-export-components */
import * as React from "react"

export type Language = "id" | "en"

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
  storageKey?: string
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

const LANGUAGE_VALUES: Language[] = ["id", "en"]

const LanguageProviderContext = React.createContext<
  LanguageProviderState | undefined
>(undefined)

function isLanguage(value: string | null): value is Language {
  if (value === null) return false
  return LANGUAGE_VALUES.includes(value as Language)
}

export function LanguageProvider({
  children,
  defaultLanguage = "id",
  storageKey = "language",
}: LanguageProviderProps) {
  const [language, setLanguageState] = React.useState<Language>(() => {
    const stored = localStorage.getItem(storageKey)
    if (isLanguage(stored)) return stored
    return defaultLanguage
  })

  const setLanguage = React.useCallback(
    (next: Language) => {
      localStorage.setItem(storageKey, next)
      setLanguageState(next)
    },
    [storageKey]
  )

  const toggleLanguage = React.useCallback(() => {
    setLanguage((current) => (current === "id" ? "en" : "id"))
  }, [setLanguage])

  React.useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea !== localStorage) return
      if (event.key !== storageKey) return

      if (isLanguage(event.newValue)) {
        setLanguageState(event.newValue)
        return
      }

      setLanguageState(defaultLanguage)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [defaultLanguage, storageKey])

  const value = React.useMemo(
    () => ({ language, setLanguage, toggleLanguage }),
    [language, setLanguage, toggleLanguage]
  )

  return (
    <LanguageProviderContext value={value}>{children}</LanguageProviderContext>
  )
}

export function useLanguage() {
  const context = React.useContext(LanguageProviderContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

const DICTIONARY = {
  id: {
    "nav.home": "Beranda",
    "nav.blog": "Blog",
    "nav.about": "Tentang",
    "nav.contact": "Kontak",
    "nav.hireMe": "Hire me",
    "nav.language.id": "ID",
    "nav.language.en": "EN",
  },
  en: {
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.hireMe": "Hire me",
    "nav.language.id": "ID",
    "nav.language.en": "EN",
  },
} as const

export function useT() {
  const { language } = useLanguage()

  return React.useCallback(
    (key: keyof (typeof DICTIONARY)["id"]) => {
      return DICTIONARY[language][key]
    },
    [language]
  )
}
