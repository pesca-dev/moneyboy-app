import { AuthContext, AuthContextType } from '@moneyboy/contexts/authContext';
// eslint-disable-next-line no-restricted-imports
import { useContext } from 'react';

export const useAuth: () => AuthContextType = () => useContext(AuthContext);
