import * as React from "react";
import styles from "./Body.module.scss";
import { SearchBox } from "@fluentui/react/lib/SearchBox";
import { IBodyProps } from "./IBodyProps";
import { Table, TableProps } from "antd";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import "antd/dist/antd.css";
import { AadHttpClient, HttpClientResponse } from "@microsoft/sp-http";
import { useEffect } from "react";

interface DataType {
  passNumber: string;
  applicantName: string;
  Sponsor: string;
  HMDApprover: string;
  status: string;
}

const Body: React.FunctionComponent<IBodyProps> = () => {
  const [sortedInfo, setSortedInfo] = React.useState<SorterResult<DataType>>(
    {}
  );
  const [filteredInfo, setFilteredInfo] = React.useState<
    Record<string, FilterValue | null>
  >({});

  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  useEffect(() => {
    getPhotoId();
  }, []);

  const data: DataType[] = [
    {
      passNumber: "AP012233",
      applicantName: "pkHoang",
      Sponsor: "2022-2023",
      HMDApprover: "asdfdsf",
      status: "Rejected",
    },
    {
      passNumber: "HP002213",
      applicantName: "pkHoang",
      Sponsor: "2022-2023",
      HMDApprover: "asdfdsf",
      status: "Approved",
    },
    {
      passNumber: "BP002220",
      applicantName: "pkHoang",
      Sponsor: "2022-2023",
      HMDApprover: "asdfdsf",
      status: "Rejected",
    },
    {
      passNumber: "HP002234",
      applicantName: "pkHoang",
      Sponsor: "2022-2023",
      HMDApprover: "asdfdsf",
      status: "Approved",
    },
  ];
  const functionUrl = "api://358331ba-feca-4cbf-8e8e-f3bb3400661d";
  function getPhotoId() {
    try {
      this.props.context.aadHttpClientFactory
        .getClient(functionUrl)
        .then((client: AadHttpClient): void => {
          client
            .get(
              `https://siaec-hangarpass-uat.azurewebsites.net/api/photoid?code=cbTEFkeZGjkOwTFfXeaJtxqUFdT2GWcggTx0xuSvpZGJAzFuTEuwng==`,
              AadHttpClient.configurations.v1,
              {}
            )
            .then((response: HttpClientResponse): Promise<any> => {
              return response.json();
            })
            .then((result: any) => {
              console.log(result);
            });
        });
    } catch (error) {
      console.log(
        "Error occure while retrieve the mysubmissions. Error : " + error
      );
      //this.setState({State_FetchingResults:false});
    }
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "Pass Number",
      dataIndex: "passNumber",
      key: "passNumber",
      sorter: (a, b) => a.passNumber.localeCompare(b.passNumber),
      sortOrder:
        sortedInfo.columnKey === "passNumber" ? sortedInfo.order : null,
      onFilter: (value: string, record) => record.passNumber.startsWith(value),
      ellipsis: true,
    },
    {
      title: "Pass Type",
      dataIndex: "Applicant Name",
      key: "applicantName",
      sorter: (a, b) => a.applicantName.localeCompare(b.applicantName),
      sortOrder:
        sortedInfo.columnKey === "applicantName" ? sortedInfo.order : null,
      // onFilter: (value: string, record) =>
      //   record.applicantName.startsWith(value),
      ellipsis: true,
    },
    {
      title: `Applicant's Name`,
      dataIndex: "applicantName",
      key: "applicantName",
      sorter: (a, b) => a.applicantName.localeCompare(b.applicantName),
      // onFilter: (value: string, record) =>
      //   record.applicantName.startsWith(value),
      sortOrder:
        sortedInfo.columnKey === "applicantName" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Sponsor",
      dataIndex: "Sponsor",
      key: "Sponsor",
      sorter: (a, b) => a.Sponsor.localeCompare(b.Sponsor),
      // onFilter: (value: string, record) => record.Sponsor.startsWith(value),
      sortOrder: sortedInfo.columnKey === "Sponsor" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "HMD Approver",
      dataIndex: "HMDApprover",
      key: "HMDApprover",
      sorter: (a, b) => a.HMDApprover.localeCompare(b.HMDApprover),
      // onFilter: (value: string, record) => record.HMDApprover.startsWith(value),
      sortOrder:
        sortedInfo.columnKey === "HMDApprover" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Approved",
          value: "Approved",
        },
        {
          text: "Rejected",
          value: "Rejected",
        },
      ],
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
      ellipsis: true,
      filterMode: "tree",
      filterSearch: true,
      // onFilter: (value: string, record) => record.status.includes(value),
    },
  ];

  return (
    <div className={`${styles.body}`}>
      <div className={`${styles.title}`}>
        <h6>Hangar Photo ID Pass(Temporary)</h6>
        <SearchBox placeholder="Find an item" underlined={true} />
      </div>

      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </div>
  );
};
export default Body;
