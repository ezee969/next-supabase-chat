import React, { Suspense } from 'react';
import ListMessages from './ListMessages';
import { supabaseServer } from '@/lib/supabase/server';
import InitMessages from '@/lib/store/initMessages';
import { LIMIT_MESSAGES } from '@/lib/constant';

const ChatMessages = async () => {
  const supabase = supabaseServer();

  const { data } = await supabase
    .from('messages')
    .select('*,users(*)')
    .range(0, LIMIT_MESSAGES)
    .order('created_at', { ascending: false });

  return (
    <Suspense fallback={'loading...'}>
      <ListMessages />
      <InitMessages messages={data?.reverse() || []} />
    </Suspense>
  );
};

export default ChatMessages;
