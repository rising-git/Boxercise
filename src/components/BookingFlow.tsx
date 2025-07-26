// 'use client';

// import React, { useEffect, useState } from 'react';
// import { auth, db } from '@/lib/firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { useSession } from 'next-auth/react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { fadeInUp } from '@/lib/motionVariantss'; // Make sure this import is correct

// export default function BookingFlow() {
//   const { data: session } = useSession();

//   const [plan, setPlan] = useState('');
//   const [trainer, setTrainer] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');
//   const [timeSlot, setTimeSlot] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const timeSlots = [
//     '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM',
//     '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
//   ];

//   // Load saved state from localStorage
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem('booking-data') || '{}');
//     setPlan(saved.plan || '');
//     setTrainer(saved.trainer || '');
//     setSelectedDate(saved.selectedDate || '');
//     setTimeSlot(saved.timeSlot || '');
//   }, []);

//   // Track Firebase auth status
//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => {
//       setIsLoggedIn(!!user);
//     });
//     return () => unsub();
//   }, []);

//   // Save state to localStorage
//   useEffect(() => {
//     localStorage.setItem(
//       'booking-data',
//       JSON.stringify({ plan, trainer, selectedDate, timeSlot })
//     );
//   }, [plan, trainer, selectedDate, timeSlot]);

//   const getToday = () => {
//     const now = new Date();
//     return now.toISOString().split('T')[0];
//   };

//   const handleBooking = async () => {
//     if (!plan || !trainer || !selectedDate || !timeSlot) {
//       alert('⚠️ Please complete all selections before booking.');
//       return;
//     }
//     if (!session?.user?.email) {
//       alert('⚠️ Please sign in to confirm your booking.');
//       return;
//     }
//     setLoading(true);
//     try {
//       await addDoc(collection(db, 'bookings'), {
//         userEmail: session.user.email,
//         plan,
//         trainer,
//         date: selectedDate,
//         timeSlot,
//         timestamp: serverTimestamp(),
//       });
//       setSuccess(true);
//     } catch (error) {
//       console.error('Booking failed:', error);
//       alert('❌ Something went wrong while booking.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={fadeInUp}
//       className="min-h-screen bg-[#0f172a] text-white p-6 pt-24"
//     >
//       <div className="max-w-5xl mx-auto space-y-6">

//         {/* Header */}
//         <motion.div variants={fadeInUp} className="text-center">
//           <h2 className="text-3xl font-extrabold">
//             <span className="text-white">Book </span>
//             <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400">
//               Your Training Session
//             </span>
//           </h2>
//           <p className="text-gray-400 mt-2">
//             Choose your preferred trainer, session type, and time. Let’s get started!
//           </p>
//         </motion.div>

//         {/* Plan Selection */}
//         <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-[#111827] rounded-xl p-4 shadow space-y-3">
//             <h3 className="text-xl font-semibold mb-2">Select Your Plan</h3>
//             {[
//               { title: 'Lite', price: '₹129', duration: '1 Week', badge: '' },
//               { title: 'Active', price: '₹165', duration: '1 Month', badge: 'Most Popular' },
//               { title: 'Elite', price: '₹189', duration: '3 Months', badge: 'Best Value' },
//             ].map(({ title, price, duration, badge }) => (
//               <div
//                 key={title}
//                 onClick={() => setPlan(title)}
//                 className={`cursor-pointer border p-3 rounded-lg ${
//                   plan === title ? 'border-blue-500 bg-gray-800' : 'border-gray-700'
//                 }`}
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="font-semibold">{title}</p>
//                     <p className="text-xs text-gray-400">{duration}</p>
//                   </div>
//                   <div className="text-sm font-bold text-blue-400">{price}</div>
//                 </div>
//                 {badge && <span className="text-xs text-yellow-400 mt-1 inline-block">⭐ {badge}</span>}
//               </div>
//             ))}
//           </div>

//           {/* Trainer Selection */}
//           <div className="bg-[#111827] rounded-xl p-4 shadow space-y-3">
//             <h3 className="text-xl font-semibold mb-2">Choose Your Coach</h3>
//             {[
//               { name: 'Ankit Yadav', role: 'HIIT Expert' },
//               { name: 'Riya Verma', role: 'Yoga Coach' },
//               { name: 'Harsh Patel', role: 'Boxing Trainer' },
//             ].map(({ name, role }) => (
//               <div
//                 key={name}
//                 onClick={() => setTrainer(name)}
//                 className={`cursor-pointer border p-3 rounded-lg ${
//                   trainer === name ? 'border-blue-500 bg-gray-800' : 'border-gray-700'
//                 }`}
//               >
//                 <p className="font-semibold">{name}</p>
//                 <p className="text-sm text-gray-400">{role}</p>
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Date & Time Selection */}
//         <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-[#111827] rounded-xl p-4 shadow space-y-3">
//             <label htmlFor="date" className="text-xl font-semibold mb-2 block">Select Date</label>
//             <input
//               id="date"
//               type="date"
//               min={getToday()}
//               className="w-full p-3 rounded-md bg-gray-800 text-white"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//             />
//           </div>

//           <div className="bg-[#111827] rounded-xl p-4 shadow space-y-3">
//             <h3 className="text-xl font-semibold mb-2">Pick a Time Slot</h3>
//             <div className="grid grid-cols-4 gap-2">
//               {timeSlots.map((slot) => (
//                 <button
//                   key={slot}
//                   onClick={() => setTimeSlot(slot)}
//                   className={`py-2 rounded text-sm ${
//                     timeSlot === slot ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
//                   }`}
//                 >
//                   {slot}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         {/* Booking Summary */}
//         <motion.div variants={fadeInUp} className="bg-[#111827] rounded-xl p-4 shadow space-y-3">
//           <h3 className="text-xl font-semibold mb-2">Booking Summary</h3>
//           <ul className="text-sm text-gray-300 space-y-1">
//             <li><strong>Plan:</strong> {plan || 'Not selected'}</li>
//             <li><strong>Trainer:</strong> {trainer || 'Not selected'}</li>
//             <li><strong>Date:</strong> {selectedDate || 'Not selected'}</li>
//             <li><strong>Time:</strong> {timeSlot || 'Not selected'}</li>
//           </ul>
//           <button
//             onClick={handleBooking}
//             disabled={loading}
//             className="w-full py-2 rounded text-white font-semibold bg-gradient-to-r from-blue-600 via-purple-500 to-orange-400 hover:opacity-90 transition"
//           >
//             {loading ? 'Booking...' : 'Book Session Now'}
//           </button>
//           <AnimatePresence>
//             {success && (
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="text-green-400 mt-2"
//               >
//                 🎉 Booking successful and saved!
//               </motion.p>
//             )}
//           </AnimatePresence>
//         </motion.div>

//       </div>
//     </motion.div>
//   );
// }

'use client';

import React, { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp } from '@/lib/motionVariantss';

export default function BookingFlow() {
  const { data: session } = useSession();

  const [plan, setPlan] = useState('');
  const [category, setCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const generateSlots = (start: string, end: string) => {
    const slots = [];
    const [sH, sM] = start.split(':').map(Number);
    const [eH, eM] = end.split(':').map(Number);
    let startTime = new Date();
    startTime.setHours(sH, sM, 0, 0);
    let endTime = new Date();
    endTime.setHours(eH < sH ? eH + 24 : eH, eM, 0, 0);

    while (startTime < endTime) {
      slots.push(startTime.toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit', hour12: true
      }));
      startTime = new Date(startTime.getTime() + 60 * 60 * 1000);
    }
    return slots;
  };

  const morningSlots = generateSlots("03:30", "09:30");
  const eveningSlots = generateSlots("16:30", "01:00");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('booking-data') || '{}');
    setPlan(saved.plan || '');
    setCategory(saved.category || '');
    setSelectedDate(saved.selectedDate || '');
    setTimeSlot(saved.timeSlot || '');
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    localStorage.setItem('booking-data', JSON.stringify({ plan, category, selectedDate, timeSlot }));
  }, [plan, category, selectedDate, timeSlot]);

  const getToday = () => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  };

  const handleBooking = async () => {
    if (!plan || !category || !selectedDate || !timeSlot) {
      alert('⚠️ Please complete all selections before booking.');
      return;
    }
    if (!session?.user?.email) {
      alert('⚠️ Please sign in to confirm your booking.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        userEmail: session.user.email,
        plan,
        category,
        date: selectedDate,
        timeSlot,
        timestamp: serverTimestamp(),
      });
      setSuccess(true);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('❌ Something went wrong while booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="min-h-screen bg-[#0f172a] text-white p-6 pt-24"
    >
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center">
          <h2 className="text-3xl font-extrabold">
            <span className="text-white">Book </span>
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400">
              Your Training Session
            </span>
          </h2>
          <p className="text-gray-400 mt-2">
            Choose your preferred training type, session plan, and time. Let’s get started!
          </p>
        </motion.div>

        {/* Plan Selection */}
        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111827] rounded-xl p-4 shadow space-y-3">
            <h3 className="text-xl font-semibold mb-2">Select Your Plan</h3>
            {[
              { title: 'Lite', price: '₹10999', duration: '1 Month ', badge: '' },
              { title: 'Active', price: '₹13999', duration: '1 Month', badge: 'Most Popular' },
              { title: 'Elite', price: '₹15999', duration: '1 Months', badge: 'Best Value' },
              { title: '3-Month', price: '₹33999', /*duration: '12 Weeks'*/ badge: '' },
              { title: '6-Month', price: '₹64999', /*duration: '36 Weeks'*/ badge: '' },
            ].map(({ title, price, duration, badge }) => (
              <div
                key={title}
                onClick={() => setPlan(title)}
                className={`cursor-pointer border p-3 rounded-lg ${plan === title ? 'border-blue-500 bg-gray-800' : 'border-gray-700'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="text-xs text-gray-400">{duration}</p>
                  </div>
                  <div className="text-sm font-bold text-blue-400">{price}</div>
                </div>
                {badge && <span className="text-xs text-yellow-400 mt-1 inline-block">⭐ {badge}</span>}
              </div>
            ))}
          </div>

          {/* Category Selection */}
          <div className="bg-[#111827] rounded-xl p-4 shadow space-y-3">
            <h3 className="text-xl font-semibold mb-2">Select Category</h3>
            {['🥊 Boxing Fitness', '💪 Strength and Muscle Building', '🧘Hatha Yoga','🛠️ Posture Correction & Rehab','🤸 Calisthenics & Bodyweight Training','🍽️ Nutrition Coaching'].map((type) => (
              <div
                key={type}
                onClick={() => setCategory(type)}
                className={`cursor-pointer border p-3 rounded-lg ${category === type ? 'border-blue-500 bg-gray-800' : 'border-gray-700'}`}
              >
                <p className="font-semibold">{type}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Date & Time Selection */}
        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111827] rounded-xl p-4 shadow space-y-3">
            <label htmlFor="date" className="text-xl font-semibold mb-2 block">Select Date</label>
            <input
              id="date"
              type="date"
              min={getToday()}
              className="w-full p-3 rounded-md bg-gray-800 text-white"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="bg-[#111827] rounded-xl p-4 shadow space-y-3">
            <h3 className="text-xl font-semibold mb-2">Pick a Time Slot</h3>
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-2">🌅 Morning Shift</p>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {morningSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 rounded text-sm ${timeSlot === slot ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <p className="text-sm font-semibold text-gray-400 mb-2">🌙 Evening Shift</p>
              <div className="grid grid-cols-4 gap-2">
                {eveningSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 rounded text-sm ${timeSlot === slot ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Booking Summary */}
        <motion.div variants={fadeInUp} className="bg-[#111827] rounded-xl p-4 shadow space-y-3">
          <h3 className="text-xl font-semibold mb-2">Booking Summary</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li><strong>Plan:</strong> {plan || 'Not selected'}</li>
            <li><strong>Category:</strong> {category || 'Not selected'}</li>
            <li><strong>Date:</strong> {selectedDate || 'Not selected'}</li>
            <li><strong>Time:</strong> {timeSlot || 'Not selected'}</li>
          </ul>
          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full py-2 rounded text-white font-semibold bg-gradient-to-r from-blue-600 via-purple-500 to-orange-400 hover:opacity-90 transition"
          >
            {loading ? 'Booking...' : 'Book Session Now'}
          </button>
          <AnimatePresence>
            {success && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-green-400 mt-2"
              >
                🎉 Booking successful and saved!
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </motion.div>
  );
}
