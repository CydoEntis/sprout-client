import { Stack } from "@mantine/core";
import LazyNavLink from "../../components/lazy-components/nav-link/LazyNavLink";
import styles from "./navlink.module.css";
import ThemeToggle from "../../components/theme/ThemeToggle";

const VerticalNavigation = () => {
  return null;
};

VerticalNavigation.PublicLinks = function PublicLinks() {
  return (
    <>
      <LazyNavLink to="/login" className={styles.navlink} activeClassName={styles.active}>
        Login
      </LazyNavLink>
      <LazyNavLink to="/register" className={styles.navlink} activeClassName={styles.active}>
        Register
      </LazyNavLink>
    </>
  );
};

type PrivateLinksProps = {
  onLogout: () => void;
};

VerticalNavigation.PrivateLinks = function PrivateLinks({ onLogout }: PrivateLinksProps) {
  return (
    <Stack justify="space-between" flex={1}>
      <Stack>
        <LazyNavLink to="/categories" className={styles.navlink} activeClassName={styles.active}>
          Categories
        </LazyNavLink>
        <LazyNavLink to="/garden" className={styles.navlink} activeClassName={styles.active}>
          Garden
        </LazyNavLink>
        <LazyNavLink to="/account" className={styles.navlink} activeClassName={styles.active}>
          Account
        </LazyNavLink>
      </Stack>
      <Stack>
        <LazyNavLink className={styles.navlink} onClick={onLogout}>
          Logout
        </LazyNavLink>
        <ThemeToggle />
      </Stack>
    </Stack>
  );
};

type LogoutProps = {
  onLogout: () => void;
};

VerticalNavigation.Logout = function Logout({ onLogout }: LogoutProps) {
  return (
    <>
      <LazyNavLink className={styles.navlink} onClick={onLogout}>
        Logout
      </LazyNavLink>
    </>
  );
};

export default VerticalNavigation;
