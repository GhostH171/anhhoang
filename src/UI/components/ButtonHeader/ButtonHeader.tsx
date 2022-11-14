import * as React from "react";
import { IButtonHeaderProps } from "./IButtonHeaderProps";
import styles from "./ButtonHeader.module.scss";
import { Icon } from "@fluentui/react/lib/Icon";

const ButtonHeader: React.FunctionComponent<IButtonHeaderProps> = (props) => {
  return (
    <div className={`${styles.btn}`}>
      <a href={`${props.link}`}>
        <button className={`${styles.button}`}>
          <Icon iconName="PageAdd" className={`${styles.icon}`} />
          <span className={`${styles.text}`}>{props.title}</span>
        </button>
      </a>
    </div>
  );
};

export default ButtonHeader;
