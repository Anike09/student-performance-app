import React from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus,
  LogIn,
  BookMarked,
  Calculator,
  TrendingUp,
} from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Register Account',
      description: 'Create your account in seconds with email verification for security and easy access.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: LogIn,
      title: 'Login Securely',
      description: 'Access your dashboard with enterprise-grade security and encrypted authentication.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: BookMarked,
      title: 'Add Courses & Grades',
      description: 'Enter your courses, grades, and credit hours for accurate calculations.',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: Calculator,
      title: 'Calculate GPA',
      description: 'Watch as your GPA is calculated automatically with real-time updates.',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your academic journey with detailed analytics and visual insights.',
      color: 'from-yellow-500 to-yellow-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in just a few simple steps and begin your journey to academic success.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                variants={stepVariants}
                className="flex items-start md:items-center gap-8 group"
              >
                {/* Step Number and Line */}
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${step.color} text-white flex items-center justify-center font-bold text-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex-shrink-0`}
                  >
                    <Icon className="w-10 h-10" />
                  </motion.div>

                  {/* Connecting Line */}
                  {index !== steps.length - 1 && (
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: 120 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className={`w-1 my-4 bg-gradient-to-b ${step.color}`}
                    />
                  )}
                </div>

                {/* Content */}
                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 pt-2"
                >
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-sm font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-gray-600 mb-6">
            Ready to get started on your academic journey?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300"
          >
            Begin Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
