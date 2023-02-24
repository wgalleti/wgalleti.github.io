import styles from "../assets/css/contact.module.css";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className={styles.content}>
      <h2>Contact</h2>
      <ul>
        <motion.li
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            x: { type: "spring", stiffness: 100 },
            opacity: { duration: 2 },
            ease: "backIn",
            duration: 1,
            delay: 0.1,
          }}
        >
          <a href="https://www.instagram.com/wgalleti/" target="_blank">
            <img src="/images/instagram.png" alt="Instagram" />
          </a>
        </motion.li>
        <motion.li
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            x: { type: "spring", stiffness: 100 },
            opacity: { duration: 2 },
            ease: "backIn",
            duration: 1,
            delay: 0.2,
          }}
        >
          <a href="https://wa.me/5565999448004" target="_blank">
            <img src="/images/whatsapp.png" alt="Whatsapp" />
          </a>
        </motion.li>
        <motion.li
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            x: { type: "spring", stiffness: 100 },
            opacity: { duration: 2 },
            ease: "backIn",
            duration: 1,
            delay: 0.3,
          }}
        >
          <a href="mailto:me@wgalleti.dev" target="_blank">
            <img src="/images/gmail.png" alt="Email" />
          </a>
        </motion.li>
        <motion.li
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            x: { type: "spring", stiffness: 100 },
            opacity: { duration: 2 },
            ease: "backIn",
            duration: 1,
            delay: 0.4,
          }}
        >
          <a href="https://www.youtube.com/@wGalleti/videos" target="_blank">
            <img src="/images/youtube.png" alt="Youtube" />
          </a>
        </motion.li>
      </ul>
    </div>
  );
}
