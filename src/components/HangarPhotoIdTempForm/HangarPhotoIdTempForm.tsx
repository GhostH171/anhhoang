import * as React from "react";
import styles from "./HangarPhotoIdTempForm.module.scss";
import HangarPhotoIdHeader from "../../UI/components/HangarPhotoIdHeader/HangarPhotoIdHeader";
import HangarPhotoIdTempFormBody from "./body/HangarPhotoIdTempFormBody";
import { IHangarPhotoIdTempProps } from "./IHangarPhotoIdTempForm";
import Footer from "../../UI/components/footer/Footer";
import ButtonsFooter from "../../UI/components/ButtonsFooter/ButtonsFooter";
import ViewEditHeader from "../../UI/components/ViewEditHeader/ViewEditHeader";

const HangarPhotoIdTempForm: React.FunctionComponent<
  IHangarPhotoIdTempProps
> = () => {
  return (
    <>
      <ViewEditHeader />
      <div className={`${styles.container}`}>
        <HangarPhotoIdHeader
          title="Temporary"
          diffContent="For persons intending to work in (projects) or visit SIAEC premises for a short period of time (3 months to a year)"
          formType="Temporary"
        />
        <HangarPhotoIdTempFormBody />
      </div>
      <ButtonsFooter />
      <Footer />
    </>
  );
};

export default HangarPhotoIdTempForm;
