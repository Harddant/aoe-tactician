import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {db as prisma} from "../../db";

export const teamBonusRouter = createTRPCRouter({
    // Create a new TeamBonus
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string(),
                civilization_id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.teamBonus.create({
                data: {
                    name: input.name,
                    description: input.description,
                    civilization_id: input.civilization_id,
                },
            });
        }),

    // Get a TeamBonus by ID
    getById: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .query(async ({ input }) => {
            const teamBonus = await prisma.teamBonus.findUnique({
                where: { id: input.id },
                include: {
                    civilization: true,
                }
            });
            if (!teamBonus) {
                throw new Error(`TeamBonus with ID ${input.id} not found`);
            }
            return teamBonus;
        }),

    // Get all TeamBonuses
    getAll: publicProcedure.query(async () => {
        return prisma.teamBonus.findMany();
    }),

    // Update a TeamBonus by ID
    update: publicProcedure
        .input(
            z.object({
                id: z.number(),
                description: z.string().optional(),
                civilization_id: z.number().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const { id, ...data } = input;
            return prisma.teamBonus.update({
                where: {id},
                data,
            });
        }),

    // Delete a TeamBonus by ID
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.teamBonus.delete({
                where: {id: input.id},
            });
        }),
});
