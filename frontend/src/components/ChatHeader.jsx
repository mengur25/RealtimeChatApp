import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import Avatar from './Avatar';
import { X } from 'lucide-react';

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    return (
        <div className='p-2.5 border-b border-base-300'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    {/* Avatar */}
                    <div className='avatar'>
                        <div className='relative rounded-full size-10'>
                            {selectedUser.profilePic ? (
                                <img
                                    src={selectedUser.profilePic}
                                    alt={selectedUser.fullName}
                                    className='w-10 h-10 object-cover rounded-full'
                                />
                            ) : (
                                <Avatar
                                    fullName={selectedUser.fullName}
                                    width="w-10"
                                    height="h-10"
                                    style="text-base"
                                />
                            )}
                        </div>
                    </div>

                    {/* User info */}
                    <div>
                        <h3 className='font-medium'>{selectedUser.fullName}</h3>
                        <p className='text-sm text-base-content/70'>
                            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                {/* Close Btn */}
                <button onClick={() => setSelectedUser(null)}>
                    <X/>
                </button>
            </div>
        </div>
    )
}

export default ChatHeader