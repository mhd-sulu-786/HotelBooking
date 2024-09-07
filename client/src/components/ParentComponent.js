// ParentComponent.js
import React, { useState } from 'react';
import Login from './Login';

const ParentComponent = () => {
    const [user, setUser] = useState(null);

    return (
        <div>
            <Login setUser={setUser} />
            {/* Other components */}
        </div>
    );
};

export default ParentComponent;
