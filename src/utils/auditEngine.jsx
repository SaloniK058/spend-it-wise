import { pricingData } from "../data/pricingData";

export function runAudit (formData){
    let totalMonthlySavings = 0;

    const recommendations = formData.tools.map((tool)=>{
        const toolDetail =pricingData[tool.name];

        let recommendation = {
            tool: toolDetail?.name || tool.name,
            currentPlan: tool.plan,
            currentSpend: Number(tool.monthlySpend),
            suggestedPlan: tool.plan,
            suggestedSpend: Number(tool.monthlySpend),
            savings: 0, 
            reason: "Your current plan looks optimal"
        }

        // CHATGPT
        if (tool.name === 'chatgpt') {
            // tiny team thing:
            if (Number(tool.seats) <= 2 ) {
                const cheaperVar = pricingData.chatgpt.plans.plus * Number(tool.seats);

                recommendation.suggestedPlan= "plus";
                recommendation.suggestedSpend = cheaperVar;
                recommendation.savings = Number(tool.monthlySpend) - cheaperVar;
                recommendation.reason = "This plan is bit too much for such a small team.";
            }
        }

        totalMonthlySavings += recommendation.savings;
        return recommendation;
    })
    return{ recommendations,
     totalMonthlySavings,
     totalAnnualSavings: totalMonthlySavings * 12,
    }
}