import * as React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { Icon } from "@fluentui/react/lib/Icon";
import { IHeaderProps } from "./IHeaderProps";
import { Dropdown, Menu, Space } from "antd";

const hangarPhotoIdMenu = (
  <Menu
    items={[
      {
        key: 1,
        label: <Link to="/Temporary/Form">Permanent</Link>,
      },
      {
        key: 2,
        label: <Link to="/Temporary/Form">Temporary</Link>,
      },
    ]}
  />
);
const dailyHangarMenu = (
  <Menu
    items={[
      {
        key: 1,
        label: <a href="#">Visitor</a>,
      },
      {
        key: 2,
        label: <a href="#">Staff</a>,
      },
      {
        key: 3,
        label: <a href="#">Contractor</a>,
      },
      {
        key: 4,
        label: <a href="#">Customer</a>,
      },
    ]}
  />
);
const cameraMenu = (
  <Menu
    items={[
      {
        key: 1,
        label: <a href="#">General</a>,
      },
      {
        key: 2,
        label: <a href="#">Division Specific</a>,
      },
    ]}
  />
);

const menu = (
  <Menu
    items={[
      {
        key: 1,
        label: (
          <Dropdown overlay={hangarPhotoIdMenu} align={{ offset: [160, -36] }}>
            <Link to="/">
              <Space className={styles.category}>
                Hangar Photo ID
                <Icon
                  iconName="CaretRightSolid8"
                  className={styles.iconRight}
                />
              </Space>
            </Link>
          </Dropdown>
        ),
      },
      {
        key: 2,
        label: (
          <Dropdown overlay={dailyHangarMenu} align={{ offset: [160, -36] }}>
            <Link to="/">
              <Space className={styles.category}>
                Daily Hangar
                <Icon
                  iconName="CaretRightSolid8"
                  className={styles.iconRight}
                />
              </Space>
            </Link>
          </Dropdown>
        ),
      },
      {
        key: 3,
        label: (
          <Dropdown overlay={cameraMenu} align={{ offset: [160, -46] }}>
            <Link to="/">
              <Space className={styles.category}>
                Camera
                <Icon
                  iconName="CaretRightSolid8"
                  className={styles.iconRight}
                />
              </Space>
            </Link>
          </Dropdown>
        ),
      },
    ]}
  />
);

const Header: React.FC<IHeaderProps> = () => {
  return (
    <div className={styles.header}>
      <Dropdown overlay={menu} className={styles.headerBtn}>
        <Space className={styles.headerText}>
          <Icon iconName="PageAdd" className={styles.icon} />
          Create new Pass
          <Icon
            iconName="CaretDownSolid8"
            className={styles.iconRight}
          />
        </Space>
      </Dropdown>
    </div>
  );
};
export default Header;
