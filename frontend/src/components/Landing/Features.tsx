import React from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  BarChart3,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Shield,
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Calculator,
      title: 'GPA Calculator',
      description: 'Instantly calculate your GPA with our intelligent system that supports multiple grading scales.',
      color: 'from-blue-500 to-blue-600',
      delay: 0,
    },
    {
      icon: BarChart3,
      title: 'Academic Dashboard',
      description: 'Comprehensive overview of your academic performance with real-time statistics and insights.',
      color: 'from-purple-500 to-purple-600',
      delay: 0.1,
    },
    {
      icon: TrendingUp,
      title: 'Performance Charts',
      description: 'Beautiful visualizations of your academic progress over time with detailed analytics.',
      color: 'from-pink-500 to-pink-600',
      delay: 0.2,
    },
    {
      icon: BookOpen,
      title: 'Course Management',
      description: 'Organize and track all your courses with grades, credits, and semester information.',
      color: 'from-cyan-500 to-cyan-600',
      delay: 0.3,
    },
    {
      icon: Lightbulb,
      title: 'Smart Recommendations',
      description: 'AI-powered personalized study recommendations based on your academic performance.',
      color: 'from-yellow-500 to-yellow-600',
      delay: 0.4,
    },
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Enterprise-grade security with encrypted authentication to protect your academic data.',
      color: 'from-green-500 to-green-600',
      delay: 0.5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="features" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Powerful Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools designed to help you achieve academic excellence and reach your full potential.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="relative h-full bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl overflow-hidden">
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-blue-100 group-hover:to-purple-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl" />

                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6 relative z-10`}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
