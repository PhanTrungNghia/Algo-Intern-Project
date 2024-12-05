import Modal from "antd/es/modal/Modal"
import { shallowEqual, useSelector } from "react-redux"

type Props = {
    id?: number
    setPopup: (isPopup: boolean) => void
    isPopup: boolean
}

export const AdminFunction: React.FC<Props> = ({ id, setPopup, isPopup }) => {
    const adminFunctions: readonly IAdminFunction[] = useSelector(
        (state: any) => state.adminFunctionReducer.adminFunctions,
        shallowEqual
    )
    const adminFunction: IAdminFunction | undefined = adminFunctions.find((af: IAdminFunction) => af.ID == id);
    const handleOk = () => {
        setPopup(false);
    }
    const handleCancel = () => {
        setPopup(false);
    }
    return (
        <Modal
            title="Admin Function Details"
            open={isPopup}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <p><strong>Name:</strong> {adminFunction?.NAME}</p>
            <p><strong>Status:</strong> {adminFunction?.STATUS}</p>
        </Modal>
    )
} 