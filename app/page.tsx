"use client";

import { useActionState } from "react";
import { analyzeDeckAction } from "./actions";

export default function AnalyzePage() {
    const [state, formAction, isPending] = useActionState(analyzeDeckAction, null);

    return (
        <div className="min-h-screen bg-[#05050f] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-20 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 relative z-10 space-y-16">

                {/* Hero / Header Section */}
                <div className="text-center md:space-y-6 space-y-4 max-w-3xl mx-auto mt-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-indigo-300 mb-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        Chronomagical Tracker
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                        <span className="text-white">Deck</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500"> Explorer</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
                        Unveil the temporal flow of your arsenal. Paste your decklist below and identify the exact moment each card will rotate out of the Standard universe.
                    </p>
                </div>

                {/* Main Form Section */}
                <div className="max-w-5xl mx-auto">
                    <form action={formAction} className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-[#0d1123] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">

                            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <label htmlFor="deck" className="block text-sm font-bold text-slate-200 tracking-wide">
                                    Decklist
                                </label>
                                <div className="flex items-center gap-2 text-xs font-medium text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20 w-fit">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Names must be in English
                                </div>
                            </div>

                            <textarea
                                id="deck"
                                name="deck"
                                className="bg-[#050510]/50 border border-indigo-500/20 rounded-2xl p-5 w-full h-64 text-indigo-100 placeholder-indigo-900/60 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all font-mono text-sm resize-y text-opacity-90 custom-scrollbar shadow-inner"
                                placeholder="Insert text here...&#10;&#10;Example:&#10;4 Fading Hope (MID) 20&#10;2 Otawara, Soaring City (NEO) 271..."
                            />

                            <div className="mt-6">
                                <button
                                    disabled={isPending}
                                    className="w-full relative inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold text-[#05050f] overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none group/btn"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center gap-2">
                                        {isPending ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Consulting the Multiverse...
                                            </>
                                        ) : (
                                            <>
                                                Scan Rotation
                                                <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                            </>
                                        )}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Results Section */}
                {state && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-16 duration-1000 pt-8 border-t border-white/5">

                        {/* Errors / Not Found Alert */}
                        {state.notFound && state.notFound.length > 0 && (
                            <div className="max-w-3xl mx-auto bg-rose-950/30 border border-rose-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-500 to-orange-500"></div>
                                <h3 className="flex items-center gap-3 text-rose-400 font-bold text-xl mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                    Some anomalies detected
                                </h3>
                                <p className="text-rose-200/70 text-sm mb-6 leading-relaxed">
                                    Could not find the cards below. Make sure they are named in English and valid in the official registry.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {state.notFound.map((name: string, i: number) => (
                                        <span key={i} className="inline-flex items-center gap-1.5 bg-rose-900/40 text-rose-200 px-3 py-1.5 rounded-lg border border-rose-500/20 text-sm font-medium shadow-sm">
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Cards Header */}
                        {state.found.length > 0 && (
                            <div className="flex flex-col items-center justify-center gap-2 mb-8 text-center">
                                <h2 className="text-3xl font-black tracking-tight text-white">Scanned Cards</h2>
                                <p className="text-indigo-300/80">We identified the rotation landscape for your spells.</p>
                            </div>
                        )}

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 gap-6">
                            {state.found.map((card: any, idx: number) => (
                                <div key={idx} className="group relative bg-[#0a0f20]/80 rounded-[2rem] border border-white/5 p-4 hover:border-indigo-500/40 hover:bg-[#0f152e] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 flex flex-col h-full backdrop-blur-md">

                                    {/* Card Image Wrapper */}
                                    <div className="relative aspect-[5/7] w-full bg-[#050510] rounded-[1.5rem] overflow-hidden mb-5 border border-white/5 shadow-inner">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        {card.imageUrl ? (
                                            <img
                                                src={card.imageUrl}
                                                alt={card.name}
                                                className="object-cover w-full h-full transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-indigo-500/50 p-6 text-center">
                                                <svg className="w-12 h-12 mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                <span className="text-xs font-semibold uppercase tracking-widest">No Image</span>
                                            </div>
                                        )}
                                        {/* Quantity Flash Badge */}
                                        <div className="absolute top-3 right-3 z-20 bg-indigo-500 text-white font-black px-3 py-1.5 rounded-full text-sm shadow-xl shadow-indigo-500/40 border border-indigo-400">
                                            {card.quantity}x
                                        </div>
                                    </div>

                                    {/* Card Details */}
                                    <div className="flex flex-col flex-1 justify-between gap-4 px-2 pb-2">
                                        <div>
                                            <h3 className="font-bold text-xl text-white leading-tight mb-1 truncate" title={card.name}>
                                                {card.name}
                                            </h3>
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400/80 uppercase tracking-wide">
                                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg>
                                                {card.set}
                                            </div>
                                        </div>

                                        <div className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.05] flex justify-between items-center group-hover:bg-indigo-500/5 transition-colors">
                                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Lifespan</span>
                                            {card.monthsLeft > 0 ? (
                                                <span className={`flex items-center gap-1 font-bold text-sm ${card.monthsLeft < 6
                                                    ? 'text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]'
                                                    : card.monthsLeft <= 12
                                                        ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]'
                                                        : 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]'
                                                    }`}>
                                                    {card.monthsLeft} {card.monthsLeft === 1 ? "month" : "months"}
                                                </span>
                                            ) : (
                                                <span className="font-bold text-sm text-slate-500 flex items-center gap-1">
                                                    Rotated
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
