import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/api';

const LogOut = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate('/login'); // Redirect after logout
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogOut;
