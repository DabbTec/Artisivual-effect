import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Users, Shield, TrendingUp, Camera, Brush, Zap, Award } from 'lucide-react';

const Services: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: Palette,
      title: 'Digital Art Marketplace',
      description: 'Comprehensive platform for buying and selling digital artworks with secure transactions.',
      features: ['Secure Payment Processing', 'Global Reach', 'Artist Protection', 'Quality Assurance']
    },
    {
      icon: Camera,
      title: 'Professional Photography',
      description: 'High-quality photography services for artists and businesses.',
      features: ['Product Photography', 'Portrait Sessions', 'Event Coverage', 'Commercial Shoots']
    },
    {
      icon: Brush,
      title: 'Custom Art Commissions',
      description: 'Connect with talented artists for personalized artwork creation.',
      features: ['Custom Portraits', 'Brand Illustrations', 'Concept Art', 'Digital Paintings']
    },
    {
      icon: Users,
      title: 'Artist Community',
      description: 'Join a thriving community of digital artists and creative professionals.',
      features: ['Networking Events', 'Skill Workshops', 'Mentorship Programs', 'Collaboration Tools']
    },
    {
      icon: Shield,
      title: 'Copyright Protection',
      description: 'Advanced protection services for your digital artwork and intellectual property.',
      features: ['Watermarking', 'Copyright Registration', 'Infringement Monitoring', 'Legal Support']
    },
    {
      icon: TrendingUp,
      title: 'Marketing & Promotion',
      description: 'Boost your art visibility with our comprehensive marketing services.',
      features: ['Social Media Marketing', 'SEO Optimization', 'Influencer Partnerships', 'PR Services']
    },
    {
      icon: Zap,
      title: 'Digital Art Tools',
      description: 'Access to premium digital art tools and software.',
      features: ['Software Licenses', 'Brush Packs', 'Texture Libraries', 'Tutorial Access']
    },
    {
      icon: Award,
      title: 'Art Competitions',
      description: 'Regular competitions and exhibitions to showcase your talent.',
      features: ['Monthly Contests', 'Prize Money', 'Exhibition Opportunities', 'Recognition Awards']
    }
  ];

  const pricingPlans = [
    {
      name: 'Basic',
      price: '₦5,000',
      period: '/month',
      description: 'Perfect for emerging artists',
      features: [
        'Upload up to 10 artworks',
        'Basic analytics',
        'Community access',
        'Standard support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '₦15,000',
      period: '/month',
      description: 'For established artists',
      features: [
        'Upload up to 50 artworks',
        'Advanced analytics',
        'Priority support',
        'Marketing tools',
        'Custom portfolio page'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '₦35,000',
      period: '/month',
      description: 'For art studios and agencies',
      features: [
        'Unlimited artwork uploads',
        'Team collaboration tools',
        'White-label solutions',
        'Dedicated account manager',
        'Custom integrations'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-dark-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-accent-900/20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
              Services
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-dark-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Comprehensive solutions for digital artists, collectors, and creative professionals. 
            From marketplace services to professional development, we've got you covered.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">What We Offer</h2>
            <p className="text-xl text-dark-600 max-w-3xl mx-auto">
              Comprehensive services designed to support your creative journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-200 p-6 rounded-xl hover:bg-dark-300 transition-all duration-300 group"
              >
                <div className="bg-primary-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-dark-600 mb-4 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-dark-600">
                      <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-dark-200/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Pricing Plans</h2>
            <p className="text-xl text-dark-600">
              Choose the perfect plan for your creative needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-dark-200 rounded-xl p-8 ${
                  plan.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-dark-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-primary-400">{plan.price}</span>
                    <span className="text-dark-600 ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-dark-600">
                      <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-dark-300 text-dark-700 hover:bg-dark-400'
                }`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">How It Works</h2>
            <p className="text-xl text-dark-600">
              Simple steps to get started with our services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Sign Up', description: 'Create your account and choose your role' },
              { step: '02', title: 'Set Up Profile', description: 'Complete your profile and portfolio' },
              { step: '03', title: 'Start Creating', description: 'Upload your artwork or browse collections' },
              { step: '04', title: 'Grow & Earn', description: 'Build your audience and generate income' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-dark-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of artists and collectors who trust Artivisual for their creative needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors text-lg font-semibold">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-primary-600 transition-colors text-lg font-semibold">
                Contact Sales
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;