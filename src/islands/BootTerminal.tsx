import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BootTerminal = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<'terminal' | 'glitch'>('terminal');

  const terminalSequence = [
    "INITIALIZING SYSTEM_CORE_V2.0.26",
    "DECRYPTING IDENTITY_PROTECTION_PROTOCOLS",
    "ESTABLISHING SECURE_LINK: UTN_FRC_NODE",
    "LOADING NEURAL_ASSETS: FRANCISCO_ANDRADE",
    "BYPASSING DESIGN_CONSTRAINTS",
    "SYSTEM READY. WELCOME TO THE LAB."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < terminalSequence.length) {
        setLines(prev => [...prev, terminalSequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setPhase('glitch');
          setTimeout(() => {
            setShow(false);
            onComplete();
          }, 400);
        }, 600);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-[100] flex items-center justify-center font-mono overflow-hidden"
        >
          {phase === 'terminal' ? (
            <div className="max-w-2xl w-full p-8 border border-accent/20 bg-black/50 backdrop-blur-sm relative overflow-hidden">
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
              
              <div className="relative z-10 space-y-2">
                <div className="flex items-center gap-2 mb-6 border-b border-accent/30 pb-2">
                  <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                  <span className="text-accent text-xs tracking-widest uppercase">System Terminal</span>
                </div>
                
                {lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-accent/90 text-sm md:text-base flex gap-4"
                  >
                    <span className="text-accent/40">[{i.toString().padStart(2, '0')}]</span>
                    <span className="tracking-tight">{line}</span>
                  </motion.div>
                ))}
                
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="w-3 h-5 bg-accent mt-4 inline-block shadow-[0_0_10px_#0087c8]"
                />
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ scale: 1, filter: 'brightness(1)' }}
              animate={{ 
                scale: [1, 1.1, 0.9, 1.2, 0],
                filter: ['brightness(1)', 'brightness(2)', 'brightness(0.5)', 'brightness(5)', 'brightness(0)'],
                x: [0, -20, 20, -10, 0],
              }}
              className="text-accent text-9xl font-bold italic tracking-tighter"
            >
              VOID
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootTerminal;
