import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const videosDirectory = path.join(process.cwd(), 'public/videos');
    
    // Check if directory exists
    if (!fs.existsSync(videosDirectory)) {
      return NextResponse.json({ videos: [] });
    }

    const files = fs.readdirSync(videosDirectory);
    
    // Filter for video files (basic extension check)
    const priorityOrder = [
      'elevate-0.2.mp4',
      'LaMirada-9.12.mp4',
      '03.mp4',
      'Highst.mp4',
      'Jasmine.mp4',
    ];

    const videos = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.mp4', '.webm', '.mov'].includes(ext);
      })
      .sort((a, b) => {
        const aIndex = priorityOrder.indexOf(a);
        const bIndex = priorityOrder.indexOf(b);

        const aPriority = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
        const bPriority = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;

        if (aPriority !== bPriority) {
          return aPriority - bPriority;
        }

        return a.localeCompare(b);
      })
      .map(file => `/videos/${file}`);

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error reading video directory:', error);
    return NextResponse.json({ error: 'Failed to load videos' }, { status: 500 });
  }
}
