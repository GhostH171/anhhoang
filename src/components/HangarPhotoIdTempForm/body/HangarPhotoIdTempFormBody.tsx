import * as React from "react";
import { useState, useContext, useEffect } from "react";
import styles from "./HangarPhotoIdTempFormBody.module.scss";
import type { UploadProps, RadioChangeEvent, DatePickerProps } from "antd";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Tooltip,
  Typography,
  Upload,
  message,
  DatePicker,
  Radio,
  Collapse,
} from "antd";
import { Icon } from "office-ui-fabric-react";
import { Label } from "@fluentui/react";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import CustomContext from "../../../context/UseContext";
import { PeoplePicker } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import GroupServices from "../../../services/GroupServices";
import { GROUP_NAME, LIST_NAME } from "../../../helpers/const";
import FileServices from "../../../services/FileDemoServices";
import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import { FilePicker } from "@pnp/spfx-controls-react/lib/FilePicker";
import ListServices from "../../../services/ListServices";

const { Panel } = Collapse;
const { Option } = Select;
const { Text } = Typography;

const cardTypes = [
  { label: "Staff", value: "staff" },
  { label: "Customer", value: "customer" },
  { label: "Contractor", value: "contractor" },
];

const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const foreignNationals = [
  { label: "None", value: "none" },
  { label: "FIN", value: "Fin" },
  { label: "Passport", value: "Passport" },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

const HangarPhotoIdTempFormBody: React.FC = () => {
  const { context } = useContext(CustomContext);
  const groupServices = new GroupServices(context);
  const [cardType, setCardType] = useState("staff");
  const [gender, setGender] = useState("male");
  const [foreignNa, setForeignNa] = useState("none");
  const [sponsorId, setSponsorId] = useState(undefined);
  const [BMDId, setBMDId] = useState(undefined);
  const [BMDTitle, setBMDTitle] = useState([]);
  const [file, setFile] = useState<File>(undefined);
  const [attachmentsState, setattachmentsState] = useState([]);

  const fileServices = new FileServices(context);
  const listServices = new ListServices(context);

  // const props: UploadProps = {
  //   name: "file",
  //   action: "https://sia.sharepoint.com/sites/uat/hangar_pass",
  //   headers: {
  //     authorization: "authorization-text",
  //   },
  //   onChange({file, fileList}) {
  //     console.log(typeof info.file);
  //     if (info.file.status !== "uploading") {
  //       console.log("info.file", info.file);
  //       console.log("info.fileList", info.fileList);
  //     }
  //     if (info.file.status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //     console.log(info);

  //     // Type Error
  //     fileServices.create(
  //       "/sites/uat/hangar_pass/Images1/HangarPass/TemporaryNew",
  //       info.file
  //     );
  //   },
  // };

  // const _handleSubmit = () => {
  //   fileServices.createfile(
  //     "/sites/uat/hangar_pass/Images1/HangarPass/TemporaryNew",
  //     attachmentsState
  //   );
  // };

  // useEffect(() => {
  //   _handleSubmit();
  // }, []);

  const _handleSubmit = () => {
    listServices.create(LIST_NAME.photoIdTemp, attachmentsState[0]);
  };
  useEffect(() => {
    _handleSubmit();
  }, []);
  const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio1 checked", value);
    setCardType(value);
  };

  const onChange2 = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio1 checked", value);
    setGender(value);
  };

  const onChangeforeignNa = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio1 checked", value);
    setForeignNa(value);
    console.log("foreignNa", foreignNa);
  };

  //Fetch Group
  const _fetchGroupBMD = () => {
    groupServices.getGroupUsers(GROUP_NAME.hmd).then((res) => {
      const BMDName = res.map((BMDTitle) => {
        return BMDTitle.Title;
      });
      setBMDTitle(BMDName);
    });
  };

  useEffect(() => {
    _fetchGroupBMD();
  }, []);

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const onDisTable = () => {
    if (foreignNa === "Fin" || foreignNa === "Passport") {
      return (
        <Form.Item>
          <table>
            <tr className={`${styles.tableHeader}`}>
              <th className={`${styles.tbHeaderItems}`}>
                {foreignNa} <span className={`${styles.star}`}>*</span>
              </th>
              <th className={`${styles.tbHeaderItems}`}>
                Issue Date<span className={`${styles.star}`}>*</span>
                DD/MM/YYYY
              </th>
              <th className={`${styles.tbHeaderItems}`}>
                Expiry Date<span className={`${styles.star}`}>*</span>
                DD/MM/YYYY
              </th>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder={foreignNa + " No"}
                  className={`${styles.finInput}`}
                />
              </td>
              <td>
                <DatePicker
                  onChange={onChange}
                  className={`${styles.datepicker}`}
                />
              </td>
              <td>
                <DatePicker
                  onChange={onChange}
                  className={`${styles.datepicker}`}
                />
              </td>
            </tr>
          </table>
        </Form.Item>
      );
    }
  };

  return (
    <div>
      <Form
        {...formItemLayout}
        id="hangarPassPhotoId"
        form={form}
        name="register"
        onFinish={onFinish}
        labelAlign="left"
        labelCol={{ flex: "300px" }}
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        scrollToFirstError
      >
        <Collapse bordered={false} defaultActiveKey={["1", "2", "4"]}>
          <Panel
            className={`${styles.collapseWrapper}`}
            header={
              <span>
                <Icon iconName="ContextMenu" /> CARD TYPE
              </span>
            }
            key="1"
          >
            <Form.Item
              name="cardType"
              label="Type Of Card"
              rules={[
                { required: true, message: "Please select type of card!" },
              ]}
            >
              <Radio.Group
                options={cardTypes}
                onChange={onChange1}
                value={cardType}
              />
            </Form.Item>
          </Panel>

          <Panel
            className={`${styles.collapseWrapper}`}
            header={
              <span>
                <Icon iconName="ContextMenu" /> APPLICANT&apos;S DETAILS &
                MANAGER&apos;S ENDORSEMENT (TO BE COMPLETED BY APPLICANT. SUBMIT
                TO SPONSOR IN THIS SECTION.)
              </span>
            }
            key="2"
          >
            <Form.Item
              name="name"
              label="Name (as in NRIC or Passport)"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                  message: "Please select your gender!",
                },
              ]}
              hasFeedback
            >
              <Radio.Group
                options={genders}
                onChange={onChange2}
                defaultValue={gender}
              />
            </Form.Item>
            <Form.Item
              name="nationality"
              label="Nationality"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select your nationality!",
                },
              ]}
            >
              <Select defaultValue="Select" onChange={handleChange}>
                <Option value="vietnam">VietNam</Option>
                <Option value="singapore">Singapore</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="country"
              label="Country Of Birth"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select your country of birth!",
                },
              ]}
            >
              <Select defaultValue="Select" onChange={handleChange}>
                <Option value="vietnam">VietNam</Option>
                <Option value="singapore">Singapore</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="birthDate"
              label="Date Of Birth"
              rules={[
                {
                  required: true,
                  message: "Please select your date of birth!",
                  whitespace: true,
                },
              ]}
            >
              {
                <DatePicker
                  onChange={onChange}
                  className={`${styles.datepicker}`}
                />
              }
            </Form.Item>
            <Form.Item
              label="NRIC No (Singaporean)"
              style={{ marginBottom: 0 }}
            >
              <Form.Item
                name="nricType"
                rules={[{ required: false }]}
                className={`${styles.formItem2}`}
              >
                <Select defaultValue="Select NRIC" onChange={handleChange}>
                  <Option value="pink">Pink</Option>
                  <Option value="blue">Blue</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="nricNumber"
                rules={[{ required: false }]}
                className={`${styles.formItemForNricNumber}`}
              >
                <Input placeholder="NRIC Number" />
              </Form.Item>
            </Form.Item>
            <Form.Item
              name="race"
              label="Race"
              rules={[{ required: true, message: "Please select race!" }]}
            >
              <Select defaultValue="Select Race" onChange={handleChange}>
                <Option value="chinese">Chinese</Option>
                <Option value="malay">Malay</Option>
                <Option value="indian">Indian</Option>
                <Option value="eurasian">Eurasian</Option>
                <Option value="chinese">Chinese</Option>
                <Option value="others">Others</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="foreignNational"
              label="Foreign National (Choose one)"
              rules={[
                {
                  required: true,
                  message: "Please select foreign national!",
                },
              ]}
              hasFeedback
            >
              <Radio.Group
                options={foreignNationals}
                onChange={onChangeforeignNa}
                defaultValue={foreignNa}
              />
            </Form.Item>
            {onDisTable()}

            <Form.Item
              name="organization"
              label="Name of Organization"
              rules={[
                {
                  required: true,
                  message: "Please input your organization!",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Organization name" />
            </Form.Item>
            <Form.Item
              name="question1"
              label="Have you previously submitted this form to SIA Engineering Company?"
              rules={[
                {
                  required: true,
                  message: "Please select yes or no!",
                },
              ]}
            >
              <Select defaultValue="Select">
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="question2"
              label="Are you contracted or employed directly by SIA Engineering Company?"
              rules={[{ required: true, message: "Please select yes or no!" }]}
            >
              <Select defaultValue="Select">
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="stateOfWork"
              label="State type of work required to perform in SIAEC"
              rules={[
                {
                  required: true,
                  message: "Please input state type of work",
                },
              ]}
            >
              <Input placeholder="State Type Of Work" />
            </Form.Item>
            <Form.Item
              name="stateOfVisit"
              label="State period of assignment in hangar:"
              rules={[
                {
                  required: true,
                  message: "Please input State period of assignment in hangar",
                },
              ]}
              // className={`${styles.statePeriod}`}
            >
              <Form.Item>
                <span>From</span>
                <DatePicker
                  onChange={onChange}
                  className={`${styles.datepicker}`}
                />
              </Form.Item>
              <Form.Item>
                <span>To</span>
                <DatePicker
                  onChange={onChange}
                  className={`${styles.datepicker}`}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item
              name="applicationType"
              label="Application Type"
              rules={[
                {
                  required: true,
                  message: "Please select application type!",
                },
              ]}
            >
              <Select defaultValue="Select">
                <Option value="initialApplication">Initial Application</Option>
                <Option value="reApplication">Reapplication</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <div className={`${styles.middleContentColor}`}>
                <Typography>
                  <Text className={`${styles.middleContentText}`}>
                    DECLARATION BY APPLICANT (choose applicable, if YES, please
                    provide brief details in the space provided /attachment.)
                  </Text>
                </Typography>
              </div>
            </Form.Item>
            <Form.Item label="Have you ever been charged for any offence or convicted by any court of law or have been detained by a law enforcement authority under the provisions of law of a country?">
              <Form.Item className={`${styles.iconDisplay}`}>
                <Tooltip title="Please provide full details of the charges made against you even if you were eventually acquitted by that Court of Law).">
                  <Icon className={`${styles.iconInfo}`} iconName="Info" />
                </Tooltip>
              </Form.Item>
              <Form.Item
                rules={[{ required: false }]}
                className={`${styles.briefDetailWithIconInfo}`}
              >
                <Select defaultValue="Select" onChange={handleChange}>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="briefDetail1"
                rules={[{ required: false }]}
                className={`${styles.briefDetail}`}
              >
                <TextArea
                  placeholder="Brief Details If Yes"
                  showCount
                  maxLength={300}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item label="Have you ever been warned or sanctioned by a law enforcement authority for a misdemeanor?">
              <Form.Item
                rules={[{ required: false }]}
                className={styles.question}
              >
                <Select defaultValue="Select" onChange={handleChange}>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="briefDetail2"
                rules={[{ required: false }]}
                className={`${styles.briefDetail}`}
              >
                <TextArea
                  placeholder="Brief Details If Yes"
                  showCount
                  maxLength={300}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item label="Have you suffered from any mental illness or physical illness or disability for which you have received medical treatment? E.g. diabetes, tuberculosis, epilepsy, asthma etc.)">
              <Form.Item
                rules={[{ required: false }]}
                className={styles.question}
              >
                <Select defaultValue="Select" onChange={handleChange}>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="briefDetail3"
                rules={[{ required: false }]}
                className={`${styles.briefDetail}`}
              >
                <TextArea
                  placeholder="Brief Details If Yes"
                  showCount
                  maxLength={300}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item name="confirm" valuePropName="checked" noStyle>
              <Checkbox>
                I declare that all information contained in this form provided
                by me are true and I have not withheld any relevant information.
                Any false or misleading information given in relation to this
                application could result in the cancellation of the pass.
              </Checkbox>
            </Form.Item>
          </Panel>
          <Panel
            className={`${styles.collapseWrapper}`}
            header={
              <span>
                <Icon iconName="ContextMenu" /> ALL ATTACHMENTS
              </span>
            }
            key="3"
          >
            <Form.Item className={`${styles.uploadFile}`}>
              <Text className={`${styles.uploadFileText}`}>
                Use the right section to add Attachments
              </Text>
              <FilePicker
                required
                context={context}
                hideRecentTab
                hideOneDriveTab
                hideStockImages
                hideSiteFilesTab
                accepts={[".ipg", ".png", ".gif", ".docx", ".pdf"]}
                buttonLabel={"Select files"}
                buttonClassName={styles.peoplePickerButton}
                onSave={async (value) => {
                  const attachments = [];
                  for (let v of value) {
                    attachments.push(await v.downloadFileContent());
                  }
                  console.log(attachments);
                  setattachmentsState(attachments);
                }}
              />
            </Form.Item>
            {(attachmentsState || []).map((file, fIndex) => (
              <div key={fIndex} className={`${styles.attachment}`}>
                <Label>{file.name}</Label>
                <button
                  type={"button"}
                  className={`${styles.attachment_delete}`}
                  onClick={() => {
                    console.log(attachmentsState);
                    attachmentsState.splice(fIndex, 1);
                  }}
                >
                  <Icon iconName={"Cancel"} />
                </button>
              </div>
            ))}
          </Panel>
          <Panel
            className={`${styles.collapseWrapper}`}
            header={
              <span>
                <Icon iconName="ContextMenu" /> APPROVER DETAILS
              </span>
            }
            key="4"
          >
            <Form.Item className={styles.sponsor}>
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                label="Sponsor"
                name="sponsor"
                rules={[
                  {
                    required: true,
                    message: "Please input your name or email!",
                  },
                ]}
              >
                <PeoplePicker context={context} ensureUser groupId={4161} />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                label="BMD Approver"
                name="BMDApprover"
                rules={[
                  { required: true, message: "Please select BMD approver!" },
                ]}
              >
                <Select defaultValue="BMD ApproverName" onChange={handleChange}>
                  {BMDTitle.map((name, index) => {
                    return <Option key={index}>{name}</Option>;
                  })}
                  {/* <Option value="name1">A</Option>
                  <Option value="name2">B</Option> */}
                </Select>
              </Form.Item>
            </Form.Item>
          </Panel>
        </Collapse>
      </Form>
    </div>
  );
};

export default HangarPhotoIdTempFormBody;
