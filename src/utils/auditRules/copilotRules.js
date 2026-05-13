import { applyOptimization } from "./shared";

export function copilotRules({
tool,
recommendation,
pricingData,
seats,
spend,
useCase
}) {


if (
    tool.plan !== "individual" &&
    seats === 1
) {

    applyOptimization({
        recommendation,
        tool: "copilot",
        plan: "individual",
        seats,
        spend,
        pricingData,
        reason:
            "GitHub Copilot Individual is generally optimal for solo developers."
    });
}

if (
    useCase === "coding" &&
    spend > 100
) {

    recommendation.reason =
        "Cursor Business may provide similar AI coding assistance at lower seat cost.";
}


}
