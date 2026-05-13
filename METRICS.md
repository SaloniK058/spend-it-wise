# METRICS.md

The North Star metric for SpendItWise is:

## North Star Metric

### Number of completed audits per week that generate actionable savings recommendations.

This metric matters because the product only creates value when users:
1. Complete the audit flow
2. Receive meaningful optimization insights
3. Discover enough savings potential to take action

Page views or signups alone are weak indicators because this is not a daily-use SaaS product. The real signal is whether users trust the audit enough to finish it and engage with the recommendations.

---

# Input Metrics

## 1. Audit Completion Rate

Percentage of users who start the form and successfully reach the results page.

Why it matters:
A low completion rate would indicate friction in the onboarding flow, confusing questions, or lack of perceived value.

Target:
> 60%+ completion rate

---

## 2. High-Savings Audit Rate

Percentage of audits showing greater than $500/month in potential savings.

Why it matters:
These users are the highest-intent leads for Credex consultations and potential infrastructure credit purchases.

Target:
> 15–20% of completed audits

---

## 3. Share Rate

Percentage of users who share or copy their public audit URL.

Why it matters:
The product’s growth loop depends heavily on virality through founders, developers, and engineering teams sharing results publicly.

Target:
> 10%+ share rate

---

# What I Would Instrument First

The first analytics events I would track are:

- Audit started
- Tool added
- Audit completed
- Share link copied
- Email submitted
- Consultation CTA clicked
- AI summary generated successfully
- AI summary fallback triggered

This would help identify:
- Dropoff points
- Which tools users audit most frequently
- Whether the AI summary improves engagement
- Which savings recommendations convert best

---

# Pivot Decision Metric

If fewer than 5% of completed audits result in either:
- a share action
- an email capture
- or a consultation click

after the first 500 completed audits, I would reconsider the product positioning.

That would suggest one of three problems:
1. The audit results are not compelling enough
2. The savings opportunities are too small
3. Users do not trust the recommendations

At that point, I would likely pivot toward:
- benchmark-based reporting
- team-wide AI spend analytics
- or API-integrated automated auditing instead of manual inputs

---

# Why These Metrics Matter

SpendItWise is fundamentally a lead-generation and trust-building product, not a traditional engagement product.

Success is less about daily active users and more about:
- how many users complete the audit,
- how convincing the results are,
- and whether the audit creates enough trust for users to share data or book a Credex consultation.