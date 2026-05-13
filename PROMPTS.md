# Prompts

This document contains the prompts used for AI-generated personalized audit summaries in SpendItWise.

---

# Goal

The AI summary feature generates a concise, personalized explanation of:
- the user’s current AI spending
- optimization opportunities
- estimated savings
- suggested next actions

The summary is intentionally supportive and practical rather than overly sales-focused.

---

# Primary Prompt

```txt
You are an AI infrastructure cost optimization assistant.

A startup team has completed an AI spend audit.

Generate a concise, personalized summary (around 100 words) explaining:

- their current spending situation
- where they may be overspending
- the biggest optimization opportunities
- estimated savings potential
- practical next steps

Keep the tone:
- professional
- helpful
- concise
- founder-friendly

Do not exaggerate savings.
Do not invent numbers.
Do not use marketing buzzwords.

Audit Data:
{{AUDIT_RESULT}}
```

---

# Example Input

```json
{
  "totalMonthlySpend": 1200,
  "totalMonthlySavings": 450,
  "tools": [
    {
      "tool": "ChatGPT",
      "plan": "Team",
      "currentSpend": 600,
      "recommendedSpend": 300
    }
  ]
}
```

---

# Example Output

```txt
Your team appears to be spending more than necessary on collaborative AI tooling, particularly within your ChatGPT Team setup. Based on your current usage and seat count, several workloads could likely operate effectively on lower-cost plans without significantly impacting productivity. Across your stack, the estimated optimization opportunity is approximately $450 per month, or $5,400 annually. Consolidating overlapping subscriptions and reevaluating enterprise-level plans for smaller teams may provide the largest savings. Overall, your stack is functional, but there are meaningful opportunities to improve cost efficiency while maintaining similar capabilities.
```

---

# Why I Designed The Prompt This Way

The prompt was intentionally designed to:
- avoid hallucinated savings claims
- keep recommendations financially grounded
- maintain a trustworthy tone
- produce summaries short enough for a results dashboard
- avoid sounding like generic AI-generated marketing copy

The instructions explicitly discourage:
- exaggerated language
- fake precision
- unsupported recommendations

This was important because the audit itself is based on deterministic rule logic rather than AI reasoning.

---

# Failure Handling

AI APIs can fail due to:
- rate limits
- network issues
- invalid API keys
- quota exhaustion

To ensure reliability:
- the application falls back to a templated summary
- the user still receives a complete audit experience

Fallback summaries include:
- estimated savings
- overall optimization status
- general next-step recommendations

---

# Prompt Iterations & Learnings

## Early Attempt

An earlier version asked the AI to:
- generate optimization recommendations
- compare tools
- estimate savings independently

This produced:
- inconsistent recommendations
- hallucinated pricing assumptions
- overly aggressive optimization advice

---

## Final Decision

The final architecture separates responsibilities:

### Rule Engine
Handles:
- pricing logic
- savings calculations
- optimization recommendations

### AI Layer
Handles:
- personalization
- readability
- concise summarization

This improved:
- reliability
- explainability
- consistency
- debugging

---

# Security Considerations

The prompt intentionally excludes:
- user email
- company name
- sensitive identifiers

Only audit-related numerical and tool data are sent to the AI provider.

---

# Future Improvements

Potential future prompt improvements:
- benchmark comparisons
- industry-specific recommendations
- tone customization
- multilingual summaries
- richer contextual explanations