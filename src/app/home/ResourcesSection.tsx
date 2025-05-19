"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BookOpenIcon, BookmarkIcon, GraduationCapIcon, UsersIcon } from "lucide-react";

const resources = [
  {
    title: "Documentation",
    description: "Comprehensive guides for getting started with CHKwire",
    icon: <BookOpenIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    link: "/docs",
    color: "bg-blue-50 dark:bg-blue-950/40"
  },
  {
    title: "Tutorials",
    description: "Step-by-step tutorials for building effective API tests",
    icon: <GraduationCapIcon className="h-8 w-8 text-green-600 dark:text-green-400" />,
    link: "/tutorials",
    color: "bg-green-50 dark:bg-green-950/40"
  },
  {
    title: "API Reference",
    description: "Detailed reference for the CHKwire API and configuration options",
    icon: <BookmarkIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
    link: "/api",
    color: "bg-purple-50 dark:bg-purple-950/40"
  },
  {
    title: "Community",
    description: "Join our community forum to get help and share your knowledge",
    icon: <UsersIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />,
    link: "/community",
    color: "bg-orange-50 dark:bg-orange-950/40"
  }
];

export function ResourcesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-white dark:bg-black">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
            Resources & Documentation
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mx-auto max-w-3xl">
            Everything you need to master CHKwire and build better API tests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Link href={resource.link} className="block h-full">
                <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:shadow-md">
                  <div className="p-6">
                    <div className={`w-14 h-14 rounded-lg ${resource.color} flex items-center justify-center mb-5`}>
                      {resource.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{resource.description}</p>

                    <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                      Explore {resource.title}
                      <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
