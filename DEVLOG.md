## Day 1 — 2026-05-07

**Hours worked:** 2-3

**What I did:**
- Set up React project using Vite
- Initialized Git and connected to GitHub
- Created basic folder structure
- Built landing page
- Built audit form UI
- Implemented routing

**What I learned:**
- How React Router works
- Difference between navigate() and Link
- Importance of structuring project early

**Blockers / challenges:**
- What are the many use cases of useNavigate()
- Faced issue with index.css import
- Understood how Vite handles file imports

**Plan for tomorrow:**
- Add state to form inputs
- Design data structure for audit logic

# DEVLOG — Day 2 (Form State + Logic Foundation)

## What I Worked On

Today I focused on building the core form architecture for the AI Spend Audit tool. The main goal was to move from static UI into dynamic and scalable React state management.

## Completed

* Created a dedicated `Form` component structure
* Separated page-level and component-level responsibilities
* Built dynamic form state using `useState`
* Implemented nested state structure for tools array
* Added support for dynamically adding/removing tool rows
* Created reusable `ToolRow` component
* Implemented controlled inputs using `value` and `onChange`
* Added dynamic update handlers for nested array objects
* Connected state flow between parent (`Form`) and child (`ToolRow`) components
* Explored localStorage persistence strategy for future audit history

## Key Learnings

* Understood how React controlled components work
* Learned how data flows from parent → child through props
* Learned how `.map()` passes dynamic indexes into reusable components
* Understood updating nested arrays immutably in React
* Learned the difference between:

  * page components
  * reusable UI components
  * state initialization vs state updates
* Improved understanding of dynamic object keys using `[field]: value`

## Challenges Faced

* Initially struggled with understanding how nested state updates work
* Confused state updates with creation of new array items
* Needed clarity on how input values are synced with React state

## Fixes / Improvements

* Refactored form logic into smaller reusable components
* Corrected tool update logic to modify existing rows instead of appending duplicates
* Cleaned project structure for better scalability

## Current Project Structure

```bash
src/
  pages/
    AuditForm.jsx

  components/
    Form/
      Form.jsx
      ToolRow.jsx
```

## Next Steps (Day 3)

* Add validation
* Build audit calculation logic
* Create result/recommendation UI
* Add audit history rendering from localStorage
* Improve responsive styling and UX

## Day 3 — 2026-05-08 (Day)

**Hours worked:** 5

**What I did:**  
- Continued building the AI Spend Audit project frontend in React  
- Worked on dynamic form state for adding multiple AI tools  
- Created reusable `ToolRow` component for each tool entry  
- Implemented controlled inputs using `value` and `onChange`  
- Learned how `.map()` passes props like `tool` and `index` into child components  
- Understood how `select` elements work in React and how state controls UI  
- Connected input updates to parent state using `updateTool()`  
- Cleaned up form structure and improved readability of component code  

**What I learned:**  
- React forms are controlled through state, not directly through the DOM  
- `value` displays state inside an input while `onChange` updates the state  
- Each component instance created through `.map()` receives its own props  
- State is the single source of truth in React applications  
- Dynamic forms become much easier when state shape is designed properly  

**Blockers / what I'm stuck on:**  
- Still need to improve confidence with deeply nested state updates  
- Need to plan localStorage persistence for form data  
- Unsure about best structure for audit engine logic later in the project  

**Plan for tomorrow:**  
- Add “Add Tool” and “Remove Tool” functionality polish  
- Persist form state across reloads using localStorage  
- Start designing audit calculation logic and recommendation rules  
- Improve styling and responsive layout for the form page

## Day 4 — 2026-05-9

**Hours worked:** 5

**What I did:**
Built the core form flow for the AI Spend Audit product. Added dynamic tool rows where users can add or remove AI tools from their stack. Implemented controlled inputs for team size, use case, plan, monthly spend, and seats. Added localStorage persistence so unfinished form state survives page refreshes.

Started building the audit engine by creating a centralized `pricingData.js` file containing pricing information for supported AI tools and plans. Created the first version of `auditEngine.js` to generate recommendations and savings calculations based on user inputs. Added initial optimization rules for ChatGPT plans based on seat count and cost efficiency.

Also restructured submit flow to separate temporary form drafts (`auditForm`) from submitted audits (`auditHistory`) to better model real product behavior.

**What I learned:**
I understood the difference between temporary autosave state and persisted historical records, and why production apps often separate those concerns. I also learned how to structure recommendation engines using default result objects that get modified by matching business rules.

Another useful insight was distinguishing between company-wide `teamSize` and per-tool `seats`, which affects how optimization logic should work.

**Blockers / what I'm stuck on:**
Still refining how recommendations should scale across multiple AI vendors without creating repetitive hardcoded conditions. Need to improve the audit engine architecture so adding new pricing rules becomes cleaner over time.

**Plan for tomorrow:**
Finish the first working version of the audit engine with recommendations for multiple AI tools. Build the audit results page showing monthly and annual savings, recommendation reasoning, and per-tool breakdowns. Start integrating React Router navigation between form and results pages.

evlog — Day 3: Audit Engine Refactor + Test Coverage
What I Built

Today I focused on improving the core audit engine logic and making the recommendation system more scalable and believable.

Audit Engine Improvements
Refactored optimization logic into reusable helper functions
Introduced modular audit rule architecture using:
shared.js
chatgptRules.js
Added more nuanced recommendation reasoning instead of simple downgrade suggestions
Improved handling for:
small teams
enterprise overprovisioning
overlapping AI coding tools
cross-tool optimization suggestions
New Tool Coverage

Expanded audit support and optimization logic for:

ChatGPT
Cursor
Copilot
Claude
Gemini
Windsurf
Recommendation Quality Improvements

Instead of only reducing plans, the engine now:

suggests alternative tools where appropriate
provides workflow-aware reasoning
avoids unrealistic savings claims
prevents negative savings calculations
Results & Stability
Added defensive checks for missing pricing data
Improved results reliability for edge cases
Ensured savings calculations remain valid
Testing Setup

Set up automated testing using Vitest.

Added Test Coverage For:
Enterprise ChatGPT downgrade for small teams
Negative savings prevention
Annual savings calculation
Copilot Individual recommendation for solo developers
Keeping already-optimal plans unchanged
Why This Matters

This significantly improves confidence while refactoring logic and prevents accidental regressions as the audit engine grows.

Key Learnings
Object destructuring makes configuration-heavy functions cleaner and easier to scale
Modular rule-based architecture is much easier to maintain than one large audit file
Automated tests are extremely useful for validating business logic quickly during refactors



# Devlog Day 5 & 6 — Supabase Integration + Shareable Audit Results
## What I Built Today

Today I transitioned the project from a frontend-only React application into a more complete full-stack SaaS-style product.

The focus areas were:

* Supabase integration
* cloud persistence
* shareable audit URLs
* dynamic result fetching
* audit history
* architecture cleanup

---

# Supabase Integration

Integrated Supabase as the backend database for storing completed audits.

Created:

```js
saveAudit(auditResults)
```

which:

* receives calculated audit results
* inserts audit data into the `audits` table
* returns inserted database row data

## Stored Data

Each audit now stores:


{
   team_size,
   use_case,
   tools,
   recommendations,
   total_monthly_savings,
   total_annual_savings
}


## Key Improvement

Previously the app only generated temporary results.

Now audits persist permanently in the database.

---

# Submission Flow Refactor

Refactored the form submission flow into a cleaner production-style architecture.

## Previous Flow


Submit Form
   ↓
runAudit()
   ↓
Navigate to results


## New Flow


Submit Form
   ↓
runAudit()
   ↓
saveAudit()
   ↓
Supabase stores audit
   ↓
Navigate to shareable URL


## Changes Made

* Converted `handleSubmit` into async function
* Used `await saveAudit(auditResults)`
* Removed temporary test save button
* Replaced hardcoded save values with real audit engine output

---

# Shareable Audit URLs

Implemented dynamic shareable result URLs.

## New Route
/results/:id
Each saved audit now receives a unique database-generated ID.
Example:
/results/abc123

This allows audits to:

* survive page refreshes
* be shared with others
* behave like real SaaS reports
---

# Dynamic Result Fetching

Refactored the results page to fetch audits directly from Supabase.

## Previous Architecture

Used:
useLocation().state
which only worked immediately after navigation.

## New Architecture
Used:
useParams()
plus Supabase fetching:
.from("audits")
.select("*")
.eq("id", id)
.single()

This fetches the correct audit using the URL parameter.

## Key Learning

Understood how:

* dynamic routing
* database querying
* URL parameters
* async fetching

work together in full-stack applications.

---

# Results Page Refactor

Merged the temporary Results page and SharedResults page into a single clean architecture.

Updated the page to:

* fetch audits from database
* render recommendation cards dynamically
* display monthly and annual savings
* support direct page refreshes safely

Removed dependency on temporary navigation state.

---

# Local Audit History

Built a local audit history system using LocalStorage.

## 
createdAt: new Date().toISOString()
for timestamp tracking.

## History Page Displays

* audit date
* team size
* use case
* monthly savings
* annual savings
* recommendation count

## Bug Fix

Handled invalid date issues caused by older LocalStorage records that were missing timestamps.

---

# Architecture Improvements

Today’s work significantly improved overall project architecture.

## Current Flow

User Input
   ↓
Controlled Form
   ↓
runAudit()
   ↓
Recommendation Engine
   ↓
saveAudit()
   ↓
Supabase Database
   ↓
/results/:id
   ↓
ResultsPage Fetch
   ↓
Recommendation Rendering

---

# Technical Concepts Practiced

## React

* useEffect
* async functions
* state-driven rendering
* reusable components
* conditional rendering

## React Router

* dynamic routes
* URL params
* navigation flows

## Supabase

* inserts
* fetching records
* query chaining
* async database operations

## Persistence

* LocalStorage
* cloud persistence
* shareable state

## Architecture

* separation of business logic and persistence
* reusable audit engine
* production-style data flow

---

# Biggest Milestone Today

The project evolved from:
Frontend React prototype

into:
full-stack SaaS-style application

with:

* persistent backend storage
* dynamic shareable URLs
* database-powered result pages
* scalable architecture

---

# Next Planned Steps

* Email capture
* UI polish
* Deployment
* Mobile responsiveness
* Final production cleanup

# CredEx / SpendItWise — Development Log (Day 6)
**Date:** 12 May 2026
## Overview

Day 6 focused on transforming the project from a frontend prototype into a full-stack SaaS-style application by integrating backend services, persistent storage, and AI-powered functionality.

---

## Work Completed

### 1. Supabase Backend Integration

* Integrated Supabase into the application architecture.
* Configured database connectivity and project setup.
* Implemented audit data storage functionality.
* Added support for fetching stored audits from the database.
* Built shareable audit URL functionality.

### 2. Database Persistence

* Transitioned from temporary/local-only storage to persistent cloud storage.
* Implemented audit saving and retrieval workflows.
* Added lead/email capture and storage support.

### 3. Supabase Edge Functions

* Began backend/serverless implementation using Edge Functions.
* Created and deployed AI summary endpoint structure.
* Configured request handling and API flow.
* Worked with environment variables and secure API key handling.

### 4. AI Summary Feature

* Started implementation of AI-generated audit summaries using OpenAI APIs.
* Connected frontend requests to Supabase Edge Functions.
* Structured audit payloads for AI processing.
* Implemented initial response rendering pipeline.

### 5. Debugging & Issue Resolution

* Investigated and debugged:

  * CORS policy errors
  * 500 Internal Server errors
  * Authorization/JWT configuration issues
  * Supabase deployment inconsistencies
* Tested API requests using PowerShell and browser debugging tools.

### 6. Frontend Improvements

* Improved async data handling within React components.
* Refined audit result flow and state management.
* Enhanced integration between frontend and backend operations.

---

## Technical Concepts Explored

* Supabase database integration
* Serverless architecture with Edge Functions
* API request/response lifecycle
* CORS handling
* Secure environment variable management
* OpenAI API integration
* Persistent cloud storage workflows

---

## Current Project Status

### Completed Features

* Multi-step audit form
* Savings calculation engine
* Results dashboard
* localStorage persistence
* Supabase database integration
* Shareable audit links
* Email/lead capture system

### Features In Progress

* AI summary reliability and stability
* UI/UX polish
* Error handling improvements

---

## Key Outcome

The project has evolved from a frontend-only assignment into a functional full-stack web application with:

* cloud persistence,
* backend logic,
* shareable reports,
* and AI-assisted insights.

This was one of the most technically intensive development sessions so far due to backend integration and debugging work.

## Day 7 — 2026-05-13

**Hours worked:** 8

**What I did:**  
Focused on finalizing the project for submission readiness. Improved overall project structure and completed multiple engineering/documentation requirements. Added and verified automated audit engine tests, configured GitHub Actions CI workflow to run linting and tests automatically on every push, and fixed ESLint issues related to React hook rules.  

Worked on polishing repository documentation by creating and expanding README.md, ARCHITECTURE.md, PRICING_DATA.md, and PROMPTS.md. Added screenshots and improved project presentation for GitHub review.  

Also reviewed the overall audit flow end-to-end including AI summary generation, Supabase integration, transactional email flow, shareable URLs, and localStorage persistence to ensure the core MVP features were stable.

**What I learned:**  
Learned more about GitHub Actions workflow setup, automated CI pipelines, and how linting rules can impact deployment readiness even when the application works correctly locally. Also improved my understanding of separating deterministic business logic from AI-generated content for better reliability and explainability.

**Blockers / what I'm stuck on:**  
The biggest challenge today was handling ESLint CI failures related to React hook rules and ensuring the GitHub workflow passed successfully. I also realized documentation quality takes significantly more effort than expected when preparing a project for external review.
