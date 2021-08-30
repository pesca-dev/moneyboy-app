export type PescaMenuContextType = {
  count: number;
  isOpen: boolean;
  open();
  close();
  register(fn: (n: number) => void);
};
