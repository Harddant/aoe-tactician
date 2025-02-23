import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {db as prisma} from "../../db"
import {Unit} from "@prisma/client";

export const unitRouter = createTRPCRouter({
    // Create a new Unit
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string(),
                icon: z.string(),
                train_food: z.number(),
                train_wood: z.number(),
                train_gold: z.number(),
                train_time: z.number(),
                upgrade_food: z.number(),
                upgrade_wood: z.number(),
                upgrade_gold: z.number(),
                upgrade_time: z.number(),
                hp: z.number(),
                melee_attack: z.number(),
                pierce_attack: z.number(),
                reload_time: z.number(),
                armour: z.number(),
                pierce: z.number(),
                speed: z.number(),
                line_of_sight: z.number(),
                unit_type_id: z.number(),
                age_id: z.number(),
                parent_unit_id: z.number().optional(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.unit.create({
                data: input,
            });
        }),

    // Get a Unit by ID
    getById: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .query(async ({ input }) => {
            const unit = await prisma.unit.findUnique({
                where: { id: input.id },
                include: {
                    unit_type: true,
                    age: true,
                    parent_unit: true,
                    child_units: true,
                    unique_unit: true,
                    composition_unit: true,
                    effective_unit_ones: true,
                    effective_unit_twos: true,
                    synergy_unit_ones: true,
                    synergy_unit_twos: true,
                    counter_unit_ones: true,
                    counter_unit_twos: true,
                },
            });
            if (!unit) {
                throw new Error(`Unit with ID ${input.id} not found`);
            }
            return unit;
        }),

    // Get all Units
    getAll: publicProcedure.query(async () => {
        return prisma.unit.findMany();
    }),

    // Update a Unit by ID
    update: publicProcedure
        .input(
            z.object({
                id: z.number(),
                name: z.string().optional(),
                description: z.string().optional(),
                icon: z.string().optional(),
                train_food: z.number().optional(),
                train_wood: z.number().optional(),
                train_gold: z.number().optional(),
                train_time: z.number().optional(),
                upgrade_food: z.number().optional(),
                upgrade_wood: z.number().optional(),
                upgrade_gold: z.number().optional(),
                upgrade_time: z.number().optional(),
                hp: z.number().optional(),
                melee_attack: z.number().optional(),
                pierce_attack: z.number().optional(),
                reload_time: z.number().optional(),
                armour: z.number().optional(),
                pierce: z.number().optional(),
                speed: z.number().optional(),
                line_of_sight: z.number().optional(),
                unit_type_id: z.number().optional(),
                age_id: z.number().optional(),
                parent_unit_id: z.number().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const { id, ...data } = input;
            return prisma.unit.update({
                where: {id},
                data,
            });
        }),

    // Delete a Unit by ID
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.unit.delete({
                where: {id: input.id},
            });
        }),

    // Get Unit Counters by ID
    getCounters: publicProcedure
        .input(
            z.object({
                unitId: z.number(),
            })
        )
        .query(async ({ input }) => {
            const unit = await prisma.unit.findUnique({
                where: { id: input.unitId },
                include: {
                    counter_unit_ones: {
                        select: {
                            unit_two: true,
                        },
                    },
                    counter_unit_twos: {
                        select: {
                            unit_one: true,
                        },
                    },
                },
            });

            if (!unit) {
                throw new Error(`Civilization with ID ${input.unitId} not found`);
            }

            const counters = [
                ...unit.counter_unit_ones.map((relation) => relation.unit_two),
                ...unit.counter_unit_twos.map((relation) => relation.unit_one),
            ];

            return {
                counters,
            };
        }),

    // Get Unit Synergies by ID
    getSynergies: publicProcedure
        .input(
            z.object({
                unitId: z.number(),
            })
        )
        .query(async ({ input }) => {
            const unit = await prisma.unit.findUnique({
                where: { id: input.unitId },
                include: {
                    counter_unit_ones: {
                        select: {
                            unit_two: true,
                        },
                    },
                    counter_unit_twos: {
                        select: {
                            unit_one: true,
                        },
                    },
                },
            });

            if (!unit) {
                throw new Error(`Civilization with ID ${input.unitId} not found`);
            }

            const synergies = [
                ...unit.counter_unit_ones.map((relation) => relation.unit_two),
                ...unit.counter_unit_twos.map((relation) => relation.unit_one),
            ];

            return {
                synergies,
            };
        }),

    // Get Unit Effectives by ID
    getEffectives: publicProcedure
        .input(
            z.object({
                unitId: z.number(),
            })
        )
        .query(async ({ input }) => {
            const unit = await prisma.unit.findUnique({
                where: { id: input.unitId },
                include: {
                    counter_unit_ones: {
                        select: {
                            unit_two: true,
                        },
                    },
                    counter_unit_twos: {
                        select: {
                            unit_one: true,
                        },
                    },
                },
            });

            if (!unit) {
                throw new Error(`Civilization with ID ${input.unitId} not found`);
            }

            const effectives = [
                ...unit.counter_unit_ones.map((relation) => relation.unit_two),
                ...unit.counter_unit_twos.map((relation) => relation.unit_one),
            ];

            return {
                effectives,
            };
        }),

    // All Unit Details by ID
    getUnitDetails: publicProcedure
        .input(
            z.object({
                unitId: z.number(),
            })
        )
        .query(async ({ input }) => {
            const unit = await prisma.unit.findUnique({
                where: { id: input.unitId },
                include: {
                    effective_unit_ones: true,
                    effective_unit_twos: true,
                    synergy_unit_ones: true,
                    synergy_unit_twos: true,
                    counter_unit_ones: true,
                    counter_unit_twos: true,
                    parent_unit: true,
                    child_units: true,
                    composition_unit: true,
                    unit_type: true,
                    age: true,
                },
            });

            if (!unit) {
                throw new Error(`Unit with ID ${input.unitId} not found`);
            }

            return {
                ...unit,
                counters: [...unit.counter_unit_ones, ...unit.counter_unit_twos],
                effectives: [...unit.effective_unit_ones, ...unit.effective_unit_twos],
                synergies: [...unit.synergy_unit_ones, ...unit.synergy_unit_twos],
            };
        }),

    // Get a Unit by Parent ID
    getByParentId: publicProcedure
        .input(
            z.object({
                parentId: z.number(),
            })
        )
        .query(async ({ input }) => {
            const unit = await prisma.unit.findFirst({
                where: { parent_unit_id: input.parentId },
                include: {
                    parent_unit: true,
                    child_units: true,
                },
            });
            if (!unit) {
                throw new Error(`Unit with Parent ID ${input.parentId} not found`);
            }
            return unit;
        }),

    // Get the full hierarchy for a unit
    getHierarchy: publicProcedure
        .input(
            z.object({
                unitId: z.number(),
            })
        )
        .query(async ({ input }) => {
            const { unitId } = input;

            const currentUnit = await prisma.unit.findUnique({
                where: { id: unitId },
            });

            if (!currentUnit) {
                throw new Error(`Unit with ID ${unitId} not found`);
            }

            const hierarchy: Array<{ model: Unit; isCurrent: boolean }> = [];
            let unit: Unit|null = currentUnit;

            while (unit) {
                hierarchy.unshift({ model: unit, isCurrent: unit.id === unitId });
                if (!unit.parent_unit_id) break;

                unit = await prisma.unit.findUnique({
                    where: { id: unit.parent_unit_id },
                });
            }

            unit = currentUnit;
            while (unit) {
                const childUnit: Unit|null = await prisma.unit.findFirst({
                    where: { parent_unit_id: unit.id },
                });

                if (!childUnit) break;

                hierarchy.push({ model: childUnit, isCurrent: childUnit.id === unitId });
                unit = childUnit;
            }

            return hierarchy;
        }),

    // All Unit Details by ID
    getByIdWithDetails: publicProcedure
        .input(
            z.object({
                unitId: z.number(),
            })
        )
        .query(async ({ input }) => {
            const unit = await prisma.unit.findUnique({
                where: { id: input.unitId },
                include: {
                    unit_type: true,
                    age: true,
                    parent_unit: true,
                    child_units: true,
                    unique_unit: true,
                    composition_unit: true,
                    effective_unit_ones: {
                        include: {
                            unit_one: true,
                        },
                    },
                    effective_unit_twos: {
                        include: {
                            unit_two: true,
                        },
                    },
                    synergy_unit_ones: {
                        include: {
                            unit_one: true,
                        },
                    },
                    synergy_unit_twos: {
                        include: {
                            unit_two: true,
                        },
                    },
                    counter_unit_ones: {
                        include: {
                            unit_one: true,
                        },
                    },
                    counter_unit_twos: {
                        include: {
                            unit_two: true,
                        },
                    },
                },
            });

            if (!unit) {
                throw new Error(`Unit with ID ${input.unitId} not found`);
            }

            // Optional: Format or aggregate data as needed
            return {
                ...unit,
                effectives: [
                    ...unit.effective_unit_ones.map((eu) => ({
                        type: "effective_one",
                        ...eu,
                    })),
                    ...unit.effective_unit_twos.map((eu) => ({
                        type: "effective_two",
                        ...eu,
                    })),
                ],
                synergies: [
                    ...unit.synergy_unit_ones.map((su) => ({
                        type: "synergy_one",
                        ...su,
                    })),
                    ...unit.synergy_unit_twos.map((su) => ({
                        type: "synergy_two",
                        ...su,
                    })),
                ],
                counters: [
                    ...unit.counter_unit_ones.map((cu) => ({
                        type: "counter_one",
                        ...cu,
                    })),
                    ...unit.counter_unit_twos.map((cu) => ({
                        type: "counter_two",
                        ...cu,
                    })),
                ],
            };
        }),
});
