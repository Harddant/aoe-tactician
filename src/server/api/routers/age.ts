import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {db as prisma} from "../../db"

export const ageRouter = createTRPCRouter({
    // Create a new Age
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                icon: z.string(),
                parent_age_id: z.number().optional(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.age.create({
                data: input,
            });
        }),

    // Get an Age by ID, including its relationships
    getById: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .query(async ({ input }) => {
            const age = await prisma.age.findUnique({
                where: { id: input.id },
                include: {
                    parent_age: true,
                    child_ages: true,
                    child_units: true,
                },
            });
            if (!age) {
                throw new Error(`Age with ID ${input.id} not found`);
            }
            return age;
        }),

    // Get all Ages
    getAll: publicProcedure.query(async () => {
        return prisma.age.findMany({
            include: {
                child_ages: true,
            },
        });
    }),

    // Update an Age by ID
    update: publicProcedure
        .input(
            z.object({
                id: z.number(),
                name: z.string().optional(),
                icon: z.string().optional(),
                parent_age_id: z.number().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const { id, ...data } = input;
            return prisma.age.update({
                where: {id},
                data,
            });
        }),

    // Delete an Age by ID
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.age.delete({
                where: {id: input.id},
            });
        }),
});
