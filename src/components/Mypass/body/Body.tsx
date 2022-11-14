import * as React from "react";
import { useEffect } from "react";
import styles from "./Body.module.scss";
import { SearchBox } from "@fluentui/react/lib/SearchBox";
import { IBodyProps } from "./IBodyProps";
import { IBodySates } from "./IBodyStates";
import { Table, TableProps } from "antd";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import "antd/dist/antd.css";
import { getInformationList } from "../../../api";

interface DataType {
  passNumber: string;
  passType: string;
  applicantName: string;
  appPeriod: string;
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

  const data: DataType[] = [
    {
      passNumber: "AP012233",
      passType: "General",
      applicantName: "pkHoang",
      appPeriod: "2022-2023",
      status: "Rejected",
    },
    {
      passNumber: "HP002213",
      passType: "General",
      applicantName: "pkHoang",
      appPeriod: "2022-2023",
      status: "Approved",
    },
    {
      passNumber: "BP002220",
      passType: "General",
      applicantName: "pkHoang",
      appPeriod: "2022-2023",
      status: "Rejected",
    },
    {
      passNumber: "HP002234",
      passType: "General",
      applicantName: "pkHoang",
      appPeriod: "2022-2023",
      status: "Approved",
    },
    {
      passNumber: "AP012233",
      passType: "General",
      applicantName: "pkHoang",
      appPeriod: "2022-2023",
      status: "Rejected",
    },
    {
      passNumber: "HP002213",
      passType: "General",
      applicantName: "pkHoang",
      appPeriod: "2022-2023",
      status: "Approved",
    },
    {
      passNumber: "BP002220",
      passType: "General",
      applicantName: "pkHoang",
      appPeriod: "2022-2023",
      status: "Rejected",
    },
    {
      passNumber: "HP002234",
      passType: "General",
      applicantName: "pkHoang",
      appPeriod: "2022-2023",
      status: "Approved",
    },
    {
      passNumber: "AP012233",
      passType: "General",
      applicantName: "pkHoang",
      appPeriod: "2022-2023",
      status: "Rejected",
    },
    {
      passNumber: "HP002213",
      passType: "General",
      applicantName: "pkHoang",
      appPeriod: "2022-2023",
      status: "Approved",
    },
    {
      passNumber: "BP002220",
      passType: "General",
      applicantName: "pkHoang",
      appPeriod: "2022-2023",
      status: "Rejected",
    },
    {
      passNumber: "HP002234",
      passType: "General",
      applicantName: "pkHoang",
      appPeriod: "2022-2023",
      status: "Approved",
    },
    {
      passNumber: "AP012233",
      passType: "General",
      applicantName: "pkHoang",
      appPeriod: "2022-2023",
      status: "Rejected",
    },
    {
      passNumber: "HP002213",
      passType: "General",
      applicantName: "pkHoang",
      appPeriod: "2022-2023",
      status: "Approved",
    },
    {
      passNumber: "BP002220",
      passType: "General",
      applicantName: "pkHoang",
      appPeriod: "2022-2023",
      status: "Rejected",
    },
    {
      passNumber: "HP002234",
      passType: "General",
      applicantName: "pkHoang",
      appPeriod: "2022-2023",
      status: "Approved",
    },
    {
      passNumber: "AP012233",
      passType: "General",
      applicantName: "pkHoang",
      appPeriod: "2022-2023",
      status: "Rejected",
    },
  ];
  const fetchData = async () => {
    try {
      const response = await getInformationList();
      console.log("--------response", response);
      if (response) {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Pass Number",
      dataIndex: "passNumber",
      key: "passNumber",
      sorter: (a, b) => a.passNumber.localeCompare(b.passNumber),
      sortOrder:
        sortedInfo.columnKey === "passNumber" ? sortedInfo.order : null,
      // onFilter: (value: string, record) => record.passNumber.startsWith(value),
      ellipsis: true,
    },
    {
      title: "Pass Type",
      dataIndex: "passType",
      key: "passType",
      sorter: (a, b) => a.passType.localeCompare(b.passType),
      sortOrder: sortedInfo.columnKey === "passType" ? sortedInfo.order : null,
      // onFilter: (value: string, record) => record.passType.startsWith(value),
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
      title: "Pass Application Period",
      dataIndex: "appPeriod",
      key: "appPeriod",
      sorter: (a, b) => a.appPeriod.localeCompare(b.appPeriod),
      // onFilter: (value: string, record) => record.appPeriod.startsWith(value),
      sortOrder: sortedInfo.columnKey === "appPeriod" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Approved",
          value: "approved",
        },
        {
          text: "Rejected",
          value: "rejected",
        },
      ],
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
      ellipsis: true,
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string, record) => record.status.includes(value),
    },
  ];

  return (
    <div className={`${styles.body}`}>
      <div className={`${styles.title}`}>
        <h6>My Pass</h6>
        <SearchBox placeholder="Find an item" underlined={true} />
      </div>

      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </div>
  );
};
export default Body;
