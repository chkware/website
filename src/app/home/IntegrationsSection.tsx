"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/Container";
import { ExternalLink } from "lucide-react";

const integrations = [
  {
    name: "GitHub",
    description: "Integrate tests with GitHub Actions for CI/CD pipelines.",
    icon: "/images/logos/github.svg",
    link: "#"
  },
  {
    name: "GitLab",
    description: "Run API tests automatically in GitLab CI pipelines.",
    icon: "/images/logos/gitlab.svg",
    link: "#"
  },
  {
    name: "Jenkins",
    description: "Schedule and monitor API tests in Jenkins workflows.",
    icon: "/images/logos/jenkins.svg",
    link: "#"
  },
  {
    name: "Slack",
    description: "Get real-time notifications about test results in Slack.",
    icon: "/images/logos/slack.svg",
    link: "#"
  },
  {
    name: "JIRA",
    description: "Create issues automatically when tests fail.",
    icon: "/images/logos/jira.svg",
    link: "#"
  },
  {
    name: "Docker",
    description: "Run tests in isolated Docker containers.",
    icon: "/images/logos/docker.svg",
    link: "#"
  },
];

export function IntegrationsSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <Container size="large">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
            Integrate with Your Favorite Tools
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mx-auto max-w-3xl">
            CHKware works seamlessly with your existing development ecosystem
          </p>
        </motion.div>

        {/* Integration cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={integration.link}>
                <Card className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 flex flex-col">
                  <div className="flex items-start mb-4">
                    <div className="h-12 w-12 relative mr-4 flex-shrink-0">
                      <Image
                        src={integration.icon}
                        alt={integration.name}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {integration.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 text-sm text-blue-600 dark:text-blue-400 flex items-center opacity-70 hover:opacity-100 transition-opacity">
                    Learn more
                    <ExternalLink className="h-3.5 w-3.5 ml-1" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom section with custom integrations highlight */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Need a custom integration?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our flexible API allows you to integrate CHKware with any tool in your workflow.
            <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline ml-2">
              View API documentation
            </Link>
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
