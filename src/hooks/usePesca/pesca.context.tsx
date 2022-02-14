import { PescaClient } from '@moneyboy/api/PescaClient';
import { PescaContext } from '@moneyboy/contexts/pescaContext';
import { useContext } from 'react';

export const usePesca = () => useContext(PescaContext) as PescaClient;
