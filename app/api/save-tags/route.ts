import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const tags = await request.json();

    // Validate that tags is an array
    if (!Array.isArray(tags)) {
      return NextResponse.json({ success: false, error: 'Tags must be an array' }, { status: 400 });
    }

    // Validate each tag has required fields
    for (const tag of tags) {
      if (!tag.id || !tag.category) {
        return NextResponse.json(
          {
            success: false,
            error: 'Each tag must have id and category fields',
          },
          { status: 400 }
        );
      }
    }

    // Write to file
    const filePath = join(process.cwd(), 'data', 'tags.json');
    await writeFile(filePath, JSON.stringify(tags, null, 2));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving tags:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to save tags',
      },
      { status: 500 }
    );
  }
}
