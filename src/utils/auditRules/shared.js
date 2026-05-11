export function applyOptimization({
    recommendation,
    tool,
    plan,
    seats,
    spend,
    pricingData,
    reason
}) {

    const toolPricing = pricingData?.[tool];

    if (!toolPricing) return;

    const newSpend =
        toolPricing.plans[plan] * seats;

    // prevent worse recommendation
    if (newSpend >= spend) return;

    recommendation.suggestedPlan = plan;

    recommendation.suggestedSpend = newSpend;

    recommendation.savings =
        spend - newSpend;

    recommendation.reason = reason;
}