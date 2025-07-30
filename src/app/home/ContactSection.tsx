"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/Container";
import { Send, MessageCircle, Mail, Phone, CheckCircle, AlertCircle } from "lucide-react";
import { GlowButton } from "@/components/ui/glowing-effect";
import { LabelInputContainer, Label, Input, Textarea } from "@/components/ui/signup-form";

// Custom X (Twitter) icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Contact sections data
const contactSections = [
  {
    id: "chat",
    title: "Chat with us",
    description: "Speak to our friendly team via live chat.",
    items: [
      { text: "Start a live chat", href: "#", icon: MessageCircle },
      { text: "Shoot us an email", href: "mailto:info@chkware.com", icon: Mail },
      { text: "Message us on X", href: "https://twitter.com/chkware", icon: XIcon }
    ]
  },
  {
    id: "call",
    title: "Call us",
    description: "Call our team Mon-Fri from 8am to 5pm.",
    items: [
      { text: "+880 1878 239734", href: "tel:+18801878239734", icon: Phone }
    ]
  }
];

// Types for form handling
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Form field component for better reusability
interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "textarea";
  placeholder: string;
  rows?: number;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function FormField({ 
  id, 
  label, 
  type = "text", 
  placeholder, 
  rows, 
  required = false, 
  value, 
  onChange, 
  error 
}: FormFieldProps) {
  return (
    <LabelInputContainer>
      <Label htmlFor={id}>{label}</Label>
      <div className="group/input">
        {type === "textarea" ? (
          <Textarea
            id={id}
            rows={rows || 4}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <Input
            type={type}
            id={id}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </LabelInputContainer>
  );
}

// Contact section component
interface ContactSectionProps {
  section: typeof contactSections[0];
}

function ContactSectionCard({ section }: ContactSectionProps) {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {section.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
        {section.description}
      </p>
      <div className="space-y-4">
        {section.items.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <a
                href={item.href}
                className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline decoration-2 underline-offset-4"
              >
                {item.text}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}



export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const [fieldErrors, setFieldErrors] = useState<Partial<ContactFormData>>({});

  // Form validation
  const validateForm = (): boolean => {
    const errors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim() || formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim() || formData.subject.length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    }
    
    if (!formData.message.trim() || formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result: ContactResponse = await response.json();
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setFieldErrors({});
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear submit status when user starts editing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 -z-10" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-blue-950/20 opacity-60 -z-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-purple-950/20 opacity-60 -z-10 blur-3xl" />

      <Container size="large">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
            Need Help With{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CHKware?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mx-auto max-w-3xl">
            Get in touch with our support team or explore additional resources
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 max-w-5xl mx-auto">

          {/* Contact Form - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full lg:w-3/5"
          >
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-10 w-full border-0">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Send us a message
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  We&apos;ll get back to you within 24 hours
                </p>
              </div>

              {/* Status Messages */}
              {submitStatus.type && (
                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
                }`}>
                  {submitStatus.type === 'success' ? (
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  )}
                  <p className="text-sm font-medium">{submitStatus.message}</p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <FormField
                  id="name"
                  label="Name"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={(value) => handleInputChange('name', value)}
                  error={fieldErrors.name}
                />

                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                  error={fieldErrors.email}
                />

                <FormField
                  id="subject"
                  label="Subject"
                  placeholder="How can we help?"
                  required
                  value={formData.subject}
                  onChange={(value) => handleInputChange('subject', value)}
                  error={fieldErrors.subject}
                />

                <FormField
                  id="message"
                  label="Message"
                  type="textarea"
                  placeholder="Your message here..."
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(value) => handleInputChange('message', value)}
                  error={fieldErrors.message}
                />

                <GlowButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span className="ml-2">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span className="ml-2">Send Message</span>
                    </>
                  )}
                </GlowButton>
              </form>
            </Card>
          </motion.div>

          {/* Contact Methods - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/5"
          >
            <div className="flex flex-col justify-center h-full">
              {contactSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ContactSectionCard section={section} />
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
