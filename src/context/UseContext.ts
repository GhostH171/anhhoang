import { createContext } from "react";
import { ISiahangarpassver1Props } from "../webparts/siahangarpassver1/components/ISiahangarpassver1Props";

const CustomContext = createContext<ISiahangarpassver1Props>({
  context: null,
});

export default CustomContext;
