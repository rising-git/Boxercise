// app/about/page.tsx

'use client';
import React from 'react';
import { motion } from 'framer-motion';


const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* <h1 className="text-4xl font-extrabold text-center mt-3 mb-6 text-red-500">
          About Us
        </h1> */
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold text-center mt-10 mb-6 text-linear-gradient(135deg, hsl(var(--brand-blue)), hsl(var(--brand-red)), hsl(var(--brand-yellow)));"
          >
            About Us
          </motion.h1>
        }
        <p className="text-base sm:text-lg text-justify max-w-3xl mx-auto mb-12 text-gray-300">
          At <strong>Boxercise</strong>, we don’t just offer workouts — we offer transformation.
          Our team is made up of real athletes — National and International level performers,
          each with years of experience in coaching and teaching.

          After working with over 5000+ people and spending nearly two decades in the world of fitness,
          we saw a pattern: people wanted to get fit, but kept giving up due to lack of guidance,
          motivation, time, or sustainable systems.

          So we built <strong className='text-red-500'>Boxercise</strong> — a space where fitness is simple, guided, and personal.
        </p>

        {/* Coach Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row gap-10 items-center mb-16"
        >
          {/* <div className="flex flex-col md:flex-row gap-10 items-center mb-16"> */}
          <img
            src="/images/coach.jpg"
            alt="Coach training a client"
            className="rounded-2xl shadow-xl w-full md:w-1/2 object-cover"
          />
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-white">Meet Your Coach</h2>
            <p className="mb-4 text-gray-300">
              Coach Yash brings over 10 years of experience in personal training,
              boxing, and fitness transformation. His mission is to guide you
              through your fitness journey with passion, knowledge, and motivation.
            </p>
            <p className="text-gray-300">
              Whether you are a beginner or a pro, our personalized coaching
              will help you reach your goals faster and more effectively.
            </p>
          </div>
          {/* </div> */}
        </motion.div>

        {/* Mission & Vision */}
        {/* <div className="bg-gray-900 p-6 sm:p-10 rounded-xl shadow-lg mb-8"> */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-950 p-6 rounded-xl shadow-md"
        >
          {/* Mission/Vision card content */}


          <h2 className="text-4xl font-bold text-center text-white mb-2" >OUR CORE VALUES</h2>
          <p className="text-md text-gray-400 font-normal text-center">What drives us every day at <span className="text-xl text-red-600"> Boxercise</span></p>
          <br />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-center text-red-400 mb-2">Mission</h3>
              <p className="text-gray-300">
                To help people across the world transform their mind and body through personalised coaching, elite-level training, and a supportive fitness community — anytime, anywhere.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-center text-red-400 mb-2">Vision</h3>
              <p className="text-gray-300">
                To become a global fitness movement — where “Boxercise” is the first word that comes to mind when someone thinks of real, results-driven, powerful fitness.
              </p>
            </div>
          </div>
          {/* </div> */}
        </motion.div>

        {/* Why Choose Us */}
        <div className="text-center mb-16 px-2">
          <h2 className="text-2xl font-bold text-white mb-6">Why Choose Boxercise?</h2>
          <ul className="space-y-4 max-w-xl mx-auto text-left text-gray-300">
            <li className="flex items-start">
              <span className="text-red-400 text-xl mr-2">✓</span> Certified and experienced trainers
            </li>
            <li className="flex items-start">
              <span className="text-red-400 text-xl mr-2">✓</span> Tailored fitness plans
            </li>
            <li className="flex items-start">
              <span className="text-red-400 text-xl mr-2">✓</span> Supportive community & motivation
            </li>
            <li className="flex items-start">
              <span className="text-red-400 text-xl mr-2">✓</span> Online and offline sessions available
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        {/* <div className="bg-gray-600 p-6 sm:p-10 rounded-xl shadow-lg"> */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900 p-6 sm:p-10 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center text-white mb-6">Contact Us</h2>

          {/* Address */}
          <div className="mb-6 text-center text-gray-300 space-y-1">
            <p className="font-medium">📍 3222, Sector 57 Gurgaon, Haryana</p>
            <p>📞 +91 96800 46006</p>
            <p>✉ info@boxercise.club</p>
          </div>

          {/* Form */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 font-semibold text-white">Name</label>
              <input type="text" id="name" placeholder="Your Name" className="p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-semibold text-white">Email</label>
              <input type="email" id="email" placeholder="Your Email" className="p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400" />
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col">
              <label htmlFor="message" className="mb-1 font-semibold text-white">Message</label>
              <textarea id="message" placeholder="Your message..." rows={4} className="p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400" />
            </div>
            <div className="col-span-1 md:col-span-2 text-center">
              <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition">
                Send Message
              </button>
            </div>
          </form>
          {/* </div> */}
        </motion.div>
      </section>
    </main >
  );
};

export default AboutPage;