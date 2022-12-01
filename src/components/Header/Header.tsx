import styles from "./Header.module.css";
import Logo from "../../assets/rocket.svg";

export function Header() {
  return (
    <header>
      <img src={Logo} alt="Logo" />
      <span>
        to<span className={styles.do}>do</span>
      </span>
    </header>
  );
}
