// windsurfRules.js

import { applyOptimization } from "./shared";

export function windsurfRules({
tool,
recommendation,
pricingData,
seats,
spend,
useCase
}) {


// Small team optimization
if (
    tool.plan === "teams" &&
    seats <= 2
) {

    applyOptimization({
        recommendation,
        tool: "windsurf",
        plan: "pro",
        seats,
        spend,
        pricingData,
        reason:
            "Windsurf Teams may be unnecessary for very small development teams."
    });
}

// Overlapping coding stack
if (
    useCase === "coding" &&
    spend > 100
) {

    recommendation.reason =
        "Your engineering stack may contain overlapping AI coding assistants increasing operational cost.";
}

// Large engineering spend
if (
    spend > 250
) {

    recommendation.reason =
        "Consolidating Windsurf with fewer premium coding assistants could reduce monthly AI tooling costs.";
}


}
