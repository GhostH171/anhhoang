import * as React from "react";
import styles from "./HangarPhotoIdHeader.module.scss";
import { IHangarPhotoIdHeaderProps } from "./IHangarPhotoIdHeaderProps";
// import type { UploadProps } from "antd";
import { Card } from "antd";
// import { message } from "antd";
import HangarPhotoIdUploadImage from "../HangarPhotoIdUploadImage/HangarPhotoIdUploadImage";

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

const HangarPhotoIdHeader: React.FC<IHangarPhotoIdHeaderProps> = (props) => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.header}`}>
        <div className={`${styles.title}`}>
          <h4>SIAEC HANGAR PHOTO-ID PASS ({`${props.title}`})</h4>
          <p>
            For persons intending to work or visit SIAEC premises for a long
            period of time.
            <br />
            Company Registration Number: 198201025C
          </p>
        </div>
        <div className={`${styles.imageHolder}`}>
          {<HangarPhotoIdUploadImage formType={`${props.formType}`} />}
        </div>
      </div>

      <div className={`${styles.siteCardWrapper}`}>
        <Card title="Note:" bordered={false}>
          <ol>
            <li>
              Attach a copy of <mark> NRIC or FIN & Passport </mark> when
              submitting this form. Copies of
              <mark> Airport Pass & SIA Staff Pass/Term Pass </mark> are
              required.
            </li>
            <li>
              The applicant&apos;s Manager must ensure that the applicant has
              also
              <mark> attended the SIAEC Safety Induction </mark> program prior
              to entering the hangar. Please check with SIAEC Safety for
              clarification.
            </li>
            <li>
              Applicant&apos;s Manager is responsible to return the hangar pass
              issued to the applicant on account of this declaration, when the
              applicant ceases to have an official duty/function in SIAEC
            </li>
            <li>
              A new self-declaration is required if a worker has not worked in
              SIAEC for a period exceeding 6 months.
            </li>
            <li>{props.diffContent}</li>
            <li>
              Annotate ‘N/A’ for item not applicable. All columns must be
              filled. Incomplete form or illegible submission will be rejected.
            </li>
            <li>
              Personal data in this form signed and submitted is deemed to have
              been given with consent.
            </li>
          </ol>
        </Card>
      </div>
    </div>
  );
};

export default HangarPhotoIdHeader;
