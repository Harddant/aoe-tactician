import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {db as prisma} from "../../db"

export const compositionUnitRouter = createTRPCRouter({
    // Create a new CompositionUnit
    create: publicProcedure
        .input(
            z.object({
                civilization_id: z.number(),
                unit_id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.compositionUnit.create({
                data: {
                    civilization_id: input.civilization_id,
                    unit_id: input.unit_id,
                },
            });
        }),

    // Get an CompositionUnit by ID, including its relationships
    getById: publicProcedure
        .input(
            z.object({
                civilization_id: z.number(),
                unit_id: z.number(),
            })
        )
        .query(async ({ input }) => {
            const compositionUnit = await prisma.compositionUnit.findUnique({
                where: {
                    civilization_id: input.civilization_id,
                    unit_id: input.unit_id
                },
                include: {
                    civilization: true,
                    unit: true,
                },
            });
            if (!compositionUnit) {
                throw new Error(`CompositionUnit with Civ ID ${input.civilization_id}, Unit ID ${input.unit_id} not found`);
            }
            return compositionUnit;
        }),

    // Get all CompositionUnits
    getAll: publicProcedure.query(async () => {
        return prisma.compositionUnit.findMany({
            include: {
                civilization: true,
                unit: true,
            },
        });
    }),

    // Delete an CompositionUnit by ID
    delete: publicProcedure
        .input(
            z.object({
                civilization_id: z.number(),
                unit_id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.compositionUnit.delete({
                where: {
                    civilization_id: input.civilization_id,
                    unit_id: input.unit_id
                },
            });
        }),
});
