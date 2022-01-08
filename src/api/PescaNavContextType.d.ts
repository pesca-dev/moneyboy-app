export type PescaNavContextScreen = {
  name: string;
  params?: unknown;
};

export type PescaNavContextType<N = unknown> = {
  screens: PescaNavContextScreen[];
  current: number;
  register(name: string): void;
  unregister(name: string): void;
  navigate(name: string): void;
  next(params?: N): void;
  back(): void;
  close(): void;
};
