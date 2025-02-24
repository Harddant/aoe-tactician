import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {db as prisma} from "../../db"

export const civilizationBonusRouter = createTRPCRouter({
    // Create a new CivilizationBonus
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string(),
                civilization_id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.civilizationBonus.create({
                data: {
                    name: input.name,
                    description: input.description,
                    civilization_id: input.civilization_id,
                }
            });
        }),

    // Get an CivilizationBonus by ID, including its relationships
    getById: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .query(async ({ input }) => {
            const civilizationBonus = await prisma.civilizationBonus.findUnique({
                where: { id: input.id },
                include: {
                    civilization: true,
                },
            });
            if (!civilizationBonus) {
                throw new Error(`CivilizationBonus with ID ${input.id} not found`);
            }
            return civilizationBonus;
        }),

    // Get all CivilizationBonuses
    getAll: publicProcedure.query(async () => {
        return prisma.civilizationBonus.findMany({
            include: {
                civilization: true,
            },
        });
    }),

    // Update an CivilizationBonus by ID
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
            return prisma.civilizationBonus.update({
                where: { id },
                data: {
                    name: input.name,
                    description: input.description,
                    civilization_id: input.civilization_id,
                    created_at: input.created_at ? new Date(input.created_at) : undefined,
                    updated_at: input.updated_at ? new Date(input.updated_at) : undefined,
                    deleted_at: input.deleted_at ? new Date(input.deleted_at) : undefined,
                },
            });
        }),

    // Delete an CivilizationBonus by ID
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.civilizationBonus.delete({
                where: {id: input.id},
            });
        }),
});
