import { motion } from "framer-motion";

export default function Langagues() {
  const data = [
    { id: 1, name: "Python", image: "/images/python.png" },
    { id: 2, name: "JS", image: "/images/js.png" },
    { id: 3, name: "Delphi", image: "/images/delphi.png" },
    { id: 4, name: "DataBase", image: "/images/database.png" },
  ];

  return (
    <div className="flex flex-col max-w-screen-desktop mx-auto w-full justify-center items-center gap-1 my-4 border-b border-metal py-6">
      <h3 className="py-5">Work with</h3>

      <div className="flex md:flex-row flex-col gap-3">
        {data.map((d) => (
          <div
            key={d.id}
            className="h-full w-28 duration-300 hover:scale-125 hover:bg-metal/75 hover:p-4 hover:rounded-lg mx-5"
          >
            <motion.img
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                x: { type: "spring", stiffness: 100 },
                opacity: { duration: 2 },
                ease: "backIn",
                duration: 1,
                delay: 0.1 * d.id,
              }}
              src={d.image}
              alt={d.name}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
