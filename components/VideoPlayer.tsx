'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cacheVideo } from '@/utils/videoCache';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src: string;
  className?: string;
  index: number;
}

export default function VideoPlayer({ src, className, index }: VideoPlayerProps) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadVideo = async () => {
      // Try to get from cache/fetch and cache
      // Note: For very large files, fetching blob might delay playback. 
      // We could start streaming from original URL while caching in background, 
      // but for "load speed" on *future* visits, and simplicity, let's try the cache approach.
      // If it takes too long, we might want to fallback.
      
      // For immediate playback, we might just set the src.
      // But let's try the cache strategy requested.
      try {
        const blobUrl = await cacheVideo(src);
        if (active) {
          blobUrlRef.current = blobUrl;
          setVideoSrc(blobUrl);
        }
      } catch {
        if (active) setVideoSrc(src);
      }
    };

    loadVideo();

    return () => {
      active = false;
      if (blobUrlRef.current && blobUrlRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [src]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn("relative overflow-hidden rounded-xl bg-gray-900 shadow-2xl aspect-video", className)}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
           <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          className={cn("w-full h-full object-cover transition-opacity duration-700", isLoaded ? "opacity-100" : "opacity-0")}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoaded(true)}
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

