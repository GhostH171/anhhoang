import { Button } from "antd";
import * as React from "react";
import styles from "./ButtonsFooter.module.scss";
import { Icon } from "@fluentui/react/lib/Icon";

const ButtonsFooter: React.FC = () => {
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
            <Icon iconName="Save" className={`${styles.icon}`} />
            Save
          </Button>
          <Button
            form="hangarPassPhotoId"
            key="submit"
            htmlType="submit"
            className={`${styles.btnCommon} ${styles.submitBtn}`}
          >
            <Icon iconName="PublishContent" className={`${styles.icon}`} />
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonsFooter;
