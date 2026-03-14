import { useAuth } from "./AuthContext";

export default function NotAuthenticatedView({ children }) {
    const { user } = useAuth();
    return !user ? children : null;
}
