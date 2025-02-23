import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {db as prisma} from "../../db"

export const uniqueBuildingRouter = createTRPCRouter({
    // Create a new UniqueBuilding
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string(),
                civilization_id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.uniqueBuilding.create({
                data: {
                    name: input.name,
                    description: input.description,
                    civilization_id: input.civilization_id,
                },
            });
        }),

    // Get an UniqueBuilding by ID, including its relationships
    getById: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .query(async ({ input }) => {
            const uniqueBuilding = await prisma.uniqueBuilding.findUnique({
                where: { id: input.id },
                include: {
                    civilization: true,
                },
            });
            if (!uniqueBuilding) {
                throw new Error(`UniqueBuilding with ID ${input.id} not found`);
            }
            return uniqueBuilding;
        }),

    // Get all UniqueBuildings
    getAll: publicProcedure.query(async () => {
        return prisma.uniqueBuilding.findMany({
            include: {
                civilization: true,
            },
        });
    }),

    // Update an UniqueBuilding by ID
    update: publicProcedure
        .input(
            z.object({
                id: z.number(),
                name: z.string().optional(),
                description: z.string().optional(),
                civilization_id: z.number().optional(),
                created_at: z.string().optional(),
                updated_at: z.string().optional(),
                deleted_at: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const { id } = input;
            return prisma.uniqueBuilding.update({
                where: { id },
                data: {
                    name: input.name,
                    civilization_id: input.civilization_id,
                    description: input.description,
                    created_at: input.created_at ? new Date(input.created_at) : undefined,
                    updated_at: input.updated_at ? new Date(input.updated_at) : undefined,
                    deleted_at: input.deleted_at ? new Date(input.deleted_at) : undefined,
                },
            });
        }),

    // Delete an UniqueBuilding by ID
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.uniqueBuilding.delete({
                where: {id: input.id},
            });
        }),
});
