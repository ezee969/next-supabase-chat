import { Imessage, useMessage } from '@/lib/store/messages';
import Image from 'next/image';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useUser } from '@/lib/store/user';
const Message = ({ data }: { data: Imessage }) => {
  const user = useUser((state) => state.user);

  return (
    <div className="flex gap-2">
      <div>
        <Image
          src={data.users?.avatar_url!}
          width={50}
          height={50}
          className="rounded-full ring-2"
          alt={data.users?.display_name!}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1 justify-between">
          <div>
            <h1 className="font-bold">{data.users?.display_name}</h1>
            <h1 className="text-sm text-gray-400">
              {new Date(data.created_at).toDateString()}
            </h1>
            {data.is_edit && <h1 className="text-sm text-gray-400"> - Edited</h1>}
          </div>
          {data.users?.id === user?.id && <MessageMenu data={data} />}
        </div>
        <p className="text-gray-300">{data.text}</p>
      </div>
    </div>
  );
};

export default Message;

const MessageMenu = ({ data }: { data: Imessage }) => {
  const setActionMessage = useMessage((state) => state.setActionMessage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            document.getElementById('trigger-edit')?.click();
            setActionMessage(data);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            document.getElementById('trigger-delete')?.click();
            setActionMessage(data);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
