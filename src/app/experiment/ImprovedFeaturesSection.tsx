"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/card";
import { 
  FileText, 
  Zap, 
  Shield, 
  GitBranch, 
  BarChart3, 
  Workflow,
  CheckCircle,
  Clock
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "YAML Configuration",
    description: "Write tests in human-readable YAML format. No programming knowledge required.",
    color: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400",
    stats: "90% faster to write"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Execute thousands of API tests in seconds with parallel processing.",
    color: "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-400",
    stats: "10x faster execution"
  },
  {
    icon: Shield,
    title: "Robust Validation",
    description: "Deep response validation with JSON schema, custom assertions, and more.",
    color: "bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400",
    stats: "99.9% accuracy"
  },
  {
    icon: GitBranch,
    title: "CI/CD Integration",
    description: "Seamlessly integrate with GitHub Actions, GitLab CI, Jenkins, and more.",
    color: "bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400",
    stats: "5min setup"
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Get comprehensive test reports with performance metrics and insights.",
    color: "bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400",
    stats: "Real-time analytics"
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Chain API calls and create complex testing workflows with ease.",
    color: "bg-pink-50 dark:bg-pink-950/20 text-pink-600 dark:text-pink-400",
    stats: "Unlimited chains"
  }
];

export function ImprovedFeaturesSection() {
  return (
    <section className="py-24 bg-gray-50/50 dark:bg-gray-900/50">
      <Container size="large">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                API testing
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Powerful features designed to make API testing simple, fast, and reliable
            </p>
          </motion.div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-200">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  {feature.stats}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-900/30"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Ready in minutes, not hours
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Start testing your APIs today
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join thousands of developers who trust CHKware for their API testing needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Get Started Free
            </button>
            <button className="border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold transition-colors">
              View Documentation
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}