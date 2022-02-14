import { PescaClient } from '@moneyboy/api/PescaClient';
import { PescaContext } from '@moneyboy/contexts/pescaContext';
// eslint-disable-next-line no-restricted-imports
import { useContext } from 'react';

export const usePesca = () => useContext(PescaContext) as PescaClient;
