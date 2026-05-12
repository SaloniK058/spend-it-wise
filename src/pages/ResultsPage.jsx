import { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";

import RecommendationCard from "../components/RecommendationCard";
import { supabase } from "../lib/supabase";
import { FunctionsError } from "@supabase/supabase-js";


export default function ResultsPage() {


    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const { id } = useParams();

    const navigate = useNavigate();

    const [audit, setAudit] = useState(null);

    useEffect(() => {

        async function fetchAudit() {

            const { data, error } = await supabase
                .from("audits")
                .select("*")// select from all the column
                .eq("id", id)// particular id matching
                .single();// single object

            console.log(data);
            console.log(error);

            setAudit(data);
        }

        fetchAudit();

    }, [id]);

    async function handleSaveLead() {
        const { error } = await supabase
            .from("leads")
            .insert([
            {
                audit_id: audit.id,
                email,
                company,
                role,
            },
            ]);

        if (error) {
            console.log(error);
            alert("Something went wrong");
            return;
        }

        await supabase.functions.invoke("send-email", {
            body: {
                email,
                auditUrl: window.location.href,
            },
            });

            console.log(data);
            
          console.error(FunctionsError);
          console.log(JSON.stringify(FunctionsError, null, 2));
        alert("Report saved successfully!");
        }

    if (!audit) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">
                    Loading...
                </h1>
            </div>
        );
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
                        ${audit.total_monthly_savings}

                        <span className="text-2xl text-zinc-500 font-medium">
                            /month
                        </span>
                    </h1>

                    <p className="text-xl text-zinc-600">
                        ${audit.total_annual_savings} saved annually
                    </p>

                </div>

                {/* CTA */}

                {
                    audit.total_monthly_savings > 500 ? (

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

                <button
                    onClick={() => navigate("/")}
                    className="mt-8 bg-black text-white px-5 py-3 rounded-lg"
                >
                    Run Another Audit
                </button>

                    <div className="mt-8 border p-4 rounded">
                        <h2 className="text-xl font-bold mb-4">
                            Save Your Audit Report
                        </h2>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 w-full mb-3"
                        />

                        <input
                            type="text"
                            placeholder="Company (optional)"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="border p-2 w-full mb-3"
                        />

                        <input
                            type="text"
                            placeholder="Role (optional)"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="border p-2 w-full mb-3"
                        />

                        <button
                            onClick={handleSaveLead}
                            className="bg-black text-white px-4 py-2 rounded"
                        >
                            Save Report
                        </button>
                        </div>
                    </div>

                </div>
    );
}