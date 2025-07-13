import projetos from "../data/projetos";
import CardProjeto from "../components/CardProjeto";
import { motion } from "framer-motion";

export default function Projetos() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-400">
        Projetos por Categoria
      </h1>

      {Object.entries(projetos).map(([categoria, lista], index) => (
        <motion.div
          key={categoria}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-4 text-white capitalize">
            {categoria.replace(/([A-Z])/g, " $1")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lista.map((proj) => (
              <CardProjeto
                key={proj.repo}
                repoName={proj.repo}
                custom={proj.custom}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
