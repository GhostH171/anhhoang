import * as React from "react";
import { IViewEditHeaderProps } from "./IViewEditHeaderProps";
import styles from "./ViewEditHeader.module.scss";
import { Icon } from "@fluentui/react/lib/Icon";

const ViewEditHeader: React.FunctionComponent<IViewEditHeaderProps> = () => {
  return (
    <>
      <div className={`${styles.topHeader}`}>
        <b>Request #:{}</b>
        <b>Date:1/2/2010</b>
      </div>
      <div className={`${styles.bottomHeader}`}>
        <span>
          <b>Requestor: </b>SharePoint TestUser5
        </span>
        <Icon iconName="ChevronRight" className={`${styles.icon}`} />
        <span>
          <b>Approver: </b>SharePoint TestUser5
        </span>
        <Icon iconName="ChevronRight" className={`${styles.icon}`} />
        <span className={`${styles.textMute}`}>
          <b>Status: </b>Approved{" "}
        </span>
        <Icon
          iconName="StatusCircleCheckmark"
          className={`${styles.iconApproved}`}
        />
      </div>
    </>
  );
};

export default ViewEditHeader;
