import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {db as prisma} from "../../db"

export const unitTypeRouter = createTRPCRouter({
    // Create a new UnitType
    create: publicProcedure
        .input(
            z.object({
                type: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.unitType.create({
                data: input,
            });
        }),

    // Get an UnitType by ID, including its relationships
    getById: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .query(async ({ input }) => {
            const unitType = await prisma.unitType.findUnique({
                where: { id: input.id },
            });
            if (!unitType) {
                throw new Error(`UnitType with ID ${input.id} not found`);
            }
            return unitType;
        }),

    // Get all UnitTypes
    getAll: publicProcedure.query(async () => {
        return prisma.unitType.findMany();
    }),

    // Update a UnitType by ID
    update: publicProcedure
        .input(
            z.object({
                id: z.number(),
                type: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const { id, ...data } = input;
            return prisma.unitType.update({
                where: {id},
                data,
            });
        }),

    // Delete a UnitType by ID
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.unitType.delete({
                where: {id: input.id},
            });
        }),
});
