'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { localAmenities } from '@/lib/localData';
import { MapPin, Star, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LocalAmenities() {
  const [activeTab, setActiveTab] = useState(localAmenities[0].id);

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Local Lifestyle</h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Discover the best of Miami living right at your doorstep. From world-class dining to top-rated schools and serene parks.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {localAmenities.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={cn(
              "relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300",
              activeTab === category.id 
                ? "text-black" 
                : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            {activeTab === category.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{category.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          {localAmenities
            .find((c) => c.id === activeTab)
            ?.items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-white transition-colors">{item.name}</h3>
                    {item.address && (
                      <div className="flex items-center text-white/50 text-sm gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.address}</span>
                      </div>
                    )}
                  </div>
                  {item.rating && (
                    <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  )}
                </div>

                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm font-medium text-white/40">
                    {item.distance} away
                  </span>
                  <button className="flex items-center gap-2 text-sm font-medium text-white hover:text-white/80 transition-colors group/btn">
                    Get Directions
                    <Navigation className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
