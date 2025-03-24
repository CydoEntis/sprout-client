import LazyNavLink from "../../components/lazy-components/nav-link/LazyNavLink";
import styles from "./navlink.module.css";

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

VerticalNavigation.PrivateLinks = function PrivateLinks() {
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
    </>
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
