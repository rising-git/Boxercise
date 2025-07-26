'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p className="p-6">Loading...</p>;
  if (!session) redirect('/login');

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>

      <div className="bg-white rounded shadow p-6 max-w-md">
        <div className="flex items-center gap-4">
          {session.user?.image && (
            <Image
              src={session.user.image}
              alt="Profile Image"
              width={64}
              height={64}
              className="rounded-full"
            />
          )}
          <div>
            <p className="text-xl font-semibold">{session.user?.name}</p>
            <p className="text-gray-600">{session.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
