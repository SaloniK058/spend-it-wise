# Reflection

## 1. The hardest bug I hit this week, and how I debugged it

The hardest issue I faced during this project was integrating the AI-generated summary feature with Supabase Edge Functions and handling API failures gracefully. Initially, the frontend request to the deployed edge function kept failing due to CORS issues and authorization mismatches. The browser showed preflight request failures, but the actual root cause was not obvious because the function worked differently in local testing versus deployment.

My first hypothesis was that the request body structure was incorrect. I verified the payload using browser network tools and console logging, but the payload was valid. Then I suspected the issue was related to missing headers or incorrect API key usage. I tested the endpoint directly using PowerShell and curl-style requests, which helped isolate the issue from the frontend.

Eventually, I discovered that the edge function deployment configuration and CORS handling needed adjustment. I updated the function headers and improved the frontend error handling logic. I also implemented a fallback templated summary system so the application would still provide value even if the AI API failed completely.

This bug taught me the importance of isolating systems during debugging and testing APIs independently from frontend behavior.

---

## 2. A decision I reversed mid-week, and what made me reverse it

One major decision I reversed was attempting to make the audit engine heavily AI-driven. Early in development, I experimented with having the AI model generate optimization recommendations directly based on user spending inputs. The idea initially seemed attractive because it reduced the amount of manual rule-writing required.

However, after testing multiple audit scenarios, I realized the recommendations were inconsistent and occasionally financially incorrect. The AI sometimes hallucinated pricing assumptions or suggested unrealistic migrations between tools. Since the assignment specifically emphasized defensible financial reasoning, this became a serious concern.

I decided to redesign the system so that all pricing calculations, optimization logic, and savings recommendations were deterministic and rule-based. The AI layer was reduced to only generating personalized natural-language summaries.

This reversal significantly improved the reliability and explainability of the product. It also made debugging much easier because the recommendation logic became predictable and traceable.

---

## 3. What I would build in week 2 if I had it

If I had an additional week, I would focus primarily on product depth, analytics, and distribution features instead of basic infrastructure.

The first major addition would be benchmark intelligence. I would build a system that compares a company’s AI spend against similar startups by team size and use case. Showing statements like “companies your size typically spend 30% less on AI coding tools” would make the audit significantly more compelling and actionable.

I would also add PDF exports for reports because many founders and managers would likely want to share audits internally with finance or engineering teams. Another important feature would be richer analytics dashboards for tracking optimization trends over time.

On the engineering side, I would move more logic server-side, introduce proper rate limiting, and improve monitoring for AI API failures and conversion funnels.

From a growth perspective, I would experiment with referral loops and embeddable widgets so creators and newsletters could distribute the tool organically.

---

## 4. How I used AI tools

I used ChatGPT extensively throughout the project for debugging support, architecture discussions, UI suggestions, documentation drafting, and brainstorming implementation approaches. I also used AI assistance to understand Supabase Edge Functions, email flows, and CI/CD setup faster.

However, I intentionally did not trust AI-generated financial recommendations or business logic calculations directly. Whenever AI generated implementation suggestions, I reviewed and adapted them instead of blindly copying outputs into the project.

One specific case where AI was wrong involved audit recommendation logic for small teams using enterprise plans. An early suggestion incorrectly generalized that enterprise plans were always wasteful for teams under a certain size, which ignored cases involving security, compliance, or centralized administration needs. I adjusted the logic to make recommendations more nuanced and context-aware instead of absolute.

The biggest lesson was that AI was extremely useful for acceleration and debugging, but still required human judgment for product decisions, reasoning quality, and correctness.

---

## 5. Self-rating

### Discipline — 8/10
I maintained consistent progress throughout the assignment period and continued iterating even when blocked by backend and deployment issues.

### Code Quality — 7/10
The codebase is modular and reasonably maintainable, though with more time I would improve abstraction consistency and add stronger typing across the application.

### Design Sense — 7/10
The product became significantly more polished over time, but I still see opportunities for stronger visual hierarchy and interaction design refinement.

### Problem-Solving — 8/10
I encountered several integration and deployment issues involving Supabase, edge functions, CORS, and CI pipelines, and was able to systematically debug and resolve them.

### Entrepreneurial Thinking — 8/10
I tried to approach the assignment as a real lead-generation product rather than only a technical exercise by thinking about virality, trust, onboarding flow, and realistic optimization recommendations.