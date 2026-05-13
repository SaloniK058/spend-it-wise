// claudeRules.js

import { applyOptimization } from "./shared";

export function claudeRules({
tool,
recommendation,
pricingData,
seats,
spend,
useCase
}) {


// Claude Max overkill
if (
    tool.plan === "max" &&
    spend < 100
) {

    applyOptimization({
        recommendation,
        tool: "claude",
        plan: "team",
        seats,
        spend,
        pricingData,
        reason:
            "Claude Max may be excessive for moderate usage levels."
    });
}

// Writing/research optimization
if (
    (useCase === "writing" ||
        useCase === "research") &&
    spend > 120
) {

    recommendation.reason =
        "Claude Team is generally strong for long-form writing and research workflows while maintaining lower operational costs.";
}


}
