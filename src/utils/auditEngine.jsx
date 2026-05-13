// import { pricingData } from "../data/pricingData";

// import { chatgptRules }
// from "./auditRules/chatgptRules";

// export function runAudit(formData) {

//     let totalMonthlySavings = 0;
//     let totalMonthlySpend = 0;

//     const recommendations =
//         formData.tools.map((tool) => {

//             const spend =
//                 Number(tool.monthlySpend);

//             const seats =
//                 Number(tool.seats);

//             const recommendation = {

//                 tool: tool.name,

//                 currentPlan: tool.plan,

//                 currentSpend: spend,

//                 suggestedPlan: tool.plan,

//                 suggestedSpend: spend,

//                 savings: 0,

//                 reason:
//                     "Your current plan looks optimal."
//             };

//             //////////////////////////////////////
//             // CHATGPT

//             if (tool.name === "chatgpt") {

//                 chatgptRules({

//                     tool,

//                     recommendation,

//                     pricingData,

//                     seats,

//                     spend,

//                     useCase:
//                         formData.useCase
//                 });
//             }

//             //////////////////////////////////////
//             // CURSOR

//             if (tool.name === "cursor") {

//                 if (
//                     (tool.plan === "business" ||
//                         tool.plan === "enterprise") &&
//                     seats <= 2
//                 ) {

//                     recommendation.suggestedPlan =
//                         "pro";

//                     recommendation.suggestedSpend =
//                         pricingData.cursor.plans.pro * seats;

//                     recommendation.savings =
//                         spend -
//                         recommendation.suggestedSpend;

//                     recommendation.reason =
//                         "Business tier may be unnecessary for very small engineering teams.";
//                 }

//                 if (
//                     formData.useCase === "coding" &&
//                     spend > 200
//                 ) {

//                     recommendation.reason =
//                         "Your coding workflow may benefit from consolidating overlapping AI coding tools.";
//                 }
//             }

//             //////////////////////////////////////
//             // COPILOT

//             if (tool.name === "copilot") {

//                 if (
//                     tool.plan !== "individual" &&
//                     seats === 1
//                 ) {

//                     recommendation.suggestedPlan =
//                         "individual";

//                     recommendation.suggestedSpend =
//                         pricingData.copilot.plans.individual;

//                     recommendation.savings =
//                         spend -
//                         recommendation.suggestedSpend;

//                     recommendation.reason =
//                         "GitHub Copilot Individual is generally optimal for solo developers.";
//                 }

//                 if (
//                     formData.useCase === "coding" &&
//                     spend > 100
//                 ) {

//                     recommendation.reason =
//                         "Cursor Business may provide similar AI coding assistance at lower seat cost.";
//                 }
//             }

//             //////////////////////////////////////
//             // CLAUDE

//             if (tool.name === "claude") {

//                 if (
//                     tool.plan === "max" &&
//                     spend < 100
//                 ) {

//                     recommendation.suggestedPlan =
//                         "team";

//                     recommendation.suggestedSpend =
//                         pricingData.claude.plans.team;

//                     recommendation.savings =
//                         spend -
//                         recommendation.suggestedSpend;

//                     recommendation.reason =
//                         "Claude Max may be excessive for moderate usage levels.";
//                 }
//             }

//             //////////////////////////////////////
//             // GEMINI

//             if (tool.name === "gemini") {

//                 if (
//                     tool.plan === "ultra" &&
//                     seats <= 15
//                 ) {

//                     recommendation.suggestedPlan =
//                         "pro";

//                     recommendation.suggestedSpend =
//                         pricingData.gemini.plans.pro * seats;

//                     recommendation.savings =
//                         spend -
//                         recommendation.suggestedSpend;

//                     recommendation.reason =
//                         "Gemini Ultra is generally intended for heavier enterprise workflows.";
//                 }

//                 if (
//                     spend > 150
//                 ) {

//                     recommendation.reason =
//                         "Claude Pro or ChatGPT Team may provide similar capability at lower monthly cost depending on workflow.";
//                 }
//             }


//             //////////////////////////////////////
//                 // WINDSURF

//                 if (tool.name === "windsurf") {

//                     // Teams overpaying
//                     if (
//                         tool.plan === "teams" &&
//                         seats <= 2
//                     ) {

//                         recommendation.suggestedPlan =
//                             "pro";

//                         recommendation.suggestedSpend =
//                             pricingData.windsurf.plans.pro * seats;

//                         recommendation.savings =
//                             spend -
//                             recommendation.suggestedSpend;

//                         recommendation.reason =
//                             "Windsurf Teams may be unnecessary for very small development teams.";
//                     }

//                     // Tool overlap
//                     if (
//                         formData.useCase === "coding" &&
//                         spend > 100
//                     ) {

//                         recommendation.reason =
//                             "Your engineering stack may contain overlapping AI coding assistants increasing operational cost.";
//                     }
//                 }

//             //////////////////////////////////////
//             // Prevent negative savings

//             if (
//                 recommendation.savings < 0
//             ) {

//                 recommendation.savings = 0;
//             }

//             totalMonthlySavings +=
//                 recommendation.savings;

//             return recommendation;
//         });

//     return {

//         recommendations,
//          totalMonthlySpend,
//         totalMonthlySavings,

//         totalAnnualSavings:
//             totalMonthlySavings * 12
//     };
// }

import { pricingData } from "../data/pricingData";

import { chatgptRules } from "./auditRules/chatgptRules";
import { cursorRules } from "./auditRules/cursorRules";
import { copilotRules } from "./auditRules/copilotRules";
import { claudeRules } from "./auditRules/claudeRules";
import { geminiRules } from "./auditRules/geminiRules";
import { windsurfRules } from "./auditRules/winddsurfRules";

export function runAudit(formData) {


let totalMonthlySavings = 0;
let totalMonthlySpend = 0;

const recommendations =
    formData.tools.map((tool) => {

        const spend =
            Number(tool.monthlySpend);

        const seats =
            Number(tool.seats);

        totalMonthlySpend += spend;

        const recommendation = {

            tool: tool.name,

            currentPlan: tool.plan,

            currentSpend: spend,

            suggestedPlan: tool.plan,

            suggestedSpend: spend,

            savings: 0,

            reason:
                "Your current plan looks optimal."
        };

        const rulePayload = {

            tool,
            recommendation,
            pricingData,
            seats,
            spend,
            useCase:
                formData.useCase
        };

        if (tool.name === "chatgpt") {
            chatgptRules(rulePayload);
        }

        if (tool.name === "cursor") {
            cursorRules(rulePayload);
        }

        if (tool.name === "copilot") {
            copilotRules(rulePayload);
        }

        if (tool.name === "claude") {
            claudeRules(rulePayload);
        }

        if (tool.name === "gemini") {
            geminiRules(rulePayload);
        }

        if (tool.name === "windsurf") {
            windsurfRules(rulePayload);
        }

        if (recommendation.savings < 0) {
            recommendation.savings = 0;
        }

        totalMonthlySavings +=
            recommendation.savings;

        return recommendation;
    });

return {

    recommendations,

    totalMonthlySpend,

    totalMonthlySavings,

    totalAnnualSavings:
        totalMonthlySavings * 12
};


}
