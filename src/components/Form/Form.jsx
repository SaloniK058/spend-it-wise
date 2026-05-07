import { useEffect, useState } from "react"
import ToolRow from "./ToolRow";

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

    useEffect(()=>{
        localStorage.setItem("auditForm", JSON.stringify(formData))
    }, [formData]);
    
    // to LocalStorage


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

    function handleSubmit(e){
        e.preventDefault();
        console.log('will navigate to results');

        const existingAudits = JSON.parse(localStorage.getItem("auditHistory")) || [];

        const updatedAudits = [
            ...existingAudits, formData
        ];

        localStorage.setItem("auditHistory", JSON.stringify(updatedAudits));
    };
    

    return (
        <form onSubmit={handleSubmit}>
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
                    onChange={(e)=> handleChange("useCase", e.target.value)}
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

                <button type="button" onClick={addTool}>
                    Add Tool
                </button>
            </div>
        </form>
    )
}

export default Form
