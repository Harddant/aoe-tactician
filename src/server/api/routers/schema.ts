import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {db as prisma} from "../../db"

export const schemaRouter = createTRPCRouter({
    getModelSchema: publicProcedure
        .input(z.object({ modelType: z.string() }))
        .query(async ({ input }) => {
            return prisma.$queryRawUnsafe<
                { Field: string; Type: string; Null: string }[]
            >(`DESCRIBE ${input.modelType.toLowerCase().substring(0, input.modelType.length - 1)};`);
        }),
});
