import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 rounded-3xl p-12 md:p-20 shadow-2xl relative overflow-hidden border border-purple-400/30"
        >
          {/* Glassmorphism effect */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl" />

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Start Managing Your Academic Success Today
              </h2>

              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of students transforming their academic journey. Get instant access to powerful tools for GPA management, performance tracking, and smart recommendations.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link
                  to="/register"
                  className="group relative inline-flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-white rounded-lg" />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-8 py-4 font-bold text-blue-600 flex items-center space-x-2 rounded-lg"
                  >
                    <span>Register Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>

                <Link
                  to="/login"
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Already a Member? Login
                  </motion.span>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-around gap-8"
              >
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white">10K+</div>
                  <div className="text-white/80 mt-2">Active Students</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white">4.8★</div>
                  <div className="text-white/80 mt-2">Average Rating</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white">99%</div>
                  <div className="text-white/80 mt-2">Uptime</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Animated elements */}
          <motion.div
            animate={{
              float: [0, 20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-10 right-10 text-6xl opacity-20"
          >
            📚
          </motion.div>
          <motion.div
            animate={{
              float: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-10 left-10 text-6xl opacity-20"
          >
            🎓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
