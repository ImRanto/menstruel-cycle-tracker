import React from "react";

const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden bg-linear-to-br from-purple-600 via-pink-500 to-rose-500 text-white">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              CycleFlow
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl">
              Suivez votre cycle menstruel avec précision et élégance
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">📅</div>
              <div className="text-sm opacity-90">Cycle Intelligent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">🔮</div>
              <div className="text-sm opacity-90">Prédictions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">🔒</div>
              <div className="text-sm opacity-90">Confidentialité</div>
            </div>
          </div>
        </div>
      </div>

      {/* Ondes décoratives */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-16 md:h-24"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </header>
  );
};

export default Header;
