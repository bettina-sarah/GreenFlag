import axios from 'axios';
import React, { useState, useEffect} from 'react';

const TestConnection = () => {
        const [message,SetMessage] = useState('');

    const testConnection = async () => {
        try{
            const response = await axios.get('http://127.0.0.1:5000/test');
            SetMessage(response.data.message);
        } catch (error){
            SetMessage('Connection failed!');
        }
    };
    
    return (
        <div>
            <button onClick={testConnection}>Test Connection</button>
            {message && <p>{message}</p>}
        </div>
    )

}

export default TestConnection;