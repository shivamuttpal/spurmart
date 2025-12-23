import ChatWidget from './components/ChatWidget'
import { motion } from 'framer-motion'

function App() {
    return (
        <div className="min-h-screen w-full relative overflow-hidden bg-slate-50 selection:bg-blue-100 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50">
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:bg-slate-950 dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-70"></div>

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl space-y-8"
                >
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 drop-shadow-sm"
                        >
                            Spur Mart
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
                        >
                            Experience the future of shopping with our intelligent AI assistant.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="p-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg max-w-lg mx-auto"
                    >
                        <p className="text-slate-700 dark:text-slate-200 font-medium">
                            Need assistance? look for the <span className="text-blue-600 dark:text-blue-400 font-bold">blue bubble</span> in the corner!
                        </p>
                    </motion.div>
                </motion.div>
            </main>

            <ChatWidget />
        </div>
    )
}

export default App
