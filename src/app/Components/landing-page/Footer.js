import Image from "next/image";

export default function Footer() {
  return (
    <footer className="zestro-footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-content">
          <div className="brand">
            <span className="footer-by">A product by</span>
            <Image src="/techv-logo.png" alt="TechV" width={120} height={28} />
          </div>
        </div>
      </div>
    </footer>
  );
}
