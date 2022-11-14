import * as React from "react";
import styles from "./HangarPhotoIdPerm.module.scss";
import { IHangarPhotoIdPermProps } from "./IHangarPhotoIdPermProps";
import ButtonHeader from "../../UI/components/ButtonHeader/ButtonHeader";
import Footer from "../../UI/components/footer/Footer";
import Body from "./body/Body";
export default class HangarPhotoIdPerm extends React.Component<
  IHangarPhotoIdPermProps,
  {}
> {
  public render(): JSX.Element {
    return (
      <section className={`${styles.container}`}>
        <ButtonHeader title="Create New Permanent Pass" link="#" />
        <Body />
        <Footer />
      </section>
    );
  }
}
