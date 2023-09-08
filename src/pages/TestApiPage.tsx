import React from 'react';
import RegisterUser from '../components/testApi/RegisterUser';
//... import other components

const TestApiPage: React.FC = () => {
    return (
        <div>
            <h1>API Testing</h1>
            <RegisterUser />
            {/* Include other components here */}
        </div>
    );
}

export default TestApiPage;
