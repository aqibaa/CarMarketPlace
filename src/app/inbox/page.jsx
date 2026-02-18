"use client"
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic'; 

const ChatInterface = dynamic(() => import('@/components/ChatInterface'), { 
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-screen">Loading Chat...</div>
});

function Inbox() {
  const { user } = useUser();
  const [userId, setUserId] = useState(null);
  const appId = process.env.NEXT_PUBLIC_SENDBIRD_APP_ID;

  useEffect(() => {
    if (user && user.primaryEmailAddress) {
      const id = (user.primaryEmailAddress.emailAddress).split('@')[0]; 
      setUserId(id);
    }
  }, [user]);

  if (!userId || !appId) {
    return (
      <div className="flex justify-center items-center h-screen gap-4 flex-col">
        <span className="loading loading-spinner text-primary"></span>
        <h2>Getting Chat Ready...</h2>
      </div>
    );
  }
  return (
    <div>
        <ChatInterface userId={userId} user={user} appId={appId} />
    </div>
  );
}

export default Inbox;