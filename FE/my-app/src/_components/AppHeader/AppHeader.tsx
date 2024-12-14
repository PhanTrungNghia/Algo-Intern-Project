import { BellOutlined, MailFilled } from "@ant-design/icons";
import { Badge, Image, Space, Typography } from "antd";
import '../../App.css';

const AppHeader = () => {
    return (
        <div className="AppHeader">
            <Image
                width={42}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm9jq1nzPlPiz3LVrCtbdd0jZmu7EIPxbPXQ&s">
            </Image>
            <Space>
                <Badge count={20}>
                    <BellOutlined style={{ fontSize: 24 }} />
                </Badge>
                <Badge count={10} dot>
                    <MailFilled style={{ fontSize: 24 }} />
                </Badge>
            </Space>
        </div>
    )
}

export default AppHeader;