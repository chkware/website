"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/card";
import { FileCode, Play, CheckCircle, Rocket } from "lucide-react";

const steps = [
  {
    icon: FileCode,
    title: "Write YAML Config",
    description: "Define your API tests in simple, readable YAML format",
    color: "bg-blue-500"
  },
  {
    icon: Play,
    title: "Run Tests",
    description: "Execute tests locally or in your CI/CD pipeline",
    color: "bg-green-500"
  },
  {
    icon: CheckCircle,
    title: "Get Results",
    description: "View detailed reports and catch issues early",
    color: "bg-purple-500"
  },
  {
    icon: Rocket,
    title: "Deploy Confidently",
    description: "Ship your APIs with confidence knowing they work",
    color: "bg-orange-500"
  }
];

export function ImprovedHowItWorksSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <Container size="large">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            How it works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Get started with API testing in 4 simple steps
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center p-6 h-full border border-gray-200 dark:border-gray-800">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}