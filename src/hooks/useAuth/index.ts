import { AuthContext, AuthContextType } from '@moneyboy/contexts/authContext';
import { useContext } from 'react';

export const useAuth: () => AuthContextType = () => useContext(AuthContext);
