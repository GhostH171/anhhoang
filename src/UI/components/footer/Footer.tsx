import * as React from "react";
import { IFooterProps } from "./IFooterProps";
import styles from "./Footer.module.scss";

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <div className={`${styles.footerContainer}`}>
      <p className={`${styles.text}`}>
        © 2018 Singapore Airlines. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
