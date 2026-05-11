import { describe, it, expect }
from "vitest";

import { runAudit }
from "../utils/auditEngine";

describe("runAudit", () => {

    it(
        "downgrades enterprise chatgpt for small teams",

        () => {

            const result =
                runAudit({

                    teamSize: "5",

                    useCase: "coding",

                    tools: [
                        {
                            name: "chatgpt",

                            plan: "enterprise",

                            monthlySpend: "300",

                            seats: "3"
                        }
                    ]
                });

            expect(

                result.recommendations[0]
                    .suggestedPlan

            ).toBe("team");
        }
    );

    it(
        "prevents negative savings",

        () => {

            const result =
                runAudit({

                    teamSize: "1",

                    useCase: "coding",

                    tools: [
                        {
                            name: "chatgpt",

                            plan: "plus",

                            monthlySpend: "20",

                            seats: "1"
                        }
                    ]
                });

            expect(

                result.recommendations[0]
                    .savings

            ).toBeGreaterThanOrEqual(0);
        }
    );

    it(
        "calculates annual savings correctly",

        () => {

            const result =
                runAudit({

                    teamSize: "5",

                    useCase: "coding",

                    tools: [
                        {
                            name: "chatgpt",

                            plan: "enterprise",

                            monthlySpend: "300",

                            seats: "3"
                        }
                    ]
                });

            expect(

                result.totalAnnualSavings

            ).toBe(

                result.totalMonthlySavings * 12
            );
        }
    );

    it(
   "recommends copilot individual for solo developer",

   () => {

      const result =
         runAudit({

            teamSize: "1",

            useCase: "coding",

            tools: [
               {
                  name: "copilot",

                  plan: "business",

                  monthlySpend: "40",

                  seats: "1"
               }
            ]
         });

      expect(

         result.recommendations[0]
            .suggestedPlan

      ).toBe("individual");
   }
);

it(
   "keeps optimal plans unchanged",

   () => {

      const result =
         runAudit({

            teamSize: "2",

            useCase: "coding",

            tools: [
               {
                  name: "chatgpt",

                  plan: "plus",

                  monthlySpend: "40",

                  seats: "2"
               }
            ]
         });

      expect(

         result.recommendations[0]
            .suggestedPlan

      ).toBe("plus");
   }
);

});