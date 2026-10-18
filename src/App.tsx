import { useState } from 'react'
import './App.css'

type Language = 'fr' | 'en' | 'ar'
type SpaceId = 'foot' | 'motivation' | 'design' | 'danse'

const spaces: { id: SpaceId; icon: string }[] = [
  { id: 'foot', icon: '⚽' },
  { id: 'motivation', icon: '🔥' },
  { id: 'design', icon: '✳' },
  { id: 'danse', icon: '↗' },
]

const translations: Record<
  Language,
  {
    subtitle: string
    titleStart: string
    titleEnd: string
    description: string
    explore: string
    feed: string
    demo: string
    language: string
    allSpaces: string
    spacesLabel: string
    filterHint: string
    postsTitle: string
    demoPostTag: string
    spaces: Record<SpaceId, { name: string; description: string }>
  }
> = {
  fr: {
    subtitle: 'LA COMMUNAUTÉ CRÉATIVE',
    titleStart: 'Découvre ta',
    titleEnd: 'communauté.',
    description: 'Partage tes passions. Inspire le monde.',
    explore: 'Explorer les espaces',
    feed: 'À découvrir',
    demo: 'Version de démonstration',
    language: 'Langue',
    allSpaces: 'Tous les espaces',
    spacesLabel: 'ESPACES',
    filterHint: 'Choisis un espace pour le filtrer, ou sélectionne-le à nouveau pour tout afficher.',
    postsTitle: 'Premières publications',
    demoPostTag: 'Publication de démonstration',
    spaces: {
      foot: { name: 'Foot', description: 'Le football nous rassemble.' },
      motivation: { name: 'Motivation', description: 'Inspire-toi et avance.' },
      design: { name: 'Design', description: 'Montre ta créativité.' },
      danse: { name: 'Danse', description: 'Exprime ton énergie.' },
    },
  },
  en: {
    subtitle: 'THE CREATIVE COMMUNITY',
    titleStart: 'Find your',
    titleEnd: 'community.',
    description: 'Share your passions. Inspire the world.',
    explore: 'Explore spaces',
    feed: 'Discover',
    demo: 'Demo version',
    language: 'Language',
    allSpaces: 'All spaces',
    spacesLabel: 'SPACES',
    filterHint: 'Choose a space to filter it, or select it again to show everything.',
    postsTitle: 'First posts',
    demoPostTag: 'Demo post',
    spaces: {
      foot: { name: 'Football', description: 'Football brings us together.' },
      motivation: { name: 'Motivation', description: 'Get inspired and keep going.' },
      design: { name: 'Design', description: 'Show your creativity.' },
      danse: { name: 'Dance', description: 'Express your energy.' },
    },
  },
  ar: {
    subtitle: 'مجتمع إبداعي',
    titleStart: 'اكتشف',
    titleEnd: 'مجتمعك.',
    description: 'شارك شغفك وألهم العالم.',
    explore: 'اكتشف المساحات',
    feed: 'اكتشف',
    demo: 'نسخة تجريبية',
    language: 'اللغة',
    allSpaces: 'كل المساحات',
    spacesLabel: 'مساحات',
    filterHint: 'اختر مساحة لعرضها وحدها، أو اخترها مجددًا لعرض الكل.',
    postsTitle: 'أولى المنشورات',
    demoPostTag: 'منشور تجريبي',
    spaces: {
      foot: { name: 'كرة القدم', description: 'كرة القدم تجمعنا.' },
      motivation: { name: 'تحفيز', description: 'استلهم وواصل التقدم.' },
      design: { name: 'تصميم', description: 'أظهر إبداعك.' },
      danse: { name: 'رقص', description: 'عبّر عن طاقتك.' },
    },
  },
}

const demoPosts: Record<Language, Record<SpaceId, string>> = {
  fr: {
    foot: 'Un terrain, un ballon et des amis : parfois, c’est tout ce qu’il faut pour lancer une belle partie.',
    motivation: 'Même un petit pas compte. Choisis une chose à terminer aujourd’hui, puis commence.',
    design: 'Palette du jour : vert profond, crème et une touche de citron. Simple, lisible, vivant.',
    danse: 'Quelques minutes de mouvement suffisent pour changer l’énergie de toute une journée.',
  },
  en: {
    foot: 'A pitch, a ball, and friends: sometimes that is all it takes to start a great game.',
    motivation: 'Every small step counts. Pick one thing to finish today, then get started.',
    design: 'Palette of the day: deep green, cream, and a hint of lemon. Simple, clear, alive.',
    danse: 'A few minutes of movement can change the energy of your whole day.',
  },
  ar: {
    foot: 'ملعب وكرة وأصدقاء: أحيانًا هذا كل ما نحتاجه لبدء مباراة ممتعة.',
    motivation: 'كل خطوة صغيرة مهمة. اختر شيئًا واحدًا لإنجازه اليوم، ثم ابدأ.',
    design: 'ألوان اليوم: أخضر داكن وكريمي ولمسة من الليمون. بسيطة وواضحة وحيوية.',
    danse: 'بضع دقائق من الحركة تكفي لتغيير طاقة يومك بالكامل.',
  },
}

export default function App() {
  const [language, setLanguage] = useState<Language>('fr')
  const [selected, setSelected] = useState<SpaceId | null>(null)
  const t = translations[language]
  const isArabic = language === 'ar'
  const visibleSpaces = selected
    ? spaces.filter((space) => space.id === selected)
    : spaces

  return (
    <main className="app" dir={isArabic ? 'rtl' : 'ltr'} lang={language}>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="DIOSIYBIY, accueil">
          <span className="brand-icon" aria-hidden="true">D</span>
          <span>DIOSIYBIY</span>
        </a>
        <label className="language-picker">
          <span className="sr-only">{t.language}</span>
          <select
            aria-label={t.language}
            value={language}
            onChange={(event) => setLanguage(event.target.value as Language)}
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
            <option value="ar">العربية</option>
          </select>
        </label>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow"><span className="status-dot" />{t.subtitle}</span>
          <h1 id="hero-title">
            {t.titleStart}<br />
            <span>{t.titleEnd}</span>
          </h1>
          <p>{t.description}</p>
          <a className="hero-button" href="#spaces">
            {t.explore}<span aria-hidden="true">↘</span>
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <span className="art-index">DSB / 01</span>
          <span className="art-mark">D<span>.</span></span>
          <span className="art-orbit art-orbit-one" />
          <span className="art-orbit art-orbit-two" />
          <span className="art-caption">CREATE<br />YOUR<br />OWN SPACE</span>
        </div>
        <div className="hero-baseline" aria-hidden="true">
          <span>PASSION / COMMUNITY / YOU</span>
          <span>01 — 04</span>
        </div>
      </section>

      <section className="spaces-section" id="spaces" aria-labelledby="spaces-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow section-index">01 / COMMUNITY</span>
            <h2 id="spaces-title">{t.feed}</h2>
          </div>
          <span className="space-count">
            {String(spaces.length).padStart(2, '0')} {t.spacesLabel}
          </span>
        </div>

        <div className="space-grid">
          {visibleSpaces.map((space) => {
            const copy = t.spaces[space.id]
            const isSelected = selected === space.id

            return (
              <button
                className={`space-card space-${space.id}${isSelected ? ' is-selected' : ''}`}
                key={space.id}
                onClick={() => setSelected(isSelected ? null : space.id)}
                aria-pressed={isSelected}
                aria-label={`${copy.name}. ${copy.description}`}
              >
                <span className="card-top">
                  <span>0{spaces.findIndex((item) => item.id === space.id) + 1}</span>
                  <span className="card-arrow" aria-hidden="true">↗</span>
                </span>
                <span className="space-icon" aria-hidden="true">{space.icon}</span>
                <span className="space-name">{copy.name}</span>
                <span className="space-description">{copy.description}</span>
              </button>
            )
          })}
        </div>
        <h3 className="posts-title">{t.postsTitle}</h3>
        <div className="post-grid">
          {visibleSpaces.map((space) => (
            <article className={`post-card post-${space.id}`} key={space.id}>
              <div className="post-meta">
                <span className="post-space">{t.spaces[space.id].name}</span>
                <span className="post-demo">{t.demoPostTag}</span>
              </div>
              <p>{demoPosts[language][space.id]}</p>
            </article>
          ))}
        </div>
        <p className="hint">
          <span className="hint-mark" aria-hidden="true">↳</span>{t.filterHint}
          {selected && (
            <button className="show-all" onClick={() => setSelected(null)}>
              {t.allSpaces}
            </button>
          )}
        </p>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon" aria-hidden="true">D</span>
          <span>DIOSIYBIY</span>
        </a>
        <span>{t.demo}</span>
        <span>© 2026</span>
      </footer>
    </main>
  )
}