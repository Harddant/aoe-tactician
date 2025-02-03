import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { civilizationRouter } from "@/server/api/routers/civilization";
import { unitRouter } from "@/server/api/routers/unit";
import { ageRouter } from "@/server/api/routers/age";
import {schemaRouter} from "@/server/api/routers/schema";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  civilization: civilizationRouter,
  unit: unitRouter,
  age: ageRouter,
  schema: schemaRouter,
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
