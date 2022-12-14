import { useRoutes } from "react-router-dom";
import * as React from "react";
import MyPass from "../components/Mypass/MyPass";
import HangarPhotoIdTemp from "../components/HangarPhotoIdTemp/HangarPhotoIdTemp";
import HangarPhotoIdPerm from "../components/HangarPhotoIdPerm/HangarPhotoIdPerm";
import HangarPassPhotoId from "../components/HangarPassPhotoID/HangarPassPhotoId";
import HangarPhotoIdTempForm from "../components/HangarPhotoIdTempForm/HangarPhotoIdTempForm";

const UseRoutes = (): JSX.Element =>
  useRoutes([
    {
      path: "/",
      //   element: <Home />,
    },
    {
      path: "/MyPass",
      element: <MyPass />,
    },
    {
      path: "/HangarPass/Temporary",
      element: <HangarPhotoIdTemp />,
    },
    {
      path: "/HangarPass/Permanent",
      element: <HangarPhotoIdPerm />,
    },
    {
      path: "/PhotoId",
      element: <HangarPassPhotoId />,
    },
    {
      path: "/HangarPass/Temporary/Form",
      element: <HangarPhotoIdTempForm />,
    },
  ]);

export default UseRoutes;
