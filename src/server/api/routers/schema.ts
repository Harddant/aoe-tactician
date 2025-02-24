import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {db as prisma} from "../../db"

function singularize(word: string) {
    const endings = {
        ves: 'fe',
        ies: 'y',
        i: 'us',
        zes: 'ze',
        ses: 's',
        es: 'e',
        s: ''
    };
    return word.replace(
        new RegExp(`(${Object.keys(endings).join('|')})$`),
        r => endings[r]
    );
}

const dbTableName = (name: string) => {
    const singular = singularize(name);
    return (singular.charAt(0).toLowerCase() + singular.substring(1));
};

export const schemaRouter = createTRPCRouter({
    getModelSchema: publicProcedure
        .input(z.object({ modelType: z.string() }))
        .query(async ({ input }) => {
            return prisma.$queryRawUnsafe<
                { Field: string; Type: string; Null: string }[]
            >(`DESCRIBE ${dbTableName(input.modelType)};`);
        }),
});
