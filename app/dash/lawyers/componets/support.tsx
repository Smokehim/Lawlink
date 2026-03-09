import React, { useState } from 'react';

interface SupportFormProps {
    lawyerId: string | number;
    authToken: string;
}

const SupportForm = ({ lawyerId, authToken }: SupportFormProps) => {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending...');

        try {
            const response = await fetch('http://localhost:3002/support/contact-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    sender_id: lawyerId,
                    sender_role: 'lawyer',
                    message_text: message,
                })
            });

            console.log(`Support contact response status: ${response.status}`);
            const data = await response.json();
            console.log('Support contact data:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send message.');
            }

            setStatus('Message sent successfully!');
            setMessage('');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Error sending support message:', error);
            setStatus(`Error: ${error.message}`);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-bold mb-4">Contact Support</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue..."
                    required
                    rows={4}
                />
                <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Send Message</button>
            </form>
            {status && <p className="mt-2 text-sm font-medium text-gray-700">{status}</p>}
        </div>
    );
};

export default SupportForm;
