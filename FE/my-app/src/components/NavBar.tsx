import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchEmployee } from "../store/reducers/employeeSlice";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Navbar = () => {
    const [searchData, setSearchData] = useState<string | undefined>();
    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (searchData) {
            dispatch(searchEmployee(searchData));
        }
    }, [searchData, dispatch]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/read">
                    Algo Paltform
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/read">
                                Danh sách nhân viên
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                Thêm nhân viên
                            </a>
                        </li>
                    </ul>
                    <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={(e) => setSearchData(e.currentTarget.value)}
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Tìm
                        </button>
                </div>
            </div>
        </nav>
    );
};
