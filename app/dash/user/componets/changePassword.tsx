import React, { useState } from 'react';

interface ChangePasswordProps {
    user: {
        userId: number;
        email: string;
        fullName: string;
        };
    token: string | null;
}

const ChangePassword = ({ user, token }: ChangePasswordProps) => {
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
            const response = await fetch(`http://localhost:3002/userspassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    current_password: formData.current_password,
                    new_password: formData.new_password,
                    user_id: user.userId
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            setStatus('Password changed successfully!');
            setFormData({ current_password: '', new_password: '', confirm_password: '' });
        } catch (error) {
            setStatus(`Error: ${error}`);
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
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Change Password</button>
            </form>
            {status && <p className="mt-4 font-semibold">{status}</p>}
        </div>
    );
};

export default ChangePassword;