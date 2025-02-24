import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {db as prisma} from "../../db"

export const trainingBuildingRouter = createTRPCRouter({
    // Create a new TrainingBuilding
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                icon: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.trainingBuilding.create({
                data: input,
            });
        }),

    // Get an TrainingBuilding by ID, including its relationships
    getById: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .query(async ({ input }) => {
            const trainingBuilding = await prisma.trainingBuilding.findUnique({
                where: { id: input.id },
            });
            if (!trainingBuilding) {
                throw new Error(`TrainingBuilding with ID ${input.id} not found`);
            }
            return trainingBuilding;
        }),

    // Get all TrainingBuildings
    getAll: publicProcedure.query(async () => {
        return prisma.trainingBuilding.findMany();
    }),

    // Update a TrainingBuilding by ID
    update: publicProcedure
        .input(
            z.object({
                id: z.number(),
                name: z.string().optional(),
                icon: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const { id, ...data } = input;
            return prisma.trainingBuilding.update({
                where: {id},
                data,
            });
        }),

    // Delete a TrainingBuilding by ID
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.trainingBuilding.delete({
                where: {id: input.id},
            });
        }),
});
