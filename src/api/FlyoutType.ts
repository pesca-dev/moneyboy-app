import { ReactNode } from 'react';

export type FlyoutType = {
  open: () => void;
  close: () => void;
  setChildren: (children: ReactNode, open?: boolean) => void;
};
