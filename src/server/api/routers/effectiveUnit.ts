import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {db as prisma} from "../../db"

export const ageRouter = createTRPCRouter({
    // Create a new Age
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                icon: z.string().optional(),
                parent_age_id: z.number().optional(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.age.create({
                data: {
                    name: input.name,
                    parent_age_id: input.parent_age_id,
                    icon: '',
                },
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
                created_at: z.string().optional(),
                updated_at: z.string().optional(),
                deleted_at: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const { id, icon, ...data } = input;
            return prisma.age.update({
                where: { id },
                data: {
                    name: input.name,
                    parent_age_id: input.parent_age_id,
                    icon: input.icon,
                    created_at: input.created_at ? new Date(input.created_at) : undefined,
                    updated_at: input.updated_at ? new Date(input.updated_at) : undefined,
                    deleted_at: input.deleted_at ? new Date(input.deleted_at) : undefined,
                },
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
