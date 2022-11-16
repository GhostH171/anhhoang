import { Button } from "antd";
import * as React from "react";
import styles from "./ButtonsFooter.module.scss";
import { Icon } from "@fluentui/react/lib/Icon";

const ButtonsFooterEdit: React.FC = () => {
  return (
    <div className={`mb-3 ${styles.btn}`}>
      <div className={`btn-block no-underline`}>
        <div
          style={{ display: "flex", alignItems: "center", paddingLeft: "4px" }}
          className={`${styles.button} btn-block text-left`}
        >
          <Button className={`${styles.btnCommon} ${styles.backBtn}`}>
            <Icon iconName="SkypeArrow" className={`${styles.icon}`} />
            Back
          </Button>
          <Button className={`${styles.btnCommon} ${styles.saveBtn}`}>
            <Icon iconName="SingleColumnEdit" className={`${styles.icon}`} />
            Edit
          </Button>
          <Button
            form="hangarPassPhotoId"
            key="submit"
            htmlType="submit"
            className={`${styles.btnCommon} ${styles.submitBtn}`}
          >
            <Icon iconName="RepeatAll" className={`${styles.icon}`} />
            Reapply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonsFooterEdit;
