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
