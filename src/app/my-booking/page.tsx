'use client';

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";



export default function MyBookings() {
  const [user] = useAuthState(auth);
  const [bookings, setBookings] = useState<{ id: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email) return;

      const q = query(
        collection(db, "bookings"),
        where("userEmail", "==", user.email)
      );

      const snapshot = await getDocs(q);
      const bookingData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(bookingData);
      setLoading(false);
    };

    fetchBookings();
  }, [user]);

  if (loading) return <p className="text-white p-4">Loading bookings...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking: any) => (
            <li key={booking.id} className="bg-gray-800 p-4 rounded-xl shadow">
              <p><strong>Plan:</strong> {booking.plan}</p>
              <p><strong>Trainer:</strong> {booking.trainer}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.timeSlot}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
