import { motion } from "framer-motion";
import { useStore } from "../store";
import clsx from "clsx";
import { Cancel, GitHub } from "iconoir-react";
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
          "rounded-bl-xl p-3 text-white ring-gray-500 transition-shadow focus:outline-none focus-visible:ring-2"
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
        <p className="text-lg text-gray-300 sm:text-xl">
          Enerchy ist ein Projekt von{" "}
          <a
            className="rounded-md text-accent underline-offset-4 hover:underline focus:outline-none focus-visible:underline"
            href="https://www.jeremiasjutz.ch/"
          >
            Jeremias Jutz
          </a>{" "}
          und{" "}
          <a
            className="rounded-md text-accent underline-offset-4 hover:underline focus:outline-none focus-visible:underline"
            href="https://www.linkedin.com/in/marty-simon/"
          >
            Simon Marty
          </a>
          , welches im Rahmen eines Web-Moduls im Digital Ideation Studiengang
          an der HSLU entstanden ist.
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
          <br />
          <br />
          <a
            className="flex w-fit items-center gap-3 rounded-xl bg-accent-900 px-4 py-3 text-accent ring-accent transition-shadow focus:outline-none focus-visible:ring-2"
            href="https://github.com/jeremiasjutz/enerchy"
          >
            <GitHub />
            Github
          </a>
        </p>
      </div>
    </motion.div>
  );
}
