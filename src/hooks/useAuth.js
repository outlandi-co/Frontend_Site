import { useContext } from 'react';
import AuthContext from '../components/context/AuthContext'; // ✅ Correct relative import

export const useAuth = () => useContext(AuthContext);
