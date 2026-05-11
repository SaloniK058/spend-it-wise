import { applyOptimization } from "./shared";

export function chatgptRules({
    tool,
    recommendation,
    pricingData,
    seats,
    spend,
    useCase
}) {

    // Enterprise overkill
    if (
        tool.plan === "enterprise" &&
        seats < 10
    ) {

        applyOptimization({
            recommendation,

            tool: "chatgpt",

            plan: "team",

            seats,

            spend,

            pricingData,

            reason:
                "Enterprise features appear excessive for your current team size."
        });
    }

    // Tiny teams
    else if (
        seats <= 2 &&
        tool.plan !== "plus"
    ) {

        applyOptimization({
            recommendation,

            tool: "chatgpt",

            plan: "plus",

            seats,

            spend,

            pricingData,

            reason:
                "ChatGPT Plus is typically sufficient for very small teams."
        });
    }

    // Coding-heavy teams
    if (
        useCase === "coding" &&
        spend > 100
    ) {

        recommendation.reason =
            "For coding-heavy workflows, Cursor + Claude may offer better value than high-tier ChatGPT plans.";
    }

    // Research/Writing teams
    if (
        (useCase === "writing" ||
            useCase === "research") &&
        spend > 150
    ) {

        recommendation.reason =
            "Claude Team may provide comparable writing and research quality at lower operational cost.";
    }
}