'use client';

import { useEffect, useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import { motion } from 'framer-motion';

export default function Home() {
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/videos');
        const data = await res.json();
        if (data.videos) {
          setVideos(data.videos);
        }
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <h1 className="text-2xl font-bold tracking-tighter">
              SCENESET <span className="text-white/50">X</span> ELEVATE MIAMI
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm font-light text-white/60"
          >
            CURATED COLLECTION
          </motion.div>
        </div>
      </header>

      <div className="pt-32 pb-20 px-4 md:px-8 max-w-[1920px] mx-auto">
        {loading ? (
          <div className="flex h-[50vh] items-center justify-center">
             <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        ) : videos.length === 0 ? (
          <div className="flex flex-col h-[50vh] items-center justify-center text-white/40 space-y-4">
            <p className="text-xl font-light">No videos found.</p>
            <p className="text-sm">Add videos to the <code className="bg-white/10 px-2 py-1 rounded">public/videos</code> folder.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {videos.map((src, index) => (
              <VideoPlayer key={src} src={src} index={index} className="w-full" />
            ))}
          </div>
        )}
      </div>

      <footer className="py-10 border-t border-white/10 text-center text-white/30 text-sm">
        <div className="flex flex-col items-center gap-2">
          <p>&copy; {new Date().getFullYear()} SCENESET X ELEVATE MIAMI</p>
          <div className="flex items-center gap-2 text-white/50">
            <span>Chris Colbert</span>
            <span>•</span>
            <a href="mailto:Chris@sceneset.ai" className="hover:text-white transition-colors">
              Chris@sceneset.ai
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
