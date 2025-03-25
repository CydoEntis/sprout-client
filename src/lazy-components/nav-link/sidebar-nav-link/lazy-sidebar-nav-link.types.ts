export type LazyNavLinkItem = {
    label: string;
    to: string;
    routePattern?: string;
    icon?: React.ReactNode;
    iconColor: string;
    childLinks: {
      label: string;
      to: string;
      routePattern?: string;
    }[]
  };