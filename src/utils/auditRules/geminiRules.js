// geminiRules.js

import { applyOptimization } from "./shared";

export function geminiRules({
tool,
recommendation,
pricingData,
seats,
spend,
useCase
}) {


// Ultra plan overkill
if (
    tool.plan === "ultra" &&
    seats <= 15
) {

    applyOptimization({
        recommendation,
        tool: "gemini",
        plan: "pro",
        seats,
        spend,
        pricingData,
        reason:
            "Gemini Ultra is generally intended for heavier enterprise workflows."
    });
}

// General optimization suggestion
if (
    spend > 150
) {

    recommendation.reason =
        "Claude Pro or ChatGPT Team may provide similar capability at lower monthly cost depending on workflow.";
}

// Coding-heavy workflows
if (
    useCase === "coding" &&
    spend > 100
) {

    recommendation.reason =
        "Cursor combined with Claude may provide stronger coding efficiency for engineering-focused teams.";
}


}
