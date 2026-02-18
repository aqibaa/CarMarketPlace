"use client"
import React, { useState, useEffect } from 'react';
import { SendBirdProvider,Channel,ChannelList } from '@sendbird/uikit-react';
// import GroupChannelList from '@sendbird/uikit-react/GroupChannelList';
// import GroupChannel from '@sendbird/uikit-react/GroupChannel';
import '@sendbird/uikit-react/dist/index.css';
import { useSearchParams } from 'next/navigation';
export const dynamic = "force-dynamic";


function ChatInterface({ userId, user, appId }) {

  const searchParams = useSearchParams();
  const [currentChannelUrl, setCurrentChannelUrl] = useState(null);

  useEffect(() => {
    const channelUrl = searchParams.get('channel_url');
    if (channelUrl) {
      setCurrentChannelUrl(channelUrl);
    }
  }, [searchParams]);

  return (
    <div style={{ width: '100%', height: '85vh' }}>
      <SendBirdProvider
        appId={appId}
        userId={userId}
        nickname={user?.nickname}
        profileUrl={user?.imageUrl}
        allowProfileEdit={true}
      >
        <div className='grid grid-cols-1 md:grid-cols-3 h-full border rounded-xl overflow-hidden shadow-lg m-5'>
          <div className='p-2 border-r bg-white h-full'>
            <ChannelList
              activeChannelUrl={currentChannelUrl}
              onChannelSelect={(channel) => {
                setCurrentChannelUrl(channel?.url)
              }}
            />
          </div>
          <div className='md:col-span-2 h-full bg-gray-50'>
            {currentChannelUrl ? (
              <Channel channelUrl={currentChannelUrl} />
            ) : (
              <div className='flex flex-col items-center justify-center h-full text-gray-400 gap-2'>
                <h2 className='text-xl'>Select a chat to start messaging</h2>
              </div>
            )}
          </div>
        </div>
      </SendBirdProvider>
    </div>
  );
}
export default ChatInterface;