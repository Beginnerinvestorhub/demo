import React from 'react';
import Head from 'next/head';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaButton } from '../components/ui/mechanicaButton';
import { MechanicaGear } from '../components/ui/mechanicaGear';
import { modules } from '../content/education/modules';

export default function LearningHub() {
  // Mock user level - in a real app this would come from the user profile
  // For demo purposes, we'll set it to 1 so the first module is open.
  const userLevel = 1;

  return (
    <MechanicaLayout
      title="Learning Hub | BeginnerInvestorHub"
      description="Access your personalized financial knowledge archives."
      fullBleed={true}
    >
      <Head>
        <title>Learning Hub | BeginnerInvestorHub</title>
      </Head>

      <div className="min-h-screen bg-slate-900 text-blue-50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage:
                'linear-gradient(rgba(79, 115, 142, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 115, 142, 0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          ></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-blue-900/30 rounded-full border border-blue-500/30 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <span className="text-blue-300 font-mono text-xs font-bold uppercase tracking-[0.2em] px-4">
                Archive Access: Level {userLevel}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black font-serif uppercase tracking-tighter mechanica-title-gold-chrome mechanica-float mb-6 flex justify-center items-center gap-8">
              <MechanicaGear size="xl" color="brass" speed="slow" />
              <span>
                Attributes <span className="text-yellow-400">Library</span>
              </span>
              <MechanicaGear size="xl" color="brass" speed="reverse" />
            </h1>

            <p className="text-xl text-blue-200 max-w-2xl mx-auto font-light leading-relaxed">
              Unlock the secrets of wealth generation through our progressive
              knowledge modules.
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {modules.map((module, index) => {
              // Simple locking logic:
              // If index is 0, it's always unlocked (Level 1).
              // If index is >= userLevel, it's locked.
              // So for userLevel=1: Index 0 is unlocked. Index 1, 2 locked.
              const isLocked = index >= userLevel;

              return (
                <div
                  key={module.id}
                  className="relative group perspective-1000"
                >
                  {/* Holographic Border Effect */}
                  <div
                    className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${isLocked ? 'from-gray-800 to-gray-900' : 'from-blue-500 via-cyan-400 to-blue-600'} opacity-30 blur-md transition-all duration-500 group-hover:opacity-60`}
                  ></div>

                  <div
                    className={`relative h-full bg-slate-800 rounded-2xl border ${isLocked ? 'border-gray-700' : 'border-blue-500/30'} flex flex-col overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)]`}
                  >
                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('/img/grid.svg')] opacity-5 pointer-events-none"></div>

                    <div className="relative p-8 flex flex-col flex-grow z-10 backdrop-blur-sm bg-slate-900/40">
                      {/* Badge / Icon */}
                      <div className="flex justify-between items-start mb-6">
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-inner-premium border border-white/5 ${isLocked ? 'bg-gray-800 text-gray-500' : 'bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-blue-500/20'}`}
                        >
                          {isLocked ? '🔒' : '📖'}
                        </div>
                        <div
                          className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${isLocked ? 'bg-gray-800/50 text-gray-500 border-gray-700' : 'bg-blue-900/30 text-blue-300 border-blue-400/30'}`}
                        >
                          Module 0{index + 1}
                        </div>
                      </div>

                      <h3
                        className={`text-2xl font-bold mb-3 font-serif ${isLocked ? 'text-gray-500' : 'text-white group-hover:text-blue-300 transition-colors'}`}
                      >
                        {module.title}
                      </h3>

                      <p
                        className={`text-sm mb-8 flex-grow leading-relaxed font-light ${isLocked ? 'text-gray-600' : 'text-blue-100/70'}`}
                      >
                        {module.description}
                      </p>

                      <div className="space-y-5 mt-auto">
                        {/* Progress Bar (Mock) */}
                        {!isLocked && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-blue-400">
                              <span>Progress</span>
                              <span>0%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden border border-white/5">
                              <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-300 w-0 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000 group-hover:w-2"></div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <span
                            className={`text-xs font-mono font-bold flex items-center gap-2 ${isLocked ? 'text-gray-600' : 'text-blue-400'}`}
                          >
                            <span className="text-lg">⚡</span>
                            {module.lessons.length * 50} XP
                          </span>

                          {isLocked ? (
                            <span className="flex items-center text-xs font-bold text-gray-600 uppercase tracking-widest">
                              <span className="mr-2">Locked</span>
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest drop-shadow-md animate-pulse">
                              Ready
                            </span>
                          )}
                        </div>

                        {/* Button wrapper for consistent height */}
                        <div className="pt-2">
                          {isLocked ? (
                            <button
                              disabled
                              className="w-full py-3 bg-gray-800 text-gray-500 font-bold uppercase tracking-widest text-xs rounded-xl border border-gray-700 cursor-not-allowed"
                            >
                              Access Denied
                            </button>
                          ) : (
                            <MechanicaButton
                              variant="mechanical"
                              size="md"
                              className="w-full justify-center shadow-lg shadow-blue-900/20"
                              href={`/education/${module.id}`}
                            >
                              Initialize Module
                            </MechanicaButton>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decorative Footer Element */}
          <div className="mt-24 flex flex-col items-center opacity-30 gap-2">
            <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-transparent"></div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
              System Archives v2.4
            </div>
          </div>
        </div>
      </div>
    </MechanicaLayout>
  );
}
