import { useContext } from "react";
import AuthContext from "../components/context/AuthContext"; // ✅ Make sure the path is correct

export const useAuth = () => useContext(AuthContext);
