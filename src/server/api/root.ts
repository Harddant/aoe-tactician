import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { civilizationRouter } from "@/server/api/routers/civilization";
import {civilizationBonusRouter} from "@/server/api/routers/civilizationBonus";
import { unitRouter } from "@/server/api/routers/unit";
import { ageRouter } from "@/server/api/routers/age";
import { schemaRouter } from "@/server/api/routers/schema";
import { trainingBuildingRouter } from "@/server/api/routers/trainingBuilding";
import {unitTypeRouter} from "@/server/api/routers/unitType";
import {teamBonusRouter} from "@/server/api/routers/teamBonus";
import {uniqueBuildingRouter} from "@/server/api/routers/uniqueBuilding";
import {uniqueTechnologyRouter} from "@/server/api/routers/uniqueTechnology";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  civilization: civilizationRouter,
  civilizationBonus: civilizationBonusRouter,
  unit: unitRouter,
  age: ageRouter,
  schema: schemaRouter,
  teamBonus: teamBonusRouter,
  trainingBuilding: trainingBuildingRouter,
  uniqueBuilding: uniqueBuildingRouter,
  uniqueTechnology: uniqueTechnologyRouter,
  unitType: unitTypeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
