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
    const videos = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.mp4', '.webm', '.mov'].includes(ext);
      })
      .sort((a, b) => {
        // 'elevate-0.1.mp4' always comes first
        if (a === 'elevate-0.1.mp4') return -1;
        if (b === 'elevate-0.1.mp4') return 1;
        // The rest are sorted alphabetically
        return a.localeCompare(b);
      })
      .map(file => `/videos/${file}`);

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error reading video directory:', error);
    return NextResponse.json({ error: 'Failed to load videos' }, { status: 500 });
  }
}
