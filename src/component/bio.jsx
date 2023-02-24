import styles from "../assets/css/bio.module.css";
import { motion } from "framer-motion";

export default function Bio() {
  return (
    <div className={styles.content}>
      <motion.img
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{
          x: { type: "spring", stiffness: 100 },
          opacity: { duration: 2 },
          ease: "easeIn",
          duration: 1,
        }}
        src="/images/wgalleti.jpg"
        alt="William Galleti"
      />
      <div>
        <motion.p
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.3,
            y: { type: "spring", stiffness: 100 },
            opacity: { duration: 2 },
            ease: "easeIn",
            duration: 1,
          }}
        >
          I am a skilled Python and JavaScript developer with a passion for
          creating efficient and effective software solutions. With experience
          in web development, data analysis, and automation, I have a strong
          ability to tackle a range of projects from conception to completion.
          My technical expertise combined with my collaborative work style makes
          me a valuable asset to any development team. Let's build something
          great together!
        </motion.p>
        <motion.h4
          initial={{ x: -400, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.4,
            x: { type: "spring", stiffness: 100, duration: 2 },
            opacity: { duration: 2 },
            ease: "easeIn",
          }}
        >
          William Galleti
        </motion.h4>
      </div>
    </div>
  );
}
