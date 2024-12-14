import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { NavigateFunction, useLocation, useNavigate, Location } from "react-router-dom";

const SideMenu = () => {
    const navigate: NavigateFunction = useNavigate();
    const location: Location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState<string>("/");

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);
    }, [location.pathname])

    return (
        <div className="SideMenu">
            <Menu
                onClick={(item) => {
                    console.log(item.key);
                    navigate(item.key);
                }}
                selectedKeys={[selectedKeys]}
                items={[
                    {
                        label: "Quản lý hệ thống BO",
                        icon: <SettingOutlined/>,
                        key: "/quanlyhethongbo",
                    },
                    {
                        label: "Người dùng nội bộ",
                        icon: <AppstoreOutlined/>,
                        key: "/nguoidungnoibo",
                    },
                    {
                        label: "Quản lý khách hàng",
                        icon: <AppstoreOutlined/>,
                        key: "/quanlykhachhang",
                    },
                    {
                        label: "Quản lý sale",
                        icon: <AppstoreOutlined/>,
                        key: "/quanlysale",
                    },
                    {
                        label: "Quản lý vĩ mô",
                        icon: <AppstoreOutlined/>,
                        key: "/quanlyvimo",
                    },
                    {
                        label: "Quản lý hàng hóa",
                        icon: <AppstoreOutlined/>,
                        key: "/quanlychucnang",
                    },
                    {
                        label: "Chức năng Admin",
                        icon: <AppstoreOutlined/>,
                        key: "/readAllAdminFunction",
                    },
                ]}>

            </Menu>
        </div>
    )
}

export default SideMenu;