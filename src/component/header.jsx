import styles from "../assets/css/header.module.css";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className={styles.content}>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{
          x: { type: "spring", stiffness: 100 },
          opacity: { duration: 2 },
          ease: "backIn",
          duration: 1,
        }}
      >
        <img src="/images/tech.svg" alt="Tech" className="h-20 w-20" />
      </motion.div>

      <motion.h2
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{
          x: { type: "spring", stiffness: 100 },
          opacity: { duration: 2 },
          ease: "backIn",
          duration: 1,
        }}
      >
        FullStack Developer
      </motion.h2>
    </header>
  );
}
