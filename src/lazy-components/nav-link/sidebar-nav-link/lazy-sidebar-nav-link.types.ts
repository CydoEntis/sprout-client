export type LazyNavLinkList = {
  sectionTitle?: string;
  links: LazyNavLinkItem[];
};

type ChildLink = {
  id?: number | string;
  label: string;
  to: string;
  routePattern?: string;
};

export type LazyNavLinkItem = {
  label: string;
  to?: string;
  routePattern?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  childLinks?: ChildLink[];
};
