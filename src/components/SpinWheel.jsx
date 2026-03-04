import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const PUNISHMENTS = [
    "💻 Close Laptops – 10 Min",
    "🤝 Hand Main Laptop to Volunteer",
    "🤖 No AI Tools – 15 Min",
    "🔄 Swap Laptop Until Event Ends",
    "🖱️ No Keyboard – 10 Min",
    "🧍 Stand & Code – 15 Min",
    "🧹 Clear Entire Table – 20 Min",
    "🔍 Maximize Font Size – 10 Min"
];

const SEGMENTS = PUNISHMENTS.length;
const SEGMENT_ANGLE = 360 / SEGMENTS;

const colors = [
    "#0ea5e9",
    "#6366f1",
    "#22d3ee",
    "#818cf8",
    "#38bdf8",
    "#0ea5e9",
    "#6366f1",
    "#22d3ee"
];

const SpinWheel = () => {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState(null);
    const [hasSpun, setHasSpun] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const spinWheel = () => {
        if (hasSpun || isSpinning) return;

        setIsSpinning(true);

        const randomIndex = Math.floor(Math.random() * SEGMENTS);
        const randomNum = randomIndex + 1;
        const topic = PUNISHMENTS[randomIndex];

        const stopAngle =
            360 * 5 +
            (360 - (randomNum - 1) * SEGMENT_ANGLE - SEGMENT_ANGLE / 2);

        setRotation(stopAngle);

        setTimeout(() => {
            setResult({ number: randomNum, topic });
            setHasSpun(true);
            setShowConfetti(true);
            setIsSpinning(false);

            setTimeout(() => setShowConfetti(false), 6000);
        }, 5000);
    };

    const resetWheel = () => {
        setHasSpun(false);
        setResult(null);
        setRotation(0);
        setShowConfetti(false);
    };

    const truncateText = (text, maxLength = window.innerWidth < 640 ? 16 : 22) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    const createSegments = () => {
        const radius = 380;
        const center = 400;

        return Array.from({ length: SEGMENTS }, (_, i) => {
            const startAngle = (i * SEGMENT_ANGLE - 90) * (Math.PI / 180);
            const endAngle = ((i + 1) * SEGMENT_ANGLE - 90) * (Math.PI / 180);

            const x1 = center + radius * Math.cos(startAngle);
            const y1 = center + radius * Math.sin(startAngle);
            const x2 = center + radius * Math.cos(endAngle);
            const y2 = center + radius * Math.sin(endAngle);

            const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

            const textAngle = startAngle + (endAngle - startAngle) / 2;
            const rotateDeg = textAngle * (180 / Math.PI);

            return (
                <g key={i}>
                    <path
                        d={path}
                        fill={colors[i]}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="2"
                    />

                    <g transform={`translate(${center}, ${center}) rotate(${rotateDeg})`}>
                        <text
                            x={180} // moved outward from center
                            y={0}
                            fill="white"
                            className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-[800] sm:font-[900] drop-shadow-md"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {truncateText(PUNISHMENTS[i])}
                        </text>
                    </g>
                </g>
            );
        });
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] overflow-hidden">

            {showConfetti && (
                <Confetti width={window.innerWidth} height={window.innerHeight} />
            )}

            <div className="text-center w-full max-w-7xl mx-auto px-4">

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 mb-6 lg:mb-8 drop-shadow-lg tracking-tight mt-4 whitespace-pre-wrap">
                    ⚡ Punishment Allocator
                </h1>

                {!hasSpun ? (
                    <div className="flex flex-col items-center justify-center">

                        <div className="relative flex justify-center items-center w-full max-w-[95vw] sm:max-w-[80vw] lg:max-w-[800px] mb-6 lg:mb-12">

                            {/* Pointer */}
                            <div className="absolute -top-10 z-20">
                                <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[50px] border-l-transparent border-r-transparent border-b-cyan-400 drop-shadow-[0_0_20px_#22d3ee]" />
                            </div>

                            <motion.svg
                                width="800"
                                height="800"
                                viewBox="-20 -20 840 840"
                                animate={{ rotate: rotation }}
                                transition={{ duration: 5, ease: "easeOut" }}
                                className="drop-shadow-[0_0_40px_rgba(34,211,238,0.3)] w-full max-w-[500px] h-auto"
                            >
                                {createSegments()}

                                <circle
                                    cx="400"
                                    cy="400"
                                    r="40"
                                    fill="#020617"
                                    stroke="#22d3ee"
                                    strokeWidth="6"
                                />
                            </motion.svg>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isSpinning}
                            onClick={spinWheel}
                            className="px-6 py-4 sm:px-12 sm:py-5 lg:px-16 lg:py-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xl sm:text-2xl lg:text-3xl font-bold shadow-[0_0_30px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider md:tracking-widest transition-all"
                        >
                            {isSpinning ? "Allocating..." : "SPIN TO FIND OUT ⚡"}
                        </motion.button>

                    </div>
                ) : (

                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-16 shadow-[0_0_80px_rgba(34,211,238,0.2)] max-w-5xl mx-auto border border-white/20"
                        >
                            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white mb-4 sm:mb-6">
                                Punishment #{result.number} 🎉
                            </h2>

                            <p className="text-cyan-400 text-xl sm:text-2xl lg:text-3xl uppercase tracking-widest font-black mb-6 sm:mb-10">
                                Your Fate
                            </p>

                            <div className="text-white text-2xl sm:text-4xl lg:text-6xl font-bold bg-black/40 rounded-3xl p-6 sm:p-10 lg:p-12 leading-tight border border-cyan-500/30 shadow-inner break-words">
                                {result.topic}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={resetWheel}
                                className="mt-8 sm:mt-12 lg:mt-16 px-8 py-4 sm:px-12 sm:py-5 rounded-2xl bg-gradient-to-r from-slate-700 to-slate-800 text-white text-xl sm:text-2xl font-bold hover:from-slate-600 hover:to-slate-700 transition border border-white/10 shadow-lg"
                            >
                                Spin Again 🔄
                            </motion.button>

                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

export default SpinWheel;