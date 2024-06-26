'use client';
// Utils
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useRouter } from 'next/navigation';
// Components/ui
import { Button } from './ui/button';
// Types
import { User } from '@supabase/supabase-js';
import ChatPresence from './ChatPresence';

interface ChatHeaderProps {
  user: User | undefined;
}
const ChatHeader = ({ user }: ChatHeaderProps) => {
  const router = useRouter();

  const handleLoginWithGithub = () => {
    const supabase = supabaseBrowser();

    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: location.origin + '/auth/callback',
      },
    });
  };

  const handleLogout = async () => {
    const supabase = supabaseBrowser();

    await supabase.auth.signOut();

    router.refresh();
  };

  return (
    <div className="h-20">
      <div className="p-5 border-b flex items-center justify-between h-full">
        <div>
          <h1 className="text-xl font-bold">Daily Chat</h1>
          <ChatPresence />
        </div>
        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button onClick={handleLoginWithGithub}>Login</Button>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
