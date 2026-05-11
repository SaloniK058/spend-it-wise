// import { useState } from "react";

export default function RecommendationCard({ recommendation }) {

    // function capitalize(word){
    //     return word.charAt(0).toUpperCase() + word.slice(1);
    // }

    

    if (!recommendation) return null;
    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center justify-between mb-5">

                <div>
                    <h2 className="text-2xl font-bold capitalize">
                        {recommendation.tool}
                    </h2>

                    <p className="text-zinc-500">
                        Current Plan: {(recommendation.currentPlan)}
                    </p>
                </div>

                <div className="text-right">

                    <p className="text-sm text-zinc-500">
                        Savings
                    </p>

                    <p className="text-3xl font-bold">
                        ${recommendation.savings}
                    </p>

                </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-5">

                <div className="bg-zinc-100 rounded-xl p-4">

                    <p className="text-sm text-zinc-500 mb-1">
                        Current Spend
                    </p>

                    <h3 className="text-2xl font-bold">
                        ${(recommendation.currentSpend)}
                    </h3>

                </div>

                <div className="bg-zinc-100 rounded-xl p-4">

                    <p className="text-sm text-zinc-500 mb-1">
                        Suggested Spend
                    </p>

                    <h3 className="text-2xl font-bold">
                        ${recommendation.suggestedSpend}
                    </h3>

                </div>

            </div>

            <div className="border-t pt-4">

                <p className="mb-2">
                    <span className="font-semibold">
                        Suggested Plan:
                    </span>{" "}
                    {recommendation.suggestedPlan}
                </p>

                <p className="text-zinc-600">
                    {recommendation.reason}
                </p>

            </div>

        </div>
    )
}