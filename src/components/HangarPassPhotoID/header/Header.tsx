/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import styles from "./Header.module.scss";
// import type { UploadProps } from "antd";
import { Card } from "antd";
import UploadAvatar from "../UploadAvatar/UploadAvatar";

// const props: UploadProps = {
//   name: "file",
//   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
//   headers: {
//     authorization: "authorization-text",
//   },
//   onChange(info) {
//     if (info.file.status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === "done") {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };

const Header: React.FC = () => {
  return (
    <>
      <div>
        <h3
          style={{
            textAlign: "center",
          }}
        >
          SIAEC HANGAR PHOTO-ID PASS (Permanent)
        </h3>
        <p
          style={{
            textAlign: "center",
          }}
        >
          For persons intending to work or visit SIAEC premises for a long
          period of time.<br />
          Company Registration Number: 198201025C
        </p>
      </div>
      {<UploadAvatar />}
      <div className={styles.siteCard}>
        <div className={styles.siteCardBorderLessWrapper}>
          <Card title="Note:" bordered={false}>
            <ol>
              <li>
                Attach a copy of NRIC or FIN & Passport when submitting this
                form. Copies of Airport Pass & SIA Staff Pass/Term Pass are
                required.
              </li>
              <li>
                The applicant's Manager must ensure that the applicant has also
                attended the SIAEC Safety Induction program prior to entering
                the hangar. Please check with SIAEC Safety for clarification.
              </li>
              <li>
                Applicant's Manager is responsible to return the hangar pass
                issued to the applicant on account of this declaration, when the
                applicant ceases to have an official duty/function in SIAEC
              </li>
              <li>
                A new self-declaration is required if a worker has not worked in
                SIAEC for a period exceeding 6 months.
              </li>
              <li>
                For persons intending to work in SIAEC or for long term visit to
                SIAEC premises.
              </li>
              <li>
                Annotate ‘N/A’ for item not applicable. All columns must be
                filled. Incomplete form or illegible submission will be
                rejected.
              </li>
              <li>
                Personal data in this form signed and submitted is deemed to
                have been given with consent.
              </li>
            </ol>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Header;
