export type PescaNavContextScreen = {
  name: string;
  params?: any;
};

export type PescaNavContextType = {
  screens: PescaNavContextScreen[];
  current: number;
  register(name: string): void;
  unregister(name: string): void;
  navigate(name: string): void;
  next(params?: any): void;
  back(): void;
};
