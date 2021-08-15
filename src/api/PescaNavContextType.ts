export type PescaNavContextScreen = {
  name: string;
  params?: any;
};

export type PescaNavContextType<N = any> = {
  screens: PescaNavContextScreen[];
  current: number;
  register(name: string): void;
  unregister(name: string): void;
  navigate(name: string): void;
  next(params?: N): void;
  back(): void;
  close(): void;
};
