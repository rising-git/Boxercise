'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import BookingFlow from '../../components/BookingFlow'; // Make sure this path is correct

export default function BookingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin?callbackUrl=/bookings');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="text-white p-10">
        <p className="text-lg">Checking authentication...</p>
      </div>
    );
  }

  if (status === 'authenticated') {
    return <BookingFlow session={session} />;
  }

  return null;
}
