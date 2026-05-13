import { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";

import RecommendationCard from "../components/RecommendationCard";
import { supabase } from "../lib/supabase";
import { FunctionsError } from "@supabase/supabase-js";


export default function ResultsPage() {


    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [summary, setSummary] = useState("");
    const [loadingSummary, setLoadingSummary] = useState(false);
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

   

   async function generateSummary(auditResult){
  try {
    setLoadingSummary(true);

    const res = await fetch(
      "https://mhwyrvjaqogtbsmrskwy.supabase.co/functions/v1/summarize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1od3lydmphcW9ndGJzbXJza3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0OTI1OTksImV4cCI6MjA5NDA2ODU5OX0.kQlZN8fkfXn7ljyhvSmm8J6R1DxVTpYEF0k1L1ZEpx0",
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1od3lydmphcW9ndGJzbXJza3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0OTI1OTksImV4cCI6MjA5NDA2ODU5OX0.kQlZN8fkfXn7ljyhvSmm8J6R1DxVTpYEF0k1L1ZEpx0",
        },
        body: JSON.stringify({ auditResult }),
      }
    );

    const data = await res.json();

    setSummary(data.summary);

  } catch (err) {
    console.error(err);
    setSummary("Failed to generate AI summary.");
  } finally {
    setLoadingSummary(false);
  }
};

     useEffect(() => {
        if (audit) {
            generateSummary(audit);
        }
        }, [audit]);

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
  <div className="min-h-screen bg-zinc-100 py-10 px-4">

    <div className="max-w-4xl mx-auto center">

      {/* HERO */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 mb-6">

        <p className="text-sm uppercase tracking-wide text-zinc-500 mb-2">
          Potential Savings
        </p>

        <h1 className="text-5xl font-bold text-black mb-2">
          ${audit.total_monthly_savings}

          <span className="text-2xl text-zinc-500 font-medium">
            /month
          </span>
        </h1>

        <p className="text-zinc-600 text-lg">
          ${audit.total_annual_savings} saved annually
        </p>
      </div>

      {/* CTA */}
      {audit.total_monthly_savings > 500 ? (
        <div className="bg-black text-white rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            You may be overspending
          </h2>

          <p className="text-zinc-300 mb-4">
            Credex can help optimize your AI infrastructure costs further.
          </p>

          <button className="bg-white text-black px-5 py-3 rounded-lg font-medium hover:bg-zinc-200 transition">
            Book Consultation
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Your stack looks optimized
          </h2>

          <p className="text-zinc-600">
            We’ll notify you when better savings opportunities become available.
          </p>
        </div>
      )}

      {/* AI SUMMARY */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 mb-6 card AuditHistory">

        <h2 className="text-2xl font-semibold mb-4">
          AI Financial Summary
        </h2>

        {loadingSummary ? (
          <p className="text-zinc-500">
            AI is analyzing your audit...
          </p>
        ) : (
        //   <p className="text-zinc-700 leading-8">
        //     {summary}
        //   </p>
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 w-[320px]">
            <p className="text-zinc-700 leading-7 break-words whitespace-pre-wrap">
                {summary}
            </p>
            </div>
        )}
      </div>

      {/* RECOMMENDATIONS */}
      <div className="mb-10">

        <h2 className="text-2xl font-semibold mb-4">
          Recommendations
        </h2>

        <div className="space-y-4">
          {audit?.recommendations?.map((item, index) => (
            <RecommendationCard
              key={index}
              recommendation={item}
            />
          ))}
        </div>
      </div>

      {/* EMAIL SECTION */}
      <div className="flex justify-center borderEmail">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-zinc-200 p-6">

          <h2 className="text-2xl font-semibold mb-2 text-center">
            Save Your Audit
          </h2>

          <p className="text-zinc-500 text-sm text-center mb-6">
            Receive this report in your inbox
          </p>

          <div className="space-y-4">

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="text"
              placeholder="Company (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="text"
              placeholder="Role (optional)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

            {/* <button
              onClick={handleSaveLead}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-zinc-800 transition btn"
            >
              Save Report
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full border border-zinc-300 py-3 rounded-lg font-medium hover:bg-zinc-100 transition btn"
            >
              Run Another Audit
            </button> */}
            <div className="pt-2">
            <button
                onClick={handleSaveLead}
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-zinc-800 transition btn"
            >
                Save Report
            </button>
            </div>

            <div className="pt-3 border-t border-zinc-200 mt-4">
            <button
                onClick={() => navigate("/")}
                className="w-full border border-zinc-300 py-3 rounded-lg font-medium hover:bg-zinc-100 transition btn"
            >
                Run Another Audit
            </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
);
}