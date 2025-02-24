import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const modelType = formData.get('modelType') as string;
        const modelId = formData.get('modelId') as string;

        if (!file || !modelType || !modelId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const dirPath = join(process.cwd(), 'public', 'models', modelType);
        if (!existsSync(dirPath)) {
            await mkdir(dirPath, { recursive: true });
        }

        const fileName = `${modelId}.png`;
        const filePath = join(dirPath, fileName);

        if (existsSync(filePath)) {
            try {
                await unlink(filePath);
            } catch (error) {
                console.error('Error deleting existing file:', error);
                return NextResponse.json(
                    { error: 'Failed to replace existing file' },
                    { status: 500 }
                );
            }
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);
        const relativePath = `/models/${modelType}/${fileName}`;
        return NextResponse.json({ path: relativePath });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Upload failed' },
            { status: 500 }
        );
    }
}