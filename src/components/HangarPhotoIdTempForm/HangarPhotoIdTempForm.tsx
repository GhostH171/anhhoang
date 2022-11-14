import * as React from "react";
import styles from "./HangarPhotoIdTempForm.module.scss";
import HangarPhotoIdHeader from "../../UI/components/HangarPhotoIdHeader/HangarPhotoIdHeader";
import HangarPhotoIdTempFormBody from "./body/HangarPhotoIdTempFormBody";
import { IHangarPhotoIdTempProps } from "./IHangarPhotoIdTempForm";
import Footer from "../../UI/components/footer/Footer";
import ButtonsFooter from "../../UI/components/ButtonsFooter/ButtonsFooter";
import ViewEditHeader from "../../UI/components/ViewEditHeader/ViewEditHeader";
import { submitInformation } from "../../api";
import { Form } from "antd";

const HangarPhotoIdTempForm: React.FunctionComponent<
  IHangarPhotoIdTempProps
> = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const dataFormat = {  
      ...values, 
      NRIC: { nricType: values.nricType, nricNumber: values.nricNumber }, 
      question1: { 
        isConfirm: values.isConfirm1,
        detail: values.isQuestion1
      },
      question2: { 
        isConfirm: values.isConfirm2,
        detail: values.isQuestion2
       },
      question3: { 
        isConfirm: values.isConfirm3,
        detail: values.isQuestion3
       },
      status: 0, 
      typePhoto: 0
    }

    const result = submitInformation(dataFormat);

    if (result) {
      form.resetFields();
    }
  };


  return (
    <>
      <ViewEditHeader />
      <div className={`${styles.container}`}>
        <HangarPhotoIdHeader
          title="Temporary"
          diffContent="For persons intending to work in (projects) or visit SIAEC premises for a short period of time (3 months to a year)"
          formType="Temporary"
        />
        <HangarPhotoIdTempFormBody onFinish={onFinish} form={form} />
      </div>
      <ButtonsFooter />
      <Footer />
    </>
  );
};

export default HangarPhotoIdTempForm;
