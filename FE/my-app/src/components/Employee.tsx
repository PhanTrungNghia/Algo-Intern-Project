import { useSelector, shallowEqual } from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css';


type Props = {
  id?: number
  setPopup: (isPopup: boolean) => void
  // removeEmployee: (employee: IEmployee) => void
}

export const Employee: React.FC<Props> = ({ id, setPopup }) => {
  const employees: readonly IEmployee[] = useSelector(
    (state: any) => state.reducer.employees,
    shallowEqual
  )
  console.log(employees);
  const employee: IEmployee | undefined = employees.find((e: IEmployee) => e.idEmployee == id)
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setPopup(false)} className="btn btn-warning">
          Close
        </button>
        <h2>{employee?.name}</h2>
        <div>{employee?.age}</div>
        <p>Trạng thái: {employee?.isActive === 1 ? "Kích hoạt" : "Ngừng hoạt động"}</p>
      </div>
    </div>
  )
}