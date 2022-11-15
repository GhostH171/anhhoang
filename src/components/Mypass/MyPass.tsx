import * as React from "react";

import { IMyPassProps } from "./IMyPassProps";

import Footer from "../../UI/components/footer/Footer";
import Header from "./header/Header";
import Body from "./body/Body";

import styles from "./MyPass.module.scss";

const MyPass: React.FC<IMyPassProps> = () => {
  return (
    <section className={styles.container}>
      <Header />
      <Body />
      <Footer />
    </section>
  );
}

export default MyPass
