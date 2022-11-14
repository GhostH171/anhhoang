/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { ITableTemplateProps } from "./ITableTemplateProps";
// import styles from "./TableTemplate.module.scss";
import { Table } from "antd";
import "../../../../node_modules/antd/dist/antd.css";

const TableTemplate: React.FunctionComponent<ITableTemplateProps> = () => {
  const columns: any = [
    {
      title: "Name",
      dataIndex: "name",
      color: "#00266b",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Category 1",
          value: "Category 1",
          children: [
            {
              text: "Yellow",
              value: "Yellow",
            },
            {
              text: "Pink",
              value: "Pink",
            },
          ],
        },
        {
          text: "Category 2",
          value: "Category 2",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      filterSearch: true,
      onFilter: (value: any, record: any) => record.name.includes(value),
      width: "30%",
    },
    {
      title: "Age",
      dataIndex: "age",
      backgroundColor: "#00266b",
      sorter: (a: any, b: any) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      backgroundColor: "#00266b",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value: any, record: any) => record.address.startsWith(value),
      filterSearch: true,
      width: "40%",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];
  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default TableTemplate;
