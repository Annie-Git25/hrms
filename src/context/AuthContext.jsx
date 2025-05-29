// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // Will store user with role
  const [loading, setLoading] = useState(true); // Optional: useful for guarding routes

  const fetchUserDetails = async (authUser) => {
    // Fetch extended user details from your Supabase DB
    const { data, error } = await supabase
      .from('users')
      .select('id, email, full_name, role') // add more fields if needed
      .eq('id', authUser.id)
      .single();

    if (error) {
      console.error('Failed to fetch user details:', error.message);
      return null;
    }

    return {
      ...authUser,
      ...data, // merges role and other user-specific fields
    };
  };

  useEffect(() => {
    const initAuth = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const fullUser = await fetchUserDetails(authUser);
        setUser(fullUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const fullUser = await fetchUserDetails(session.user);
          setUser(fullUser);
        } else {
          setUser(null);
        }
      }
    );

    initAuth();
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
