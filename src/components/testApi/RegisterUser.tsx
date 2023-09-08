import { useState } from 'react';

const RegisterUser = () => {
    const [response, setResponse] = useState<string | null>(null);

    const handleRegister = async () => {
        try {
            const result = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // Your payload here
                })
            });
            const data = await result.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Register User</h2>
            <button onClick={handleRegister}>Send Request</button>
            <pre>{response}</pre>
        </div>
    );
}

export default RegisterUser;
