import React from "react";
import { Calendar, Sparkles, ShieldCheck, Activity } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden bg-linear-to-r from-indigo-600 via-purple-500 to-rose-400 text-white">
      {/* Overlay de texture subtile */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      {/* Décoration lumineuse en arrière-plan */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Section Texte */}
          <div className="text-center lg:text-left flex-1">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium mb-6">
              <Activity size={16} className="text-rose-200" />
              <span>Santé connectée & Privée</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
              Cycle<span className="text-rose-200">Flow</span>
            </h1>
            <p className="text-lg md:text-xl text-indigo-50 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Reprenez le contrôle. Une approche intuitive et élégante pour
              suivre votre cycle et comprendre votre corps.
            </p>
          </div>

          {/* Section Cartes d'atouts (Lucide Icons) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 w-full max-w-sm">
            <FeatureItem
              icon={<Calendar size={24} />}
              title="Cycle Intelligent"
              desc="Algorithmes prédictifs"
            />
            <FeatureItem
              icon={<Sparkles size={24} />}
              title="Prédictions"
              desc="Anticipez vos phases"
            />
            <FeatureItem
              icon={<ShieldCheck size={24} />}
              title="Confidentialité"
              desc="Données 100% sécurisées"
            />
          </div>
        </div>
      </div>

      {/* Vague de transition plus douce */}
      <div className="absolute bottom-0 left-0 right-0 leading-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L1440 120L1440 0C1440 0 1140 120 720 120C300 120 0 0 0 0L0 120Z"
            fill="white"
          />
        </svg>
      </div>
    </header>
  );
};

// Composant interne pour les éléments de fonctionnalités
const FeatureItem = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl hover:bg-white/20 transition-all duration-300">
    <div className="p-3 bg-white/20 rounded-xl text-rose-100">{icon}</div>
    <div>
      <h3 className="font-bold text-white">{title}</h3>
      <p className="text-xs text-indigo-100 opacity-80">{desc}</p>
    </div>
  </div>
);

export default Header;
