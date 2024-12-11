import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { searchAdminFunction } from "../_store/reducers/adminFunctionSlice";
import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import { authActions } from "../_store/store";

export const Navbar = () => {
    const authUser: IUser = useSelector(
        (state: any) => state.auth.user,
        shallowEqual
    )
    const [searchData, setSearchData] = useState<string | undefined>();
    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (searchData) {
            dispatch(searchAdminFunction(searchData));
        }
    }, [searchData, dispatch]);

    const logout = () => dispatch(authActions.logout());

    // only show nav when logged in
    if (!authUser) return null;

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
                                ALL
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                ADD
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
                        Search
                    </button>
                    <button
                        onClick={logout}
                        className="btn btn-link nav-item nav-link"
                        style={{
                            color: 'white', /* Màu chữ */
                            backgroundColor: 'red', /* Màu nền */
                            border: 'none', /* Bỏ viền */
                            padding: '10px 20px', /* Đệm */
                            textAlign: 'center', /* Căn giữa văn bản */
                            textDecoration: 'none', /* Bỏ gạch chân */
                            display: 'inline-block', /* Hiển thị dưới dạng khối nội tuyến */
                            fontSize: '16px', /* Cỡ chữ */
                            margin: '4px 2px', /* Lề */
                            cursor: 'pointer', /* Con trỏ chuột */
                            borderRadius: '5px' /* Bo góc */
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};
