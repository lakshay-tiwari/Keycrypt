"use client"

import { useRouter } from "next/navigation"

export function Hero(){
    const router = useRouter();
    
    function navigateToDashboard(){
        router.push('/dashboard')
    }

    return (
        <div className="w-full flex justify-center mt-32 sm:mt-40 px-4">
            <div className="text-center max-w-2xl">

                <h1 className="font-semibold font-serif text-blue-900 leading-tight
                               text-3xl sm:text-4xl md:text-5xl max-[360px]:text-2xl">
                    Never Lose a Password
                </h1>

                <p className="flex justify-center items-center space-x-2 mt-2
                              font-semibold font-serif text-blue-900 leading-tight
                              text-3xl sm:text-4xl md:text-5xl max-[360px]:text-2xl">
                    <span>Again with</span>

                    <span className="animate-fade-in font-bold bg-clip-text text-transparent
                                     bg-linear-to-r from-blue-700 to-cyan-500">
                        KeyCrypt
                    </span>
                </p>

                <div className="mt-4 text-cyan-500 leading-snug
                                text-sm sm:text-base md:text-lg max-[360px]:text-[10px] px-2">
                    <p>Stop resetting forgotten passwords.</p>
                    <p>Keep everything safe, synced, and easy to access.</p>
                    <p>KeyCrypt handles the security — you enjoy the convenience.</p>
                </div>

                <div className="mt-8">
                    <button 
                        className="bg-cyan-400 cursor-pointer rounded-3xl 
                                   text-base sm:text-lg px-6 sm:px-8 py-2 
                                   font-semibold text-blue-950 shadow-sm 
                                   hover:bg-cyan-300 transition-all duration-200"
                        onClick={navigateToDashboard}
                    >
                        Get Started
                    </button>
                </div>

            </div>
        </div>
    )
}
