import { applyOptimization } from "./shared";

export function cursorRules({
tool,
recommendation,
pricingData,
seats,
spend,
useCase
}) {


if (
    (tool.plan === "business" ||
        tool.plan === "enterprise") &&
    seats <= 2
) {

    applyOptimization({
        recommendation,
        tool: "cursor",
        plan: "pro",
        seats,
        spend,
        pricingData,
        reason:
            "Business tier may be unnecessary for very small engineering teams."
    });
}

if (
    useCase === "coding" &&
    spend > 200
) {

    recommendation.reason =
        "Your coding workflow may benefit from consolidating overlapping AI coding tools.";
}


}
