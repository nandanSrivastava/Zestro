"use client"

import React, {useState} from 'react'

const tiers = [
  {
    id: 'free',
    name: 'Free',
    price: 'Free',
    freq: '',
    perks: [
      'Up to 200 Orders Free: Access up to 200 orders at no cost.',
      'Unlimited Table Integration: Integrate tables without any limits.',
      'Unlimited QR Generation: Generate unlimited QR codes for your needs.',
      'Up to 50 Products Onboarding: Onboard up to 50 products within the platform.',
      'Free Email Marketing (Up to 200 Mails): Utilize free email marketing with a limit of 200 mails.',
      'Maximum 2 Users: The plan supports up to 2 users.'
    ]
  },
  {
    id: 'pro',
    name: 'Zestro-Pro',
    price: '₹1,499',
    actualPrice: '₹2,999',
    freq: '/mo',
    perks: [
      'Everything in Free',
      'Unlimited Orders: no cap on orders',
      'Unlimited Products Onboarding: add as many products as needed',
      'Unlimited Emails (Up to 10,000 Mails)',
      'Unlimited Users',
      'Advanced reports & analytics',
      'Staff scheduling',
      'Personal branding options(logo, description)',
        ]
  },
  {
    id: 'enterprise',
    name: 'Zestro Infiny (Enterprise)',
    price: 'Custom',
    freq: '',
    perks: [
      'Everything in Pro, plus:',
      'Full product & UI customization: tailor the software to your workflows',
      'White-labeling & branding: use your brand across the app',
      'Personalized app (iOS & Android): custom mobile apps for your team'
    ]
  }
]

export default function Pricing(){
  const [expanded, setExpanded] = useState({})
  const toggle = (id) => setExpanded(prev => ({...prev, [id]: !prev[id]}))

  return (
    <section id="pricing" className="py-12">
      <div className="container">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--zestro-orange-800)] mb-6 text-center">Pricing</h2>
        <p className="text-center text-[color:rgba(15,23,42,0.75)] mb-8 max-w-2xl mx-auto">Simple transparent pricing designed to scale with your restaurant. No surprises, just results.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map(t => {
            const isPro = t.id === 'pro'
            const isFree = t.id === 'free'
            const isEnterprise = t.id === 'enterprise'
            const isExpanded = !!expanded[t.id]
            const previewCount = 3
            const perksToShow = isExpanded ? t.perks : t.perks.slice(0, previewCount)
            return (
              <div key={t.id} className={`relative rounded-xl overflow-hidden flex flex-col justify-between transform transition-all duration-300 ${isPro ? 'shadow-2xl z-10' : 'shadow-lg'} hover:scale-[1.02]`}>
                {/* Header with gradient */}
                <div className={`px-4 py-3 ${isPro ? 'bg-[linear-gradient(90deg,var(--zestro-orange-700),var(--zestro-orange-600))] text-white' : 'bg-white'}`}>
                  <div className="flex items-center justify-between">
                    <div className={`text-sm font-semibold ${isPro ? 'text-white' : 'text-[var(--zestro-orange-700)]'}`}>{t.name}</div>
                    {isPro && (
                      <div className="text-xs font-semibold bg-[color:var(--zestro-orange-900)]/90 px-3 py-1 rounded-full">Most Popular</div>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className={`p-4 glass-card flex-1 flex flex-col justify-between overflow-hidden ${isPro ? '' : ''}`}>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-3xl sm:text-4xl font-extrabold text-[color:var(--zestro-orange-900)]">{t.price}</div>
                      {t.actualPrice && (
                        <div className="text-sm text-[color:rgba(15,23,42,0.6)] line-through mt-2">{t.actualPrice}</div>
                      )}
                      <div className="ml-2 text-sm text-[color:rgba(15,23,42,0.7)]">{t.freq}</div>
                    </div>

                    <div className="mt-4">
                      <ul className="space-y-2 text-sm text-[color:rgba(15,23,42,0.85)]">
                        {perksToShow.map(p => (
                          <li key={p} className="flex items-start gap-3">
                            <svg className="w-4 h-4 text-[var(--zestro-orange-700)] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            <div className="leading-tight">{p}</div>
                          </li>
                        ))}
                      </ul>

                      {t.perks.length > previewCount && (
                        <div className="mt-2">
                          <button onClick={() => toggle(t.id)} className="text-sm font-medium text-[var(--zestro-orange-700)] hover:underline">{isExpanded ? 'Show less' : `Show ${t.perks.length - previewCount} more`}</button>
                        </div>
                      )}
                    </div>

                    {isEnterprise && (
                      <div className="mt-4 text-xs text-[color:rgba(15,23,42,0.7)]">Pricing is custom — we'll decide the final price after a consultation and requirements review.</div>
                    )}
                  </div>

                  <div className="mt-6">
                    {isFree ? (
                      <button className="btn-outline w-full">Get Started — Free</button>
                    ) : isEnterprise ? (
                      <button className="btn-primary w-full">Request a Demo</button>
                    ) : (
                      <button className="btn-primary w-full">Get Pro — {t.price}</button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
