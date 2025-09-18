

export default function Contact() {
  return (
    <section id="contact" className="py-12 sm:py-20 px-4 bg-white/5">
      <div className="container max-w-3xl mx-auto">
        <div className="glass-card rounded-3xl shadow-2xl px-6 sm:px-10 py-8 sm:py-12 animate-fade-in text-center">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[var(--zestro-orange-800)] mb-4 drop-shadow-lg">Get in Touch</h3>
          <p className="text-[color:rgba(15,23,42,0.85)] mb-6 text-base sm:text-lg">Ready to elevate your restaurant? Contact us for a free demo or more information.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:info@zestro.com" className="btn-primary">Email Us</a>
            <a href="#" className="btn-outline">Request Demo</a>
          </div>
        </div>
      </div>
    </section>
  );
}
