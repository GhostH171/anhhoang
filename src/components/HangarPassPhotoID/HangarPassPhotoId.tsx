import * as React from "react";
import "antd/dist/antd.css";
import Body from "./body/Body";
import styles from "./HangarPassPhotoId.module.scss";
import HangarPhotoIdHeader from "../../UI/components/HangarPhotoIdHeader/HangarPhotoIdHeader";
import ButtonsFooter from "../../UI/components/ButtonsFooter/ButtonsFooter";
import Footer from "../../UI/components/footer/Footer";

const HangarPassPhotoId: React.FC = () => {
  return (
    <div className={`${styles.container}`}>
      <HangarPhotoIdHeader
        title="Permanent"
        diffContent="For persons intending to work in SIAEC or for long term visit to SIAEC premises."
        formType="Permanent"
      />
      <Body />
      <ButtonsFooter />
      <Footer />
    </div>
  );
};

export default HangarPassPhotoId;
