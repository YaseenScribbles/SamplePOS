import "boxicons";
import { useState } from "react";
import Setting from "../SettingModal";

export default function Navbar() {
    const [activeLink, _setActiveLink] = useState("");

    const setActiveLink = (link) => {
        _setActiveLink(link);
    };

    const [showSetting, setShowSetting] = useState(false);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <div className="d-flex align-items-center">
                        <div>
                            <box-icon
                                size="xl"
                                color="white"
                                name="calculator"
                            ></box-icon>
                        </div>
                        <div className="mb-2 ms-2">
                            <a className="navbar-brand" href="#">
                                ePOS
                            </a>
                        </div>
                    </div>
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
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li
                                className="nav-item text-center"
                                onClick={() => setActiveLink("hold")}
                            >
                                <a
                                    className={`nav-link ${
                                        activeLink === "hold" ? "active" : ""
                                    }`}
                                    aria-current="page"
                                    href="#"
                                >
                                    Hold
                                </a>
                                <box-icon
                                    name="pause-circle"
                                    size="sm"
                                    color="white"
                                ></box-icon>
                            </li>
                            <li
                                className="nav-item text-center"
                                onClick={() => setActiveLink("alter")}
                            >
                                <a
                                    className={`nav-link ${
                                        activeLink === "alter" ? "active" : ""
                                    }`}
                                    aria-current="page"
                                    href="#"
                                >
                                    Alter
                                </a>
                                <box-icon
                                    name="edit-alt"
                                    size="sm"
                                    color="white"
                                ></box-icon>
                            </li>
                            <li
                                className="nav-item text-center"
                                onClick={() => setActiveLink("reprint")}
                            >
                                <a
                                    className={`nav-link ${
                                        activeLink === "reprint" ? "active" : ""
                                    }`}
                                    aria-current="page"
                                    href="#"
                                >
                                    Reprint
                                </a>
                                <box-icon
                                    name="printer"
                                    size="sm"
                                    color="white"
                                ></box-icon>
                            </li>
                            <li
                                className="nav-item text-center"
                                onClick={() => setActiveLink("search")}
                            >
                                <a
                                    className={`nav-link ${
                                        activeLink === "search" ? "active" : ""
                                    }`}
                                    aria-current="page"
                                    href="#"
                                >
                                    Search
                                </a>
                                <box-icon
                                    name="search-alt"
                                    size="sm"
                                    color="white"
                                ></box-icon>
                            </li>
                            <li
                                className="nav-item text-center"
                                onClick={() => {
                                    setActiveLink("settings");
                                    setShowSetting(true);
                                }}
                            >
                                <a
                                    className={`nav-link ${
                                        activeLink === "settings"
                                            ? "active"
                                            : ""
                                    }`}
                                    aria-current="page"
                                    href="#"
                                >
                                    Settings
                                </a>
                                <box-icon
                                    name="cog"
                                    size="sm"
                                    color="white"
                                ></box-icon>
                            </li>
                        </ul>
                        <div className="nav-item dropdown text-center">
                            <a
                                className="nav-link dropdown-toggle text-light"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Yaseen
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Logout
                                    </a>
                                </li>
                            </ul>
                            <div className="text-center mt-2">
                                <box-icon
                                    name="user-circle"
                                    size="sm"
                                    color="white"
                                ></box-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Setting show={showSetting} onClose={() => setShowSetting(false)} />
        </>
    );
}
