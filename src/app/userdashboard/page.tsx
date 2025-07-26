"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/src/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Card, CardContent } from "../../components/ui/card";

type Booking = {
  id: string;
  plan: string;
  trainer: string;
  date: string;
  timeSlot: string;
};

export default function UserDashboard() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (session?.user?.email) {
        const q = query(
          collection(db, "bookings"),
          where("userEmail", "==", session.user.email)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            plan: docData.plan ?? "",
            trainer: docData.trainer ?? "",
            date: docData.date ?? "",
            timeSlot: docData.timeSlot ?? "",
          };
        });
        setBookings(data);
      }
    };
    fetchBookings();
  }, [session]);

  if (!session) {
    return (
      <div className="text-center text-white p-8">
        <h2>Please login to view your dashboard.</h2>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-4 max-w-4xl mx-auto text-white"
    >
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {session.user?.name || "User"}!
      </h1>
      <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-400">You have no bookings yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {bookings.map((booking, idx) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-gray-800 text-white border border-gray-700">
                <CardContent className="p-4">
                  <p>
                    <strong>Plan:</strong> {booking.plan}
                  </p>
                  <p>
                    <strong>Trainer:</strong> {booking.trainer}
                  </p>
                  <p>
                    <strong>Date:</strong> {booking.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {booking.timeSlot}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

