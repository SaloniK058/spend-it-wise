import { useEffect, useState } from "react"
import ToolRow from "./ToolRow";
import { runAudit } from "../../utils/auditEngine";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

    const INITIAL_STATE = {
        teamSize: "",
        useCase: "",
        tools: [
            {
                name: "",
                plan: "",
                monthlySpend: "",
                seats: "",
            }
        ]
    }

function Form() {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const navigate = useNavigate();
    const [error, setError] = useState()

    // To restore an unfinished form draft is mistakenly refreshed
    useEffect(()=>{
        const savedForm = localStorage.getItem('auditForm');

        if (savedForm) setFormData(JSON.parse(savedForm));
    }, [])

    // To save draft in auditform on every change
    useEffect(()=>{
        localStorage.setItem("auditForm", JSON.stringify(formData))
    }, [formData]);
    


    // TO CHANGE TEAMSIZE AND USECASE
    function handleChange(field, value){
        setFormData((prev)=> ({...prev, [field]: value}))
    }

    // HERE WE ARE JUST UPDATING THE OBJECT
    function updateTool(index, field, value){
        setFormData((prev)=> {
            const updatedTools = [...prev.tools]; // updated array. We created a copy first
            updatedTools[index][field] = value;

            return {
                ...prev, tools: updatedTools,
            }
        })
    }

    function removeTool(index) {
        setFormData((prev)=> ({
            ...prev, tools: prev.tools.filter((_,i)=> i!==index), 
        }))
    }
  
    // ADDS NEW OBJECT, SINCE WE'RE ADDING A NEW TOOL
    function addTool(){
        setFormData((prev)=> ({
            ...prev,
            tools: [...prev.tools, {
                name: "",
                plan: "",
                monthlySpend: "",
                seats: "",
            }]
        }))
    } 

   async function handleSubmit(e){
        e.preventDefault();
        console.log('will navigate to results');

        const hasEmptyTools = formData.tools.some((tool) =>
        !tool.name ||
        !tool.plan ||
        !tool.monthlySpend ||
        !tool.seats
    );

    if (
        !formData.teamSize ||
        !formData.useCase ||
        hasEmptyTools
    ) {
        setError("Please fill all the fields*")
        return;
    }

        const auditResults = runAudit(formData);

        const savedAudit = await saveAudit(auditResults);

        setError('')

        // navigate("/results", {state: auditResults})
        navigate(`/results/${savedAudit.id}`)// goes directly to the url

        const auditRecords = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            formData,
            auditResults,
        }

        const existingAudits = JSON.parse(localStorage.getItem("auditHistory")) || [];

        const updatedAudits = [
            ...existingAudits, auditRecords
        ];

        localStorage.setItem("auditHistory", JSON.stringify(updatedAudits));

        setFormData(INITIAL_STATE);
        localStorage.removeItem("auditForm"); // draft clears
        
    };
    
  async function saveAudit(auditResults) {

        // const auditResults = runAudit(formData);


        // Supabase stores Real audit calculations
        const recommendations = auditResults.recommendations;

        const totalMonthlySavings =
        auditResults.totalMonthlySavings;

        const totalAnnualSavings =
        auditResults.totalAnnualSavings;

        const { data, error } = await supabase
            .from("audits")
            .insert([
            {
                team_size: formData.teamSize,

                use_case: formData.useCase,

                tools: formData.tools,

                recommendations,

                total_monthly_savings:
                totalMonthlySavings,

                total_annual_savings:
                totalAnnualSavings
            }
            ])
            .select()
            .single();

        console.log("DATA:", data);
        console.log("ERROR:", error);
        return data; // supabase gives data back to us...
        }


    return (
        
        <form onSubmit={handleSubmit}
        onKeyDown={(e)=> {
            if (e.key === "Enter"){
                e.preventDefault();
            }
        }}>
            { error && (
      <p className="text-red-500 mb-4">
         {error}
      </p>
   )}
            <div>
                <label >Team Size</label>
                <input type="number" 
                    value={formData.teamSize}
                    onChange={(e)=> handleChange("teamSize", e.target.value)}
                   />
            </div>
            <div>
                <label >Primary Use Case</label>
                <select 
                    value={formData.useCase}
                    onChange={(e)=> handleChange("useCase", e.target.value.toLowerCase())}
                   >
                    <option value="">Select</option>
                    <option value="coding">Coding</option>
                    <option value="writing">Writing</option>
                    <option value="research">Research</option>
                    <option value="data">Data</option>
                    <option value="mixed">Mixed</option>
                    </select>
            </div>
            {/* TOOLS */}
            <div>
                <h3>Tools</h3>
                {
                    formData.tools.map((el, i)=> (
                        <ToolRow
                            key={i}
                            tool={el}
                            index={i}
                            updateTool={updateTool}
                            removeTool={removeTool}
                        />
                    ))
                }
 
                <div className="btnform">
                <button className="btn" type="button" onClick={addTool}>
                    Add Tool
                </button>
                <button className="btn" type="submit">
                 Submit
                </button>
                </div>
            </div>
        </form>
    )
}

export default Form
