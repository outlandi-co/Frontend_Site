import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const UserProfile = ({ userId }) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Fetch user data here
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`/api/users/profile`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                } else {
                    console.error('Failed to fetch user profile');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserInfo();
    }, [userId]);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            {/* Add more user details and the ability to update */}
        </div>
    );
};

// Add prop validation
UserProfile.propTypes = {
    userId: PropTypes.string.isRequired,  // Validate userId prop
};

export default UserProfile;
