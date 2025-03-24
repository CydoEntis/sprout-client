import { Stack, StackProps } from "@mantine/core";

import styles from "./lazy-vertical-navbar.module.css";

type LazyVerticalNavbarProps = {
  logo: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
} & StackProps;

function LazyVerticalNavbar({ logo, navbar, footer }: LazyVerticalNavbarProps) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.header}>{logo}</div>
      <Stack className={styles.links} mt={12} gap={10} p={8}>
        {navbar}
      </Stack>
      <div className={styles.footer}>{footer}</div>
    </nav>
  );
}

export default LazyVerticalNavbar;
