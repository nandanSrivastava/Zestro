import Image from "next/image";
import styles from "../styles/Footer.module.css";


export default function Footer() {
  return (
    <footer className={`${styles.zestroFooter}`} role="contentinfo">
      <div className={`${styles.container} footer-inner`}>
        <div className={`${styles.footerContent}`}>
          <div className={`${styles.brand}`}>
            <span className={`${styles.footerBy}`}>A product by</span>
            <Image
              src="/images/techv-logo.png"
              alt="TechV"
              width={120}
              height={28}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
