import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {db as prisma} from "../../db"

export const uniqueTechnologyRouter = createTRPCRouter({
    // Create a new UniqueTechnology
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string(),
                civilization_id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.uniqueTechnology.create({
                data: {
                    name: input.name,
                    description: input.description,
                    civilization_id: input.civilization_id,
                },
            });
        }),

    // Get an UniqueTechnology by ID, including its relationships
    getById: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .query(async ({ input }) => {
            const uniqueTechnology = await prisma.uniqueTechnology.findUnique({
                where: { id: input.id },
                include: {
                    civilization: true
                },
            });
            if (!uniqueTechnology) {
                throw new Error(`UniqueTechnology with ID ${input.id} not found`);
            }
            return uniqueTechnology;
        }),

    // Get all UniqueTechnologies
    getAll: publicProcedure.query(async () => {
        return prisma.uniqueTechnology.findMany({
            include: {
                civilization: true,
            },
        });
    }),

    // Update an UniqueTechnology by ID
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
            const { id} = input;
            return prisma.uniqueTechnology.update({
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

    // Delete an UniqueTechnology by ID
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.uniqueTechnology.delete({
                where: {id: input.id},
            });
        }),
});
