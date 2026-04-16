"use client";

import { useActionState } from "react";
import { analyzeDeckAction } from "./actions";

export default function AnalyzePage() {
    const [state, formAction, isPending] = useActionState(analyzeDeckAction, null);

    return (
        <form action={formAction} className="space-y-4">
            <textarea
                name="deck"
                className="border p-4 w-full h-60"
                placeholder="4 Lightning Strike"
            />
            <button className="border px-4 py-2" disabled={isPending}>
                {isPending ? "Analisando..." : "Analisar Rotação"}
            </button>
            
            {state && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold">Resultados:</h2>
                    <ul className="list-disc pl-5">
                        {state.map((card: any, idx: number) => (
                            <li key={idx}>
                                {card.quantity}x {card.name} - {card.set} ({card.monthsLeft} meses restantes)
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </form>
    );
}