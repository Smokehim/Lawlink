import React, { useState } from 'react';

const API_BASE = 'http://localhost:3002';

interface ChangePasswordProps {
    user: { email: string } | null;
}

const ChangePassword = ({ user }: ChangePasswordProps) => {
    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        confirm_password: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        if (formData.new_password !== formData.confirm_password) {
            setStatus('New passwords do not match.');
            return;
        }
        setStatus('Changing password...');

        try {
            const res = await fetch(`${API_BASE}/lawyers/password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    current_password: formData.current_password,
                    new_password: formData.new_password
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Password change failed');
            setStatus('Password changed successfully!');
            setFormData({ current_password: '', new_password: '', confirm_password: '' });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            setStatus(`Error: ${errorMessage}`);
        }
    };

    if (!user) return null;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="password"
                    name="current_password"
                    value={formData.current_password}
                    onChange={handleChange}
                    placeholder="Current Password"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    name="new_password"
                    value={formData.new_password}
                    onChange={handleChange}
                    placeholder="New Password"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    placeholder="Confirm New Password"
                    className="w-full p-2 border rounded"
                    required
                />
                <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Change Password</button>
            </form>
            {status && <p className="mt-4 font-semibold">{status}</p>}
        </div>
    );
};

export default ChangePassword;
