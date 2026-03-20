"use client"
import { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

const API_BASE = 'http://localhost:3002';

interface Notification {
    notification_id: number;
    type: string;
    message: string;
    is_read: number;
    created_at: string;
}

export default function NotificationBell({ role }: { role: 'client' | 'lawyer' | 'admin' }) {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!user) return;
        const fetchNotifications = async () => {
            try {
                // Ensure backward compatibility with potential user ID fields depending on auth context specifics
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const userId = user.userId || (user as any).id || (user as any).user_id;
                if(!userId) return;

                const res = await fetch(`${API_BASE}/notifications/${role}/${userId}`);
                if (res.ok) {
                    const data = await res.json();
                    setNotifications(data);
                }
            } catch (err) {
                console.warn("Failed to fetch notifications API request. It might be down or blocking queries", err);
            }
        };

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000); // Check every 30s
        return () => clearInterval(interval);
    }, [user, role]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAsRead = async (id: number) => {
        try {
            await fetch(`${API_BASE}/notifications/${id}/read`, { method: 'PUT' });
            setNotifications(prev => prev.map(n => n.notification_id === id ? { ...n, is_read: 1 } : n));
        } catch (err) {
            console.error("Failed to mark notification as read", err);
        }
    };

    const unreadCount = notifications.filter(n => !n.is_read).length;

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="relative p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-100"
                title="Notifications"
            >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden transform opacity-100 scale-100 transition-all origin-top-right">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{unreadCount} new</span>
                        )}
                    </div>
                    <div className="max-h-[28rem] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                                <Bell className="w-12 h-12 text-gray-200 mb-3" />
                                <p className="text-sm font-medium">You&apos;re all caught up!</p>
                                <p className="text-xs text-gray-400 mt-1">Check back later for new alerts.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {notifications.map(notif => (
                                    <div 
                                        key={notif.notification_id} 
                                        onClick={() => !notif.is_read && markAsRead(notif.notification_id)}
                                        className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 flex gap-3 ${!notif.is_read ? 'bg-blue-50/30' : ''}`}
                                    >
                                        {!notif.is_read && (
                                            <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full flex-shrink-0" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm ${!notif.is_read ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
                                                {notif.message}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1.5 font-medium">
                                                {new Date(notif.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
