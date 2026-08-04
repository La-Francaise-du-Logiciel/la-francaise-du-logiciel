import Image from 'next/image'
import { getMessages } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const LOGO_LIGHT = '/brand/lfl-logo-light.svg'
const BANNER_LIGHT = '/brand/lfl-banner-light.svg'

export function LogoMark({ className, decorative = false }: { className?: string; decorative?: boolean }) {
  return (
    <Image
      src={LOGO_LIGHT}
      alt={decorative ? '' : getMessages().brand.name}
      width={360}
      height={460}
      unoptimized
      className={cn('h-12 w-auto shrink-0', className)}
    />
  )
}

export function Wordmark({ className }: { className?: string }) {
  const { wordmark } = getMessages().brand
  return (
    <span
      role="img"
      aria-label={getMessages().brand.name}
      className={cn('flex items-center gap-3', className)}
    >
      <LogoMark decorative />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl tracking-tight text-foreground">{wordmark.top}</span>
        <span className="text-xs leading-none text-muted-foreground">
          {wordmark.bottom}
        </span>
      </span>
    </span>
  )
}

export function BrandBanner({ className }: { className?: string }) {
  return (
    <Image
      src={BANNER_LIGHT}
      alt={getMessages().brand.name}
      width={1200}
      height={360}
      unoptimized
      className={cn('h-auto w-full', className)}
    />
  )
}
