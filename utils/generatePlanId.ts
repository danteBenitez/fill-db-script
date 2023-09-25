import exp from "constants";
import PLANS from "../data/plan";
import { LEVEL_TO_CODE } from "./LEVEL_TO_CODE";
import { Level } from "./dni";
import { randomElement } from "./randomElement";

export function generatePlanId(level: Level): string {
  const randomId = randomElement(
    PLANS.map((p) => p.id).filter(
      (p) => {
          const prefixedCode = "Fsa23" + LEVEL_TO_CODE[level.toUpperCase() as keyof typeof LEVEL_TO_CODE];
          return p.toString().startsWith(prefixedCode.toString());
      }
    )
  );
  console.log(randomId);
  return randomId;
}
