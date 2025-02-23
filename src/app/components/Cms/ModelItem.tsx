"use client";

import React, {useState} from "react";
import {api} from "@/trpc/react";
import Image from "next/image";

type ModelTableProps = {
    modelType: string;
    currentModelId: number | null;
    setCurrentModelId: (newModel: number | null) => void;
    setNewModel: (newModel: boolean) => void;
};

type ModelSchema = {
    Field: string;
    Type: string;
    Null: string;
};

export const ModelItem = ({ modelType, currentModelId, setCurrentModelId, setNewModel }: ModelTableProps) => {
    const [formValues, setFormValues] = useState<any>({});
    const [selectedImages, setSelectedImages] = useState<Record<string, File>>({});
    const [imagePreviews, setImagePreviews] = useState<Record<string, string>>({});

    const modelSchema = api.schema.getModelSchema.useQuery({ modelType: modelType });

    const queryResult = currentModelId ? (() => {
        switch (modelType.toLowerCase()) {
            case "civilizations":
                return api.civilization.getById.useQuery({ id: currentModelId });
            case "units":
                return api.unit.getById.useQuery({ id: currentModelId });
            case "ages":
                return api.age.getById.useQuery({ id: currentModelId });
            case "unittype":
                return api.unitType.getById.useQuery({ id: currentModelId });
            case "trainingbuilding":
                return api.trainingBuilding.getById.useQuery({ id: currentModelId });
            default:
                return null;
        }
    })() : null;

    const unitTypesQuery = api.unitType?.getAll.useQuery();
    const civilizationsQuery = api.civilization?.getAll.useQuery();
    const agesQuery = api.age?.getAll.useQuery();
    const unitQuery = api.unit?.getAll.useQuery();
    const trainingBuildingQuery = api.trainingBuilding?.getAll.useQuery();

    const civilizationCreateMutation = api.civilization.create.useMutation();
    const unitCreateMutation = api.unit.create.useMutation();
    const ageCreateMutation = api.age.create.useMutation();
    const unitTypeCreateMutation = api.unitType.create.useMutation();
    const trainingBuildingCreateMutation = api.trainingBuilding.create.useMutation();

    const civilizationMutation = api.civilization.update.useMutation();
    const unitMutation = api.unit.update.useMutation();
    const ageMutation = api.age.update.useMutation();
    const unitTypeMutation = api.unitType.update.useMutation();
    const trainingBuildingMutation = api.trainingBuilding.update.useMutation();

    const civilizationDeleteMutation = api.civilization.delete.useMutation();
    const unitDeleteMutation = api.unit.delete.useMutation();
    const ageDeleteMutation = api.age.delete.useMutation();
    const unitTypeDeleteMutation = api.unitType.delete.useMutation();
    const trainingBuildingDeleteMutation = api.civilization.delete.useMutation();


    const getRelationshipData = (fieldName: string) => {
        const relationshipMap: Record<string, any> = {
            'unit_type_id': unitTypesQuery.data,
            'civilization_id': civilizationsQuery.data,
            'age_id': agesQuery.data,
            'training_building_id': trainingBuildingQuery.data,
            'parent_age_id': agesQuery.data,
            'parent_unit_id': unitQuery.data,
        };
        return relationshipMap[fieldName] || [];
    };

    const currentModel = queryResult?.data;

    const fieldTypes: [string, string][] = [
        ["varchar", "text"],
        ["int", "number"],
        ["datetime", "date"],
    ];

    const overrideTypes: [string, string][] = [
        ["id", "null"],
        ["icon", "image"],
        ["logo", "image"],
    ];

    const formatDate = (dateData: string) => {
        if (dateData == null) return null;
        const date = new Date(dateData);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isRelationshipField = name.endsWith("_id");
        const parsedValue = isRelationshipField ? Number(value) : value;

        setFormValues({
            ...formValues,
            [name]: parsedValue,
        });
    };

    const getInputType = (field: string, dbType: string): string => {
        for (const [fieldName, inputType] of overrideTypes) {
            if (field.toLowerCase() === fieldName.toLowerCase()) {
                return inputType;
            }
        }

        for (const [dbMatch, inputType] of fieldTypes) {
            if (dbType.toLowerCase().includes(dbMatch)) {
                return inputType;
            }
        }

        return "text";
    };

    const handleSave = async () => {
        if (!currentModelId) return;

        const updateData = { id: currentModelId, ...formValues };

        for (const [fieldName, file] of Object.entries(selectedImages)) {
            if (file instanceof File) {
                updateData[fieldName] = await handleImageUpload(file, currentModelId, modelType);
            }
        }

        try {
            switch (modelType.toLowerCase()) {
                case "civilizations":
                    civilizationMutation.mutate(updateData);
                    break;
                case "units":
                    unitMutation.mutate(updateData);
                    break;
                case "ages":
                    ageMutation.mutate(updateData);
                    break;
                case "unit types":
                    unitTypeMutation.mutate(updateData);
                    break;
                case "training buildings":
                    trainingBuildingMutation.mutate(updateData);
                    break;
                default:
                    throw new Error("Unsupported model type");
            }
            setFormValues({});
            setNewModel(false);
            setCurrentModelId(null);
            alert("Model updated successfully!");
        } catch (error) {
            console.error("Failed to update model:", error);
            alert("Failed to update model.");
        }
    };

    const handleCreate = async () => {
        try {
            const createData = { ...formValues };
            for (const fieldName of Object.keys(selectedImages)) {
                delete createData[fieldName];
            }

            let newRecord;
            switch (modelType.toLowerCase()) {
                case "civilizations":
                    newRecord = await civilizationCreateMutation.mutateAsync(createData);
                    break;
                case "units":
                    newRecord = await unitCreateMutation.mutateAsync(createData);
                    break;
                case "ages":
                    newRecord = await ageCreateMutation.mutateAsync(createData);
                    break;
                case "unit types":
                    newRecord = await unitTypeCreateMutation.mutateAsync(createData);
                    break;
                case "training buildings":
                    newRecord = await trainingBuildingCreateMutation.mutateAsync(createData);
                    break;
                default:
                    throw new Error("Unsupported model type");
            }

            if (Object.keys(selectedImages).length > 0) {
                const updateData: any = { id: newRecord.id };

                for (const [fieldName, file] of Object.entries(selectedImages)) {
                    if (file instanceof File) {
                        updateData[fieldName] = await handleImageUpload(file, newRecord.id, modelType);
                    }
                }

                switch (modelType.toLowerCase()) {
                    case "civilizations":
                        await civilizationMutation.mutateAsync(updateData);
                        break;
                    case "units":
                        await unitMutation.mutateAsync(updateData);
                        break;
                    case "ages":
                        await ageMutation.mutateAsync(updateData);
                        break;
                    case "unit types":
                        await unitTypeMutation.mutateAsync(updateData);
                        break;
                    case "training buildings":
                        await trainingBuildingMutation.mutateAsync(updateData);
                        break;
                }
            }

            setFormValues({});
            setNewModel(false);
            setCurrentModelId(null);
            alert("Model created successfully!");
        } catch (error) {
            console.error("Failed to create model:", error);
            alert("Failed to create model.");
        }
    };

    const handleDelete = () => {
        if (!currentModelId) return;
        try {
            switch (modelType.toLowerCase()) {
                case "civilizations":
                    civilizationDeleteMutation.mutate({id: currentModelId});
                    break;
                case "units":
                    unitDeleteMutation.mutate({id: currentModelId});
                    break;
                case "ages":
                    ageDeleteMutation.mutate({id: currentModelId});
                    break;
                case "unit types":
                    unitTypeDeleteMutation.mutate({id: currentModelId});
                    break;
                case "training buildings":
                    trainingBuildingDeleteMutation.mutate({id: currentModelId});
                    break;
                default:
                    throw new Error("Unsupported model type");
            }
            setFormValues({});
            setNewModel(false);
            setCurrentModelId(null);
            alert("Model deleted successfully!");
        } catch (error) {
            console.error("Failed to delete model:", error);
            alert("Failed to delete model.");
        }
    }

    const handleImageUpload = async (file: File, modelId: number, modelType: string): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('modelType', modelType.toLowerCase());
        formData.append('modelId', modelId.toString());

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data = await response.json();
        console.log("Path: ", data);
        return data.path;
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImages(prev => ({
                ...prev,
                [fieldName]: file
            }));

            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreviews(prev => ({
                ...prev,
                [fieldName]: previewUrl
            }));

            // Update form values with the file
            setFormValues(prev => ({
                ...prev,
                [fieldName]: file
            }));
        }
    };

    React.useEffect(() => {
        return () => {
            Object.values(imagePreviews).forEach(url => URL.revokeObjectURL(url));
        };
    }, []);

    const renderImageField = (fieldName: string, currentValue: string | null) => {
        return (
            <div className="flex flex-col space-y-4">
                {(currentValue || imagePreviews[fieldName]) && (
                    <div className={"w-[200px] h-[200px]"}>
                        <Image
                            src={imagePreviews[fieldName] || currentValue || ''}
                            alt={`${fieldName} preview`}
                            height={200}
                            width={200}
                            className="object-contain h-[200px] w-[200px] inset-[0%]"
                        />
                    </div>
                )}
                <div className="flex items-center space-x-4">
                    <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, fieldName)}
                        />
                    </label>
                    {(currentValue || imagePreviews[fieldName]) && (
                        <button
                            onClick={() => {
                                setSelectedImages(prev => {
                                    const newState = { ...prev };
                                    delete newState[fieldName];
                                    return newState;
                                });
                                setImagePreviews(prev => {
                                    const newState = { ...prev };
                                    delete newState[fieldName];
                                    return newState;
                                });
                                setFormValues(prev => ({
                                    ...prev,
                                    [fieldName]: null
                                }));
                            }}
                            className="text-red-500 hover:text-red-700 transition-colors"
                        >
                            Remove
                        </button>
                    )}
                </div>
            </div>
        );
    };

    const getSelectValue = (field: string): string => {
        if (field in formValues) {
            return formValues[field]?.toString() || "";
        }

        if (currentModel && field in currentModel) {
            return currentModel[field]?.toString() || "";
        }

        return "";
    };

    return (
        <>
            <div className={`flex flex-row space-x-4`}>
                <button
                    onClick={() => {
                        setNewModel(false);
                        setCurrentModelId(null);
                    }}
                    className="w-[300px] self-start ml-[128px] text-center text-[28px] text-[#3B82F6] rounded-xl bg-[#1D417B] p-4 mb-[64px]"
                >
                    Back
                </button>
                {currentModelId && (
                    <button
                        onClick={() => {
                            handleDelete()
                        }}
                        className="w-[300px] self-start ml-[128px] text-center text-[28px] text-[#3B82F6] rounded-xl bg-[#1D417B] p-4 mb-[64px]"
                    >
                        Delete
                    </button>
                )}
            </div>
            {modelSchema?.data && (
                <div className="flex flex-col space-y-[64px]">
                    {modelSchema.data.map((item: ModelSchema, index: number) => {
                        const type = getInputType(item.Field, item.Type);
                        const isRelationshipField = item.Field.endsWith("_id");
                        const relationshipData = isRelationshipField ? getRelationshipData(item.Field) : [];

                        return (
                            <div key={index} className="flex flex-row space-x-10 text-white text-[36px]">
                                <p>{item.Field.charAt(0).toUpperCase() + item.Field.slice(1)}:</p>
                                {type !== "null" ? (
                                    isRelationshipField ? (
                                        <select
                                            className="text-black"
                                            name={item.Field}
                                            value={getSelectValue(item.Field)}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select</option>
                                            {relationshipData?.map((relatedItem: any) => (
                                                <option key={relatedItem.id} value={relatedItem.id}>
                                                    {relatedItem.name || relatedItem.type || relatedItem.id}
                                                </option>
                                            ))}
                                        </select>
                                    ) : type === "image" ? (
                                        renderImageField(
                                            item.Field,
                                            currentModel ? currentModel[item.Field] : null
                                        )
                                    ) : (
                                        <input
                                            className="text-black"
                                            type={type}
                                            name={item.Field}
                                            defaultValue={currentModel ? (type === 'date' ? formatDate(currentModel[item.Field]) : currentModel[item.Field]) : ''}
                                            onChange={handleChange}
                                        />
                                    )
                                ) : (
                                    <p>{currentModel ? currentModel[item.Field] : 'Auto Generated'}</p>
                                )}
                            </div>
                        );
                    })}
                    <button
                        onClick={currentModelId ? handleSave : handleCreate}
                        className="text-white text-[36px] border-[2px] border-white py-2 px-12 rounded-md"
                    >
                        {currentModelId ? 'Save' : 'Create'}
                    </button>
                </div>
            )}
        </>
    );
};