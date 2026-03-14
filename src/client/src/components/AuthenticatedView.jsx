import { useAuth } from "./AuthContext";

export default function AuthenticatedView({ children }) {
    const { user } = useAuth();
    return user ? children : null;
}
