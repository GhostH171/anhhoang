/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useState, useRef, useContext, useEffect } from "react";
import styles from "./HangarPhotoIdTempFormBody.module.scss";
import {
  UploadProps, RadioChangeEvent, Divider, Space, InputRef,
  Button, Checkbox, Form, Input, Select, Tooltip, Typography,
  Upload, message, DatePicker, Radio, Collapse,
} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { Icon } from "office-ui-fabric-react";
// import { Label } from "@fluentui/react";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import CustomContext from "../../../context/UseContext";
import { PeoplePicker } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import GroupServices from "../../../services/GroupServices";
import { GROUP_NAME, LIST_NAME } from "../../../helpers/const";
// import FileServices from "../../../services/FileDemoServices";
// import { UploadChangeParam, UploadFile } from "antd/lib/upload";
// import { FilePicker } from "@pnp/spfx-controls-react/lib/FilePicker";
// import ListServices from "../../../services/ListServices";

import Nationality from '../../../assets/nationality.json';
import Country from '../../../assets/country.json';

const { Panel } = Collapse;
const { Option } = Select;
const { Text } = Typography;

const cardTypes = [
  { label: "Staff", value: 1 },
  { label: "Customer", value: 2 },
  { label: "Contractor", value: 3 },
];

const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const foreignNationals = [
  { label: "None", value: "none" },
  { label: "FIN", value: "fin" },
  { label: "Passport", value: "passport" },
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

const props: UploadProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

let index = 0;

interface IProps {
  onFinish: (values: object) => void;
  form: any
}

const HangarPhotoIdTempFormBody: React.FC<IProps> = ({
  onFinish,
  form
}) => {
  const { context } = useContext(CustomContext);
  const groupServices = new GroupServices(context);
  const [cardType, setCardType] = useState("staff");
  const [gender, setGender] = useState("male");
  const [foreigner, setForeigner] = useState("none");
  const [BMDTitle, setBMDTitle] = useState([]);
  console.log("🚀 ~ file: HangarPhotoIdTempFormBody.tsx ~ line 97 ~ BMDTitle", BMDTitle)

  const [items, setItems] = useState(['Chinese', 'Malay', 'Indian', 'Eurasian']);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

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

   // add item in race
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  // add item in race
  const addItem = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const onChangeCardType = ({ target: { value } }: RadioChangeEvent): void => {
    setCardType(value);
  };

  const onChangeGender = ({ target: { value } }: RadioChangeEvent): void => {
    setGender(value);
  };

  const onChangeForeigner = ({ target: { value } }: RadioChangeEvent): void => {
    setForeigner(value);
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
            header={<><Icon iconName="ContextMenu"/> CARD TYPE</>}
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
                onChange={onChangeCardType}
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
                onChange={onChangeGender}
                value={gender}
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
              <Select
                showSearch
                placeholder="Search your nationality"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                options={Nationality}
              />
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
              <Select
                showSearch
                placeholder="Search your country"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                options={Country}
              />
            </Form.Item>

            <Form.Item
              name="birthday"
              label="Date Of Birth"
              rules={[
                {
                  required: true,
                  message: "Please select your date of birth!",
                },
              ]}
            >
              <DatePicker placement="bottomLeft" className={styles.datepicker} />
            </Form.Item>

            <Form.Item
              label="NRIC No (Singaporean)"
              style={{ marginBottom: 0 }}
            >
              <Form.Item
                name="nricType"
                rules={[{ required: true,  message: "Please select your NRIC Type!", }]}
                className={`${styles.formItem2}`}
              >
                <Select defaultValue="Select NRIC">
                  <Option value="pink">Pink</Option>
                  <Option value="blue">Blue</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="nricNumber"
                rules={[{ required: true, message: "Please select your NRIC Number!", }]}
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
              <Select
                placeholder="Select race"
                dropdownRender={menu => (
                  <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Space style={{ padding: '0 8px 4px' }}>
                      <Input
                        placeholder="Please enter item"
                        ref={inputRef}
                        value={name}
                        onChange={onNameChange}
                      />
                      <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                        Add item
                      </Button>
                    </Space>
                  </>
                )}
                options={items.map(item => ({ label: item, value: item }))}
              />
            </Form.Item>

            <Form.Item
              name="foreigner"
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
                onChange={onChangeForeigner}
                value={foreigner}
              />
            </Form.Item>

            <Form.Item
              name="expireDate"
              label="Airport Pass Expiry Date"
              rules={[
                {
                  required: true,
                  message: "Please select your airport pass expiry date!",
                },
              ]}
            >
              <DatePicker className={styles.datepicker}/>
            </Form.Item>

            <Form.Item
              name="organization"
              label="Name of Organization"
              rules={[
                {
                  required: true,
                  message: "Please input your organization!",
                },
              ]}
            >
              <Input placeholder="Organization name" />
            </Form.Item>

            <Form.Item
              name="isSubmitted"
              label="Have you previously submitted this form to SIA Engineering Company?"
              rules={[
                {
                  required: true,
                  message: "Please select yes or no!",
                },
              ]}
            >
              <Select defaultValue="Select">
                <Option value="1">Yes</Option>
                <Option value="0">No</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="isEmployed"
              label="Are you contracted or employed directly by SIA Engineering Company?"
              rules={[{ required: true, message: "Please select yes or no!" }]}
            >
              <Select defaultValue="Select">
                <Option value="1">Yes</Option>
                <Option value="0">No</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="typeOfWork"
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

            <div style={{ display: 'flex' }}>
              <Form.Item
                name="numberOfVisit"
                label="State frequency of visits by applicant on official duties"
                rules={[
                  {
                    required: true,
                    message: "Please input state frequency of visits!",
                  },
                ]}
              >
                <Input style={{width: '100%'}} className={styles.formItem2} placeholder="Frequency Of Visits" />
              </Form.Item>

              <Typography style={{ flex: 1}} className={styles.formItemForNric}>days per week</Typography>
            </div>

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
                name="isConfirm1"
                rules={[{ required: false }]}
                className={`${styles.briefDetailWithIconInfo}`}
              >
                <Select  defaultValue="Select">
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="isQuestion1"
                rules={[{ required: false }]}
                className={`${styles.briefDetail}`}
              >
                <TextArea
                  placeholder="Brief Details If Yes"
                  rows={2}
                />
              </Form.Item>
            </Form.Item>

            <Form.Item label="Have you ever been warned or sanctioned by a law enforcement authority for a misdemeanor?">
              <Form.Item
                name="isConfirm2"
                rules={[{ required: false }]}
                className={styles.question}
              >
                <Select defaultValue="Select">
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="isQuestion2"
                rules={[{ required: false }]}
                className={`${styles.briefDetail}`}
              >
                <TextArea
                  placeholder="Brief Details If Yes"
                  rows={2}
                />
              </Form.Item>
            </Form.Item>

            <Form.Item label="Have you suffered from any mental illness or physical illness or disability for which you have received medical treatment? E.g. diabetes, tuberculosis, epilepsy, asthma etc.)">
              <Form.Item
                name="isConfirm3"
                rules={[{ required: false }]}
                className={styles.question}
              >
                <Select defaultValue="Select">
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="isQuestion3"
                rules={[{ required: false }]}
                className={`${styles.briefDetail}`}
              >
                <TextArea
                  placeholder="Brief Details If Yes"
                  rows={2}
                />
              </Form.Item>
            </Form.Item>

            <Form.Item name="confirmQuestion" valuePropName="checked" noStyle>
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
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Choose File</Button>
              </Upload>
            </Form.Item>
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
                {/* <Input
                  placeholder="Enter a name or email..."
                  className={`${styles.sponsorInput}`}
                /> */}
              </Form.Item>
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                label="BMD Approver"
                name="approver"
                rules={[
                  { required: true, message: "Please select BMD approver!" },
                ]}
              >
                <Select>
                  {
                    BMDTitle.map((item: string, index: number) => <Option key={index} value={item}>{item}</Option> )
                  }
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
