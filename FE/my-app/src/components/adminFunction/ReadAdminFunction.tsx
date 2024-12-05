import * as React from "react";
import { useDispatch } from "react-redux";
import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import { AdminFunction } from "./AdminFunction";
import { Link } from "react-router-dom";
import { readAllAdminFunctions, deleteAdminFunction } from "../../store/reducers/adminFunctionSlice";

export const ReadAdminFunction = () => {
    const { adminFunctions, pending, error, searchData } = useSelector(
        (state: any) => state.adminFunctionReducer,
        shallowEqual
    )
    const dispatch = useDispatch<any>();
    const [id, setId] = React.useState<number | undefined>(undefined);
    const [isPopup, setPopup] = React.useState(false);
    const [activeRadio, setActiveRadio] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        dispatch(readAllAdminFunctions());
    }, []);
    const viewAdminFunction = (id: number | undefined) => {
        setId(id);
        setPopup(true);
    };
    if (pending) {
        return <h2>Loading...</h2>
    }
    return (
        <div>
            <AdminFunction id={id} setPopup={setPopup} isPopup={isPopup} />
            <h2>All Admin Function - {adminFunctions?.length ?? 0}</h2>
            <input
                type="radio"
                className="form-check-input"
                name="active"
                value=""
                id="all"
                onChange={(e) => setActiveRadio(e.target.value)}
            />
            <label className="form-check-label" htmlFor="all">
                All
            </label>{" "}
            &nbsp;
            <input
                type="radio"
                className="form-check-input"
                name="active"
                value="ACTIVE"
                id="isActive"
                onChange={(e) => setActiveRadio(e.target.value)}
            />
            <label className="form-check-label" htmlFor="isActive">
                Active
            </label>{" "}
            &nbsp;
            <input
                type="radio"
                className="form-check-input"
                name="active"
                id="disabled"
                value="DISABLED"
                onChange={(e) => setActiveRadio(e.target.value)}
            />
            <label className="form-check-label" htmlFor="notActive">
                Disabled
            </label>
            {adminFunctions &&
                adminFunctions
                    .filter((af: IAdminFunction) => {
                        if (!searchData) {
                            return af;
                        } else {
                            return af.NAME.toLowerCase().includes(searchData.toLowerCase());
                        }
                    })
                    .filter((af: IAdminFunction) => {
                        if (!activeRadio) {
                            return af;
                        } else {
                            return af.STATUS === activeRadio;
                        }
                    })
                    .map((af: IAdminFunction) => (
                        <div key={af.ID}>
                            <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
                                <div className="row g-0">
                                    <div className="col">
                                        <div className="card-body">
                                            <h5 className="card-title">{af.NAME}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{af.STATUS}</h6>
                                            <hr />
                                            <button
                                                className="btn btn-success"
                                                onClick={() => {
                                                    viewAdminFunction(af.ID);
                                                }}
                                            >
                                                View
                                            </button>{" "}
                                            &nbsp;
                                            <Link to={`/edit/${af.ID}`} className="btn btn-warning">
                                                Edit
                                            </Link>{" "}
                                            &nbsp;
                                            <button
                                                onClick={() => {
                                                    dispatch(deleteAdminFunction(af.ID));
                                                    dispatch(readAllAdminFunctions());
                                                }}
                                                className="btn btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
            }
        </div>
    )
}