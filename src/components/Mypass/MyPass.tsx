import * as React from "react";
import styles from "./MyPass.module.scss";
import Footer from "../../UI/components/footer/Footer";
import Header from "./header/Header";
import Body from "./body/Body";
import { IMyPassProps } from "./IMyPassProps";

export default class MyPass extends React.Component<IMyPassProps, {}> {
  public render(): JSX.Element {
    return (
      <section className={`${styles.container}`}>
        <Header />
        <Body />
        <Footer />
      </section>
    );
  }
}
