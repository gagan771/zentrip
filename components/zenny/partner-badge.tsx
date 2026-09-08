import { getPartnerIcon } from '@/lib/partner-icons'

export function PartnerBadge({ name, index }: { name: string; index: number }) {
  const icon = getPartnerIcon(name, index)
  return (
    <span className="zn-scope-chip">
      {icon.kind === 'brand' ? (
        <span className="zn-scope-chip-glyph zn-scope-chip-glyph-brand">
          <svg viewBox="0 0 24 24" width={12} height={12} fill={`#${icon.hex}`} aria-hidden="true">
            <path d={icon.path} />
          </svg>
        </span>
      ) : (
        <span className={`zn-scope-chip-glyph zn-scope-chip-glyph-mono zn-tone-${icon.tone}-solid`} aria-hidden="true">
          {icon.letter}
        </span>
      )}
      {name}
    </span>
  )
}
