/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import * as React from "react";
import { useState, useContext } from "react";
import CustomContext from "../../../context/UseContext";
import FileServices from "../../../services/FileDemoServices";
import styles from "./HangarPhotoIdUploadImage.module.scss";
import { IHangarPhotoIdUploadImageProps } from "./IHangarPhotoIdUploadImageProps";


const getBase64 = (img: RcFile, callback: (url: string) => void): void => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const HangarPhotoIdUploadImage: React.FC<IHangarPhotoIdUploadImageProps> = (
  props
) => {
  const { context } = useContext(CustomContext);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>();
  console.log("🚀 ~ file: HangarPhotoIdUploadImage.tsx ~ line 26 ~ imageUrl", imageUrl)
  const fileServices = new FileServices(context);
  console.log('file service', fileServices)

  const uploadImage = (imageUrl: File): void => {
    if (props.formType === "Temporary") {
      fileServices.create(
        "/sites/uat/hangar_pass/Images1/HangarPass/TemporaryNew",
        imageUrl
      );
    } else if (props.formType === "Permanent") {
      fileServices.create(
        "/sites/uat/hangar_pass/Images1/HangarPass/PermanentNew",
        imageUrl
      );
    }
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (imageUrl) {
      uploadImage(imageUrl);
    }
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const beforeUpload = (file: RcFile): void => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return;
    }
    uploadImage(file);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
 

  return (
    <div className={`${styles.imageWrapper}`}>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{ width: "100%", height: "inherit", objectFit: "cover" }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
      <span>
        <b>Note:</b> If digital photo is used, image must not be distorted
      </span>
    </div>
  );
};

export default HangarPhotoIdUploadImage;
