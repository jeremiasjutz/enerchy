import { motion } from "framer-motion";
import { useStore } from "../store";
import clsx from "clsx";
import { Cancel } from "iconoir-react";
import { useEventListener } from "usehooks-ts";

export default function About() {
  const toggleAboutPanel = useStore((state) => state.toggleAboutPage);
  useEventListener("keydown", (e) => {
    if (e.key === "Escape") toggleAboutPanel();
  });

  return (
    <motion.div
      id="aboutPanel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-pattern absolute inset-0 z-50 overflow-auto bg-black text-gray-800 sm:grid sm:place-items-center"
    >
      <button
        id="closeAboutPanelButton"
        className={clsx(
          "fixed top-0 right-0 z-10 border-gray-500 bg-gray-900",
          "rounded-bl-xl p-3 text-white focus:outline-none"
        )}
        onClick={() => toggleAboutPanel()}
      >
        <div>
          <Cancel />
        </div>
      </button>

      <div className="max-w-2xl overflow-auto p-6">
        <h1 className="mb-6 w-full text-4xl font-extrabold tracking-[-0.035em] text-white sm:self-auto sm:text-5xl">
          About
        </h1>
        <p className="text-lg text-gray-400 sm:text-xl">
          Enerchy ist ein Projekt von Jeremias Jutz und Simon Marty, welches im
          Rahmen eines Web-Moduls im Digital Ideation Studiengang an der HSLU
          entstanden ist.
          <br />
          <br />
          Wir wollen mit unser Plattform die Vielfalt von Schweizer Kraftwerke
          und deren Eigenschaften der Bevölkerung auf spielerische Art und Weise
          näher bringen. Mit der dreidimensionalen Darstellung der
          Kraftwerk-Leistung entstehen Berge, welche eine neue, sonst
          unsichtbare Landschaft bilden. Die unterschiedliche Höhe der Berge,
          sowie die Möglichkeit nach Kraftwerk-Typ zu filtern, ermöglichen einen
          intuitiven Vergleich der Kraftwerk-Leistung.
          <br />
          <br />
          Die Daten, welche zur Visualisierung benötigt werden, beziehen wir von
          geo.admin.ch.
          <br />
          <br />
          Als technische Grundlage wurde React mit Three.js verwendet.
        </p>
      </div>
    </motion.div>
  );
}
