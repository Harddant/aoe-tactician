import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {db as prisma} from "../../db";

export const civilizationRouter = createTRPCRouter({
    // Create a new Civilization
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                logo: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.civilization.create({
                data: input,
            });
        }),

    // Get a Civilization by ID
    getById: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .query(async ({ input }) => {
            const civilization = await prisma.civilization.findUnique({
                where: { id: input.id },
                include: {
                    unique_units: true,
                    unique_technologies: true,
                    unique_buildings: true,
                }
            });
            if (!civilization) {
                throw new Error(`Civilization with ID ${input.id} not found`);
            }
            return civilization;
        }),

    // Get all Civilizations
    getAll: publicProcedure.query(async () => {
        return prisma.civilization.findMany();
    }),

    // Update a Civilization by ID
    update: publicProcedure
        .input(
            z.object({
                id: z.number(),
                name: z.string().optional(),
                logo: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const { id, ...data } = input;
            return prisma.civilization.update({
                where: {id},
                data,
            });
        }),

    // Delete a Civilization by ID
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.civilization.delete({
                where: {id: input.id},
            });
        }),

    // Get Civilization Counters by ID
    getCounters: publicProcedure
        .input(
            z.object({
                civilizationId: z.number(),
            })
        )
        .query(async ({ input }) => {
            const civilization = await prisma.civilization.findUnique({
                where: { id: input.civilizationId },
                include: {
                    counter_civilization_ones: {
                        select: {
                            civilization_two: true,
                        },
                    },
                    counter_civilization_twos: {
                        select: {
                            civilization_one: true,
                        },
                    },
                },
            });

            if (!civilization) {
                throw new Error(`Civilization with ID ${input.civilizationId} not found`);
            }

            const counters = [
                ...civilization.counter_civilization_ones.map((relation) => relation.civilization_two),
                ...civilization.counter_civilization_twos.map((relation) => relation.civilization_one),
            ];

            return {
                counters,
            };
        }),

    // Get Civilization Synergies by ID
    getSynergies: publicProcedure
        .input(
            z.object({
                civilizationId: z.number(),
            })
        )
        .query(async ({ input }) => {
            const civilization = await prisma.civilization.findUnique({
                            where: { id: input.civilizationId },
                            include: {
                                counter_civilization_ones: {
                                    select: {
                            civilization_two: true,
                        },
                    },
                    counter_civilization_twos: {
                        select: {
                            civilization_one: true,
                        },
                    },
                },
            });

            if (!civilization) {
                throw new Error(`Civilization with ID ${input.civilizationId} not found`);
            }

            const synergies = [
                ...civilization.counter_civilization_ones.map((relation) => relation.civilization_two),
                ...civilization.counter_civilization_twos.map((relation) => relation.civilization_one),
            ];

            return {
                synergies,
            };
        }),

    // Get Civilization Effectives by ID
    getEffectives: publicProcedure
        .input(
            z.object({
                civilizationId: z.number(),
            })
        )
        .query(async ({ input }) => {
            const civilization = await prisma.civilization.findUnique({
                where: { id: input.civilizationId },
                include: {
                    counter_civilization_ones: {
                        select: {
                            civilization_two: true,
                        },
                    },
                    counter_civilization_twos: {
                        select: {
                            civilization_one: true,
                        },
                    },
                },
            });

            if (!civilization) {
                throw new Error(`Civilization with ID ${input.civilizationId} not found`);
            }

            const effectives = [
                ...civilization.counter_civilization_ones.map((relation) => relation.civilization_two),
                ...civilization.counter_civilization_twos.map((relation) => relation.civilization_one),
            ];

            return {
                effectives,
            };
        }),

    // All Civilization Details by ID
    getCivilizationDetails: publicProcedure
        .input(
            z.object({
                civilizationId: z.number(),
            })
        )
        .query(async ({ input }) => {
            const civilization = await prisma.civilization.findUnique({
                where: { id: input.civilizationId },
                include: {
                    counter_civilization_ones: true,
                    counter_civilization_twos: true,
                    effective_civilization_ones: true,
                    effective_civilization_twos: true,
                    synergy_civilization_ones: true,
                    synergy_civilization_twos: true,
                    unique_units: true,
                    unique_technologies: true,
                    unique_buildings: true,
                    team_bonuses: true,
                    civilization_bonuses: true,
                },
            });

            if (!civilization) {
                throw new Error(`Civilization with ID ${input.civilizationId} not found`);
            }

            return {
                ...civilization,
                counters: [...civilization.counter_civilization_ones, ...civilization.counter_civilization_twos],
                effectives: [...civilization.effective_civilization_ones, ...civilization.effective_civilization_twos],
                synergies: [...civilization.synergy_civilization_ones, ...civilization.synergy_civilization_twos],
            };
        }),
});
