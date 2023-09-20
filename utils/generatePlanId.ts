import exp from "constants";
import PLANS from "../data/plan";
import { LEVEL_TO_CODE } from "./LEVEL_TO_CODE";
import { Level } from "./dni";
import { randomElement } from "./randomElement";

export function generatePlanId(level: Level): number | undefined {
  const randomId = randomElement(
    PLANS.map((p) => p.id).filter(
      (p) => {
          const expected = LEVEL_TO_CODE[level.toUpperCase() as keyof typeof LEVEL_TO_CODE]
          return p.toString().startsWith(expected.toString());
      }
    )
  );
  return randomId;
}
