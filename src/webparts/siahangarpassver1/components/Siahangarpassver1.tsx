import * as React from "react";
import { ISiahangarpassver1Props } from "./ISiahangarpassver1Props";
import { HashRouter, Link } from "react-router-dom";
import UseRoutes from "../../../routes/UseRoutes";
import CustomContext from "../../../context/UseContext";
import styles from "./Siahangarpassver1.module.scss";

const Siahangarpassver1: React.FunctionComponent<ISiahangarpassver1Props> = (
  props
) => {
  return (
    <CustomContext.Provider value={props}>
      <HashRouter>
        <Link className={`${styles.headerBarItem}`} to={"/MyPass"}>
          My Pass
        </Link>
        <Link
          className={`${styles.headerBarItem}`}
          to={"/HangarPass/Temporary"}
        >
          HangarPassTemporary
        </Link>
        <Link
          className={`${styles.headerBarItem}`}
          to={"/HangarPass/Permanent"}
        >
          HangarPassPermanent
        </Link>
        <Link className={`${styles.headerBarItem}`} to={"/PhotoId"}>
          HangarPass Photo ID
        </Link>
        <Link
          className={`${styles.headerBarItem}`}
          to={"/HangarPass/Temporary/Form"}
        >
          HangarPassTemporaryForm
        </Link>
        <UseRoutes />
      </HashRouter>
    </CustomContext.Provider>
  );
};

export default Siahangarpassver1;
