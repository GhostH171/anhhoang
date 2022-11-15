import * as React from "react";
import { IButtonHeaderProps } from "./IButtonHeaderProps";
import styles from "./ButtonHeader.module.scss";
import { Icon } from "@fluentui/react/lib/Icon";
import { Link } from "react-router-dom";

const ButtonHeader: React.FC<IButtonHeaderProps> = (props) => {
  return (
    <div className={styles.btn}>
      <Link to="/Temporary/Form" className={styles.link}>
        <button className={styles.button}>
          <Icon iconName="PageAdd" className={styles.icon} />
          <span className={styles.text}>{props.title}</span>
        </button>
      </Link>
    </div>
  );
};

export default ButtonHeader;
