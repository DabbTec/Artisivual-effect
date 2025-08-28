import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart } from 'lucide-react';

const About: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { number: '10,000+', label: 'Active Artists' },
    { number: '50,000+', label: 'Artworks Sold' },
    { number: '100+', label: 'Countries' },
    { number: '₦2B+', label: 'Artist Earnings' },
  ];

  const values = [
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in building a strong, supportive community where artists and collectors can thrive together.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Constantly pushing the boundaries of what\'s possible in digital art commerce and technology.'
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Maintaining the highest standards for both artworks and user experience on our platform.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Driven by our love for art and commitment to empowering creative professionals worldwide.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Former digital artist turned entrepreneur, passionate about democratizing art commerce.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Tech visionary with 15+ years experience building scalable platforms for creative industries.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Head of Community',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Artist advocate dedicated to fostering meaningful connections between creators and collectors.'
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
            About
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
              Artivisual
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-dark-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            We're on a mission to revolutionize the digital art world by creating the most comprehensive, 
            artist-friendly marketplace where creativity flourishes and commerce thrives.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-dark-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <img
                src="https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Digital Art Creation"
                className="rounded-xl shadow-2xl w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">
                Born from Creative Frustration
              </h3>
              <p className="text-dark-600 leading-relaxed">
                Artivisual was founded in 2023 when our founder, a struggling digital artist, 
                couldn't find a platform that truly understood the needs of digital creators. 
                Existing marketplaces took hefty commissions, offered poor discovery, and 
                provided minimal protection for artists' work.
              </p>
              <p className="text-dark-600 leading-relaxed">
                We set out to build something different - a platform where artists keep more 
                of their earnings, gain better exposure for their work, and have the tools 
                they need to build sustainable creative careers.
              </p>
              <p className="text-dark-600 leading-relaxed">
                Today, we're proud to be home to thousands of talented artists and passionate 
                collectors who share our vision of a more equitable and vibrant digital art ecosystem.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-dark-200/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Values</h2>
            <p className="text-xl text-dark-600 max-w-3xl mx-auto">
              These core principles guide everything we do and every decision we make
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-200 p-6 rounded-xl hover:bg-dark-300 transition-colors"
              >
                <div className="bg-primary-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-dark-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Meet Our Team</h2>
            <p className="text-xl text-dark-600">
              The passionate people behind Artivisual's success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-200 rounded-xl overflow-hidden hover:bg-dark-300 transition-colors"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <div className="text-primary-400 font-medium mb-3">{member.role}</div>
                  <p className="text-dark-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-4xl mx-auto">
              To democratize the digital art market by providing artists with the tools, 
              platform, and community they need to turn their passion into sustainable 
              income while connecting collectors with authentic, high-quality digital art.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">What This Means:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start">
                    <span className="text-accent-300 mr-2">•</span>
                    Fair compensation for artists with industry-low commission rates
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-300 mr-2">•</span>
                    Advanced tools for portfolio management and sales analytics
                  </li>
                </ul>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start">
                    <span className="text-accent-300 mr-2">•</span>
                    Global exposure and marketing support for emerging artists
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-300 mr-2">•</span>
                    Secure, trusted transactions for both buyers and sellers
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;