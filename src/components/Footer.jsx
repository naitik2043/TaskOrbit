import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="
      w-full border-t
      border-gray-200/60 dark:border-white/10
      bg-white/70 dark:bg-gray-950/60
      backdrop-blur-xl
    "
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold text-lg tracking-tight">
            <span className="text-2xl">🪐</span>
            <span>TaskOrbit</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-400 
              hover:text-indigo-600 dark:hover:text-white 
              transition"
            >
              Dashboard
            </Link>

            <Link
              to="/about"
              className="text-gray-600 dark:text-gray-400 
              hover:text-indigo-600 dark:hover:text-white 
              transition"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-gray-600 dark:text-gray-400 
              hover:text-indigo-600 dark:hover:text-white 
              transition"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <SocialIcon>
              <Github size={18} />
            </SocialIcon>

            <SocialIcon>
              <Linkedin size={18} />
            </SocialIcon>

            <SocialIcon>
              <Mail size={18} />
            </SocialIcon>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 dark:border-gray-800" />

        <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} TaskOrbit. Built for students 🚀
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ children }) {
  return (
    <a
      href="#"
      className="
        p-2 rounded-xl
        text-gray-600 dark:text-gray-400
        bg-gray-100 dark:bg-gray-800
        hover:bg-gray-200 dark:hover:bg-gray-700
        hover:text-indigo-600 dark:hover:text-white
        transition-all duration-200
        hover:scale-110
      "
    >
      {children}
    </a>
  );
}
