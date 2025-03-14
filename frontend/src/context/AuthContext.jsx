import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            let role = "trainee";
            let trainees = undefined;
            let trainer = undefined;

            if (email.includes("trainer")) {
                role = "trainer";
                trainees = ["trainee-1", "trainee-2", "trainee-3"];
            } else if (email.includes("admin")) {
                role = "admin";
            } else {
                trainer = "trainer-1";
            }

            const mockUser = {
                id: "user-1",
                name: "Keshav Jindal",
                email,
                avatar: "/avatar.png",
                role,
                ...(trainees && { trainees }),
                ...(trainer && { trainer }),
            };

            setUser(mockUser);
            localStorage.setItem("user", JSON.stringify(mockUser));
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (name, email, password, role = "trainee") => {
        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            let trainees = undefined;
            let trainer = undefined;

            if (role === "trainer") {
                trainees = [];
            } else if (role === "trainee") {
                trainer = "trainer-1";
            }

            const mockUser = {
                id: "user-" + Math.floor(Math.random() * 1000),
                name: "Keshav Jindal",
                email,
                role,
                ...(trainees && { trainees }),
                ...(trainer && { trainer }),
            };

            setUser(mockUser);
            localStorage.setItem("user", JSON.stringify(mockUser));
        } catch (error) {
            console.error("Signup failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                signup,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
