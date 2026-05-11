import { useLocation, useNavigate } from "react-router-dom";
import RecommendationCard from "../components/RecommendationCard";

export default function ResultsPage(){

    const location = useLocation();
    const navigate = useNavigate();

    const audit = location.state;
    console.log(audit);

    if (!audit) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">
                        No audit found
                    </h1>

                    <button
                        onClick={() => navigate("/")}
                        className="bg-black text-white px-5 py-2 rounded-lg"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        )
    }


     return (
        <div className="min-h-screen bg-zinc-100 p-6">

            {/* HERO */}

            <div className="max-w-5xl mx-auto">

                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

                    <p className="text-sm uppercase tracking-wide text-zinc-500 mb-2">
                        Potential Savings
                    </p>

                    <h1 className="text-5xl font-bold mb-3">
                        ${audit.totalMonthlySavings}
                        <span className="text-2xl text-zinc-500 font-medium">
                            /month
                        </span>
                    </h1>

                    <p className="text-xl text-zinc-600">
                        ${audit.totalAnnualSavings} saved annually
                    </p>

                </div>

                {/* CTA */}

                {
                    audit.totalMonthlySavings > 500 ? (
                        <div className="bg-black text-white rounded-2xl p-6 mb-8">

                            <h2 className="text-2xl font-bold mb-2">
                                You may be overspending significantly
                            </h2>

                            <p className="text-zinc-300 mb-4">
                                Credex can help reduce your AI infrastructure costs further.
                            </p>

                            <button className="bg-white text-black px-5 py-3 rounded-lg font-medium">
                                Book Credex Consultation
                            </button>

                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-6 mb-8 shadow">

                            <h2 className="text-2xl font-bold mb-2">
                                Your stack already looks fairly optimized
                            </h2>

                            <p className="text-zinc-600">
                                We’ll notify you when better savings opportunities become available.
                            </p>

                        </div>
                    )
                }

                {/* RECOMMENDATIONS */}

                <div className="space-y-5">

                    {
                        audit?.recommendations?.map((item, index) => (
                            <RecommendationCard
                                key={index}
                                recommendation={item}
                            />
                        ))
                    }

                </div>

            </div>

        </div>
    )
}

