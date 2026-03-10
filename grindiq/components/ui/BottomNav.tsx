'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

const tabs = [
  { href: '/home',     icon: '⌂',  label: 'Home'     },
  { href: '/beans',    icon: '✦',  label: 'Beans'    },
  { href: '/log',      icon: '◈',  label: 'Shot Log' },
  { href: '/settings', icon: '◎',  label: 'Settings' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-5 pt-2">
      <div className="bg-[#D4A843] rounded-[50px] p-[6px] flex gap-1 shadow-[0_4px_20px_rgba(212,168,67,0.4)]">
        {tabs.map((tab) => {
          const active = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={clsx(
                'flex-1 flex flex-col items-center gap-0.5 py-2 rounded-[50px] transition-all duration-200',
                active
                  ? 'bg-white'
                  : 'bg-transparent'
              )}
            >
              <span
                className={clsx(
                  'text-[18px] leading-none',
                  active ? 'text-[#C8922A]' : 'text-white/90'
                )}
              >
                {tab.icon}
              </span>
              <span
                className={clsx(
                  'text-[9px] font-semibold uppercase tracking-wider',
                  active ? 'text-[#C8922A]' : 'text-white/80'
                )}
              >
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
