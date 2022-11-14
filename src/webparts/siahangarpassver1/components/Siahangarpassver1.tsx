import * as React from "react";
import { ISiahangarpassver1Props } from "./ISiahangarpassver1Props";
import { HashRouter, Link } from "react-router-dom";
import UseRoutes from "../../../routes/UseRoutes";
import CustomContext from "../../../context/UseContext";

const Siahangarpassver1: React.FunctionComponent<ISiahangarpassver1Props> = (
  props
) => {
  return (
    <CustomContext.Provider value={props}>
      <HashRouter>
        <Link to={"/MyPass"}>My Pass</Link>
        <Link to={"/HangarPass/Temporary"}>HangarPassTemporary</Link>
        <Link to={"/HangarPass/Permanent"}>HangarPassPermanent</Link>
        <Link to={"/PhotoId"}>HangarPass Photo ID</Link>
        <Link to={"/HangarPass/Temporary/Form"}>HangarPassTemporaryForm</Link>
        <UseRoutes />
      </HashRouter>
    </CustomContext.Provider>
  );
};

export default Siahangarpassver1;
