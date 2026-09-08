const YEAR = new Date().getFullYear()

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'What Zenny does', href: '#features' },
      { label: 'Try the live demo', href: '#try-zenny' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Join the waitlist', href: '/#top' },
      { label: 'Contact', href: 'mailto:hello@zentrip.social' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="zn-footer">
      <div className="zn-footer-top">
        <div className="zn-footer-brand">
          <span className="zn-footer-name">
            zentrip<span className="zn-brand-dot">.</span>social
          </span>
          <p className="zn-footer-tagline">Your AI travel companion for India — grounded, spoken, always on.</p>
        </div>

        <div className="zn-footer-columns">
          {COLUMNS.map((column) => (
            <div key={column.title} className="zn-footer-column">
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="zn-footer-legal">© {YEAR} zentrip.social · Currently wandering India</p>

      <div className="zn-footer-wordmark" aria-hidden="true">
        zentrip
      </div>
    </footer>
  )
}
