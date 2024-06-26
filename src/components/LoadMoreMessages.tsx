'use client';

import React from 'react';
import { Button } from './ui/button';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { LIMIT_MESSAGES } from '@/lib/constant';
import { getFromAndTo } from '@/lib/utils';
import { useMessage } from '@/lib/store/messages';
import { toast } from 'sonner';

const LoadMoreMessages = () => {
  const page = useMessage((state) => state.page);
  const setMessages = useMessage((state) => state.setMessages);
  const hasMore = useMessage((state) => state.hasMore);

  const fetchMore = async () => {
    const supabase = supabaseBrowser();
    const { from, to } = getFromAndTo(page, LIMIT_MESSAGES);

    const { data, error } = await supabase
      .from('messages')
      .select('*,users(*)')
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setMessages(data?.reverse() || []);
    }
  };

  if (!hasMore) return null;

  return (
    <Button onClick={fetchMore} className="w-full" variant={'outline'}>
      Load More
    </Button>
  );
};

export default LoadMoreMessages;
