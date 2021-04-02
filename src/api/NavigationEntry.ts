/**
 * All information needed for a NavigationEntry.
 */
export type NavigationEntry = {
  /**
   * Name of the route.
   */
  name: string;
  /**
   * Component of the route.
   */
  component: React.ComponentType<any>;
  /**
   * Icon for the tab.
   */
  icon: string;
  /**
   * Flag for disabled navigation.
   */
  disabled?: boolean;
};
