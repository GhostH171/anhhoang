import * as React from "react";
import styles from "./HangarPhotoIdTemp.module.scss";
import { IHangarPhotoIdTempProps } from "./IHangarPhotoIdTempProps";
import ButtonHeader from "../../UI/components/ButtonHeader/ButtonHeader";
import Footer from "../../UI/components/footer/Footer";
import Body from "./body/Body";
export default class HangarPhotoIdTemp extends React.Component<
  IHangarPhotoIdTempProps,
  {}
> {
  public render(): JSX.Element {
    return (
      <section className={`${styles.container}`}>
        <ButtonHeader title="Create New Temporary Pass" link="/Temporary/Form" />
        <Body />
        <Footer />
      </section>
    );
  }
}
