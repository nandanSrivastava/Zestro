

import { memo } from 'react'

function Testimonials() {
  return (
    <section className="bg-gradient-to-br from-blue-100 via-white to-blue-200 py-12 sm:py-20 px-4">
      <div className="container">
  <h3 className="text-3xl sm:text-4xl font-extrabold text-[var(--zestro-orange-800)] mb-4 text-center drop-shadow-lg animate-fade-in">Early Reactions</h3>
        <p className="text-center text-[color:rgba(15,23,42,0.8)] max-w-2xl mx-auto mb-6">Leaders in hospitality have already seen a preview. They’re intrigued — and so will you.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {["An absolute workflow upgrade.", "Saved us from stockouts instantly.", "The insights are unreal."].map((t,i)=>(
            <div key={i} className="glass-card rounded-2xl p-4 sm:p-6 text-center shadow-lg">
              <p className="italic text-[color:rgba(15,23,42,0.9)] mb-2">“{t}”</p>
              <div className="text-sm text-[var(--zestro-orange-700)] font-semibold">Verified Industry Insider</div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-[color:rgba(15,23,42,0.8)] mb-3">Want early access?</p>
          <a href="#contact" className="btn-primary">Join the Waitlist</a>
        </div>
      </div>
    </section>
  );
}

export default memo(Testimonials)
