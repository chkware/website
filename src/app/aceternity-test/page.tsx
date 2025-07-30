"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { AutomationSpeedSVG } from "@/components/ui/automation-speed-svg";
import { ReliabilityUptimeSVG } from "@/components/ui/reliability-uptime-svg";
import { EasyIntegrationSVG } from "@/components/ui/easy-integration-svg";
import { ProjectLaunchpadSVG } from "@/components/ui/project-launchpad-svg";
import { StreamlinedWorkflowSVG } from "@/components/ui/streamlined-workflow-svg";
import { PrecisionToolkitSVG } from "@/components/ui/precision-toolkit-svg";
import { APIAccelerationSVG } from "@/components/ui/api-acceleration-svg";
import { AssemblyLineLaunchSVG } from "@/components/ui/assembly-line-launch-svg";
import { MagicWandAutomationSVG } from "@/components/ui/magic-wand-automation-svg";
import { LowCodeConnectionSVG } from "@/components/ui/low-code-connection-svg";

export default function AceternityTestPage() {
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const codeLines = [
    "# CHKware API Test Configuration",
    "---",
    "version: default:http:0.7.2",
    "",
    "request:",
    "  url: \"https://api.example.com/users\"",
    "  method: GET",
    "  headers:",
    "    Authorization: \"Bearer {{token}}\"",
    "",
    "assertions:",
    "  - status: 200",
    "  - response.data.length > 0",
    "  - response.time < 500ms",
    "",
    "expose:",
    "  - <% response.data %>"
  ];

  useEffect(() => {
    if (currentLine < codeLines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [currentLine, codeLines.length]);

  return (
    <>
      <AuroraBackground className="min-h-screen">
        <Container size="large" className="relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* Pre-headline */}
              <div className="inline-flex items-center rounded-full border border-blue-200/50 bg-blue-50/50 dark:bg-blue-900/20 dark:border-blue-800/50 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                New: CHKware v0.5.0 Released
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                Reduce API{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Regression Costs.
                </span>{" "}
                Release with{" "}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent">
                  Confidence.
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                Streamline your API development and testing with elegant, reusable YAML configuration specs. 
                Spend less time fixing and more time building.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg rounded-lg bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                  asChild
                >
                  <Link href="/docs/getting-started" className="flex items-center justify-center">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
                  asChild
                >
                  <Link href="#features" className="flex items-center justify-center">
                    <Play className="mr-2 h-5 w-5" />
                    View Features
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Trusted by developers at
                </p>
                <div className="flex items-center space-x-8 opacity-60">
                  <div className="text-lg font-semibold text-gray-400">TechCorp</div>
                  <div className="text-lg font-semibold text-gray-400">DevStudio</div>
                  <div className="text-lg font-semibold text-gray-400">APIFirst</div>
                </div>
              </div>
            </div>

            {/* Right Column - Animated Code Block */}
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden border border-gray-200/20 dark:border-gray-700/30 bg-white/5 dark:bg-gray-900/20 backdrop-blur-sm shadow-2xl">
                {/* Terminal Header */}
                <div className="bg-gray-100/80 dark:bg-gray-800/80 px-4 py-3 flex items-center space-x-2 backdrop-blur-sm border-b border-gray-200/20 dark:border-gray-700/30">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300 ml-4">
                    api-test.chk
                  </div>
                </div>

                {/* Code Content */}
                <div className="bg-gray-900/95 p-6 min-h-[400px] font-mono text-sm">
                  {codeLines.slice(0, currentLine).map((line, index) => (
                    <div
                      key={index}
                      className={`transition-all duration-300 ${
                        index === currentLine - 1 ? 'animate-pulse' : ''
                      }`}
                    >
                      {line.startsWith('#') ? (
                        <span className="text-gray-400">{line}</span>
                      ) : line.startsWith('---') ? (
                        <span className="text-yellow-400">{line}</span>
                      ) : line.includes(':') && !line.startsWith('  ') ? (
                        <span>
                          <span className="text-blue-400">{line.split(':')[0]}</span>
                          <span className="text-white">:</span>
                          <span className="text-green-400">{line.split(':').slice(1).join(':')}</span>
                        </span>
                      ) : line.startsWith('  ') && line.includes(':') ? (
                        <span>
                          <span className="text-gray-300">  </span>
                          <span className="text-purple-400">{line.trim().split(':')[0]}</span>
                          <span className="text-white">:</span>
                          <span className="text-green-400">{line.trim().split(':').slice(1).join(':')}</span>
                        </span>
                      ) : line.startsWith('  - ') ? (
                        <span>
                          <span className="text-gray-300">  </span>
                          <span className="text-yellow-400">-</span>
                          <span className="text-cyan-400">{line.slice(3)}</span>
                        </span>
                      ) : (
                        <span className="text-gray-300">{line || '\u00A0'}</span>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="inline-block w-2 h-5 bg-green-400 animate-pulse ml-1"></div>
                  )}
                </div>
              </div>

              {/* Floating Success Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white/90 dark:bg-gray-800/90 rounded-lg p-4 shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 min-w-[200px]">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      Tests Passed
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      All 24 assertions in 0.8s
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating YAML Badge */}
              <div className="absolute -top-4 -right-4 bg-blue-50/90 dark:bg-blue-900/30 rounded-lg p-3 shadow-lg backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50">
                <div className="text-center">
                  <div className="font-semibold text-blue-700 dark:text-blue-300 text-sm">
                    YAML Config
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    Simple & Powerful
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </AuroraBackground>

      {/* Feature Sections Demo */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <Container size="large">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              CHKware Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See how CHKware transforms your API testing workflow
            </p>
          </div>
          
          {/* Feature 1: 4x Faster Automation */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                4x Faster Automation
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Transform your slow, manual testing processes into lightning-fast automated workflows
              </p>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <AutomationSpeedSVG 
                  width={500} 
                  height={250}
                  className="mx-auto"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Before</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Slow, manual testing processes with single-threaded execution and inconsistent results
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">After</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Parallel automated testing with consistent, reliable results at 4x the speed
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2: 99.9% Reliability */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                99.9% Reliability & Uptime
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Rock-solid testing infrastructure that you can depend on for critical deployments
              </p>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <ReliabilityUptimeSVG 
                  width={500} 
                  height={250}
                  className="mx-auto"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Before</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Unreliable testing with frequent downtime, inconsistent results, and manual monitoring
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">After</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Enterprise-grade reliability with 99.9% uptime and automated health monitoring
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3: Easy Integration */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                One-Click Integration
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Seamlessly integrate with your existing tools and workflows in minutes, not hours
              </p>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <EasyIntegrationSVG 
                  width={500} 
                  height={250}
                  className="mx-auto"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Before</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Complex setup processes, tangled configurations, and hours of manual integration work
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">After</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Simple one-click setup with automatic service discovery and intelligent configuration
                </p>
              </div>
            </div>
          </div>

          {/* Feature 4: Project Launchpad */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Accelerated Project Launches
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Transform your development workflow from slow, manual processes to rapid, automated project deployment
              </p>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <ProjectLaunchpadSVG 
                  width={500} 
                  height={250}
                  className="mx-auto"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Traditional Deployment</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Manual setup, complex configurations, and lengthy deployment cycles that slow down innovation
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">CHKware Launchpad</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Automated project initialization with code-driven infrastructure and instant deployment capabilities
                </p>
              </div>
            </div>
          </div>

          {/* Feature 5: Streamlined Workflow */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Streamlined Workflow
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Transform chaotic, complex processes into clean, efficient, and lightning-fast workflows
              </p>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <StreamlinedWorkflowSVG 
                  width={500} 
                  height={250}
                  className="mx-auto"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Complex Processes</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Tangled workflows, multiple tools, manual steps, and inconsistent results that slow down your team
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Streamlined Efficiency</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Single unified tool that processes complexity and delivers fast, precise, and consistent results
                </p>
              </div>
            </div>
          </div>

          {/* Feature 6: Precision Toolkit */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Precision Toolkit
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A comprehensive suite of precision-engineered tools designed for speed, accuracy, and seamless API development
              </p>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <PrecisionToolkitSVG 
                  width={500} 
                  height={250}
                  className="mx-auto"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lightning Speed</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Optimized performance tools that deliver results in milliseconds, not minutes
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Surgical Precision</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Advanced testing and validation tools that catch issues before they become problems
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Developer-First</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Built by developers, for developers, with intuitive APIs and comprehensive documentation
                </p>
              </div>
            </div>
          </div>

          {/* Feature 7: API Acceleration */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Accelerate Your API Development
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Launch projects faster than ever with streamlined workflow tools designed for speedy delivery and precision
              </p>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <APIAccelerationSVG 
                  width={500} 
                  height={250}
                  className="mx-auto"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Traditional Development</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Weeks of manual setup, complex configurations, and lengthy development cycles that slow innovation
                </p>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  ⏱️ Timeline: Weeks to Months
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">CHKware Acceleration</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Streamlined workflow with precision tools that accelerate every stage from planning to launch
                </p>
                <div className="mt-4 text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                  🚀 Timeline: Hours to Days
                </div>
              </div>
            </div>
            
            {/* Key metrics */}
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">85%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Faster Development</div>
              </div>
              <div className="text-center p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Precision Accuracy</div>
              </div>
              <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">4x</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Launch Speed</div>
              </div>
            </div>
          </div>

          {/* Feature 8: Assembly Line to Launch */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Assembly Line to Launch
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Transform complex project tasks through our streamlined workflow with precision tools for speedy delivery
              </p>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <AssemblyLineLaunchSVG 
                  width={500} 
                  height={250}
                  className="mx-auto"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Complex Input</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Raw project tasks, jumbled requirements, and scattered components that need organization
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Precision Processing</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Automated robotic tools organize, refine, and assemble components with surgical precision
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Speedy Launch</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Refined components merge into a sleek rocket, launching your project faster than ever
                </p>
              </div>
            </div>
            
            {/* Process benefits */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Complete Process Transformation</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  From chaotic complexity to streamlined success
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">Streamlined</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Workflow Process</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">Precision</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Tool Integration</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">Fast</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Project Launch</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 9: Magic Wand of Automation */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Magic Wand of Automation
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Effortless transformation from complex chaos to perfect structure. Let us handle the details while you focus on what matters.
              </p>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <MagicWandAutomationSVG 
                  width={500} 
                  height={250}
                  className="mx-auto"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Complex Details</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Jumbled code, scattered configurations, and chaotic project elements that overwhelm development teams
                </p>
                <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>&lt;/&gt;</span>
                  <span>{}</span>
                  <span>?</span>
                  <span>!</span>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Perfect Structure</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Organized, stable, and robust architecture that emerges automatically through intelligent automation
                </p>
                <div className="mt-4 flex justify-center">
                  <div className="flex flex-col space-y-1">
                    <div className="w-16 h-3 bg-blue-200 dark:bg-blue-800 rounded"></div>
                    <div className="w-16 h-3 bg-blue-300 dark:bg-blue-700 rounded"></div>
                    <div className="w-16 h-3 bg-blue-400 dark:bg-blue-600 rounded"></div>
                    <div className="w-16 h-3 bg-blue-500 dark:bg-blue-500 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Magic capabilities */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-8 max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">✨ Automation Magic</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  One touch transforms complexity into clarity
                </p>
              </div>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Instant</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Transformation</div>
                </div>
                <div>
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Perfect</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Accuracy</div>
                </div>
                <div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Zero</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Effort Required</div>
                </div>
                <div>
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Robust</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Results</div>
                </div>
              </div>
            </div>
            
            {/* Call to action */}
            <div className="text-center mt-8">
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                &ldquo;It Just Works&rdquo; Philosophy
              </p>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Experience the magic of automation that transforms your most complex challenges into elegant, stable solutions with a single touch.
              </p>
            </div>
          </div>

          {/* Feature 10: Low-Code Connection */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Low-Code Connection
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Simplify API testing by connecting simple goals to get robust results. One connection triggers complex automation.
              </p>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <LowCodeConnectionSVG 
                  width={500} 
                  height={250}
                  className="mx-auto"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Simple Goal</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Define your testing objective with intuitive building blocks. No complex configuration required.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Automated Pathways</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Complex network of automated processes handle all the details, routing around obstacles intelligently.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Robust Results</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Reliable, consistent outcomes delivered automatically with comprehensive error handling and validation.
                </p>
              </div>
            </div>
            
            {/* Low-code benefits */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 via-slate-50 to-emerald-50 dark:from-blue-900/20 dark:via-slate-900/20 dark:to-emerald-900/20 rounded-2xl p-8 max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">🔗 One Connection, Infinite Possibilities</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  The power of low-code automation in action
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">What You Do:</h5>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Connect Goal to Result blocks
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Define simple test objectives
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Click and configure visually
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">What We Handle:</h5>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      Complex API routing and validation
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      Error handling and retry logic
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      Performance optimization and scaling
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Simplicity metrics */}
            <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">90%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Less Code Required</div>
              </div>
              <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">10x</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Faster Development</div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}