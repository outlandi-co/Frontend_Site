import { useContext } from 'react';
import AuthContext from '../components/context/AuthContext'; // ✅ Correct import

export const useAuth = () => {
    return useContext(AuthContext);
};
