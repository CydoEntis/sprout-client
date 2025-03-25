import ThemeToggle from "../../components/theme/ThemeToggle";
import LazyNavLink from "../../lazy-components/nav-link/LazyNavLink";
import styles from "./navlink.module.css";

const HorizontalNavLinks = () => {
  return null;
};

HorizontalNavLinks.Public = function Public() {
  return (
    <>
      <LazyNavLink to="/login" className={styles.navlink} activeClassName={styles.active}>
        Login
      </LazyNavLink>
      <LazyNavLink to="/register" className={styles.navlink} activeClassName={styles.active}>
        Register
      </LazyNavLink>
      <ThemeToggle />
    </>
  );
};

type PrivateProps = {
  onLogout: () => void;
};

HorizontalNavLinks.Private = function Private({ onLogout }: PrivateProps) {
  return (
    <>
      <LazyNavLink to="/categories" className={styles.navlink} activeClassName={styles.active}>
        Categories
      </LazyNavLink>
      <LazyNavLink to="/garden" className={styles.navlink} activeClassName={styles.active}>
        Garden
      </LazyNavLink>
      <LazyNavLink to="/account" className={styles.navlink} activeClassName={styles.active}>
        Account
      </LazyNavLink>
      <LazyNavLink className={styles.navlink} onClick={onLogout}>
        Logout
      </LazyNavLink>
      <ThemeToggle />
    </>
  );
};

HorizontalNavLinks.AlwaysShow = function AlwaysShow() {
  return <ThemeToggle />;
};

export default HorizontalNavLinks;
