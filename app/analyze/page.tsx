"use client";

import { useActionState } from "react";
import { analyzeDeckAction } from "./actions";

export default function AnalyzePage() {
    const [state, formAction, isPending] = useActionState(analyzeDeckAction, null);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans selection:bg-fuchsia-500 selection:text-white">
            <div className="max-w-5xl mx-auto space-y-12">
                
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-fuchsia-400 to-purple-600 bg-clip-text text-transparent pb-2">
                        Magic: The Gathering
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Analise seu deck para descobrir quais edições compõem a sua lista e quantos meses faltam para rotacionarem do Standard.
                    </p>
                </div>

                {/* Form Section */}
                <form action={formAction} className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 md:p-8 space-y-6 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    
                    <div className="relative">
                        <label htmlFor="deck" className="block text-sm font-semibold text-slate-300 mb-2">Sua Lista de Deck (Importação do Arena MTG)</label>
                        <div className="flex items-center gap-2 mb-3 text-xs text-amber-500 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20 w-fit">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            Por favor, certifique-ce de usar os nomes das cartas em Inglês para que a busca funcione perfeitamente.
                        </div>
                        <textarea
                            id="deck"
                            name="deck"
                            className="bg-slate-950/50 border border-slate-700/50 rounded-2xl p-5 w-full h-64 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 transition-all font-mono text-sm resize-y shadow-inner"
                            placeholder="Exemplo:&#10;4 Fading Hope (MID) 20&#10;2 Otawara, Soaring City (NEO) 271..."
                        />
                    </div>
                    
                    <button 
                        disabled={isPending}
                        className="w-full relative inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-4 font-bold text-white shadow-lg shadow-fuchsia-500/25 ring-1 ring-white/10 transition-all hover:scale-[1.01] hover:shadow-xl hover:shadow-fuchsia-500/40 disabled:opacity-60 disabled:pointer-events-none active:scale-[0.98]"
                    >
                        {isPending ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Analisando as cartas do Multiverso...
                            </>
                        ) : (
                            "Analisar Deck"
                        )}
                    </button>
                </form>

                {/* Results Section */}
                {state && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                        {/* Errors / Not Found Modal Area */}
                        {state.notFound && state.notFound.length > 0 && (
                            <div className="bg-rose-950/40 border border-rose-900/50 rounded-2xl p-6 shadow-xl backdrop-blur-md">
                                <h3 className="flex items-center gap-2 text-rose-400 font-bold text-lg mb-4">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Não conseguimos encontrar algumas cartas:
                                </h3>
                                <p className="text-sm text-rose-300/80 mb-4">
                                    Isso pode ocorrer porque as cartas estão listadas em outro idioma (ex: português),
                                    o nome contém erros de digitação, ou é um formato especial não reconhecido.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-rose-200">
                                    {state.notFound.map((name: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2 bg-rose-900/20 px-3 py-2 rounded-lg border border-rose-800/30">
                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500/50"></span>
                                            {name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="flex items-center gap-6">
                            <h2 className="text-2xl font-bold text-slate-100">Resultados da Análise</h2>
                            <div className="h-px bg-slate-800 flex-1"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {state.found.map((card: any, idx: number) => (
                                <div key={idx} className="group relative bg-[#0f172a] rounded-2xl border border-slate-800 p-4 hover:border-fuchsia-500/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                                    
                                    {/* Card Image */}
                                    <div className="relative aspect-[5/7] w-full bg-slate-900 rounded-xl overflow-hidden mb-5 border border-slate-700/50 shadow-inner">
                                        {card.imageUrl ? (
                                            <img 
                                                src={card.imageUrl} 
                                                alt={card.name} 
                                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm p-4 text-center font-medium">
                                                Imagem não disponível
                                            </div>
                                        )}
                                        {/* Quantity Badge */}
                                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-sm font-black text-slate-200 border border-white/10 shadow-lg">
                                            {card.quantity}x
                                        </div>
                                    </div>
                                    
                                    {/* Card Details */}
                                    <div className="space-y-3">
                                        <h3 className="font-bold text-lg text-slate-200 leading-tight" title={card.name}>
                                            {card.name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                            <span className="truncate">{card.set}</span>
                                        </div>
                                        <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
                                            <span className="text-slate-500 text-xs uppercase tracking-wider font-bold">Rotação</span>
                                            <span className={`font-semibold px-2.5 py-1 rounded-md text-xs ${card.monthsLeft < 6 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                                                {card.monthsLeft > 0 ? `${card.monthsLeft} meses` : 'Rotacionado'}
                                            </span>
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