import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import Billing from "./components/Layout/Billing";
import { Provider, useDispatch } from "react-redux";
import store from "./Store/store";
import MyToast from "./components/Toast";
import { BillSummaryProvider } from "./Context/BillContext";

function App() {
    return (
        <div
            className="position-relative"
            style={{ width: "100dvw", height: "100dvh" }}
        >
            <Provider store={store}>
                <BillSummaryProvider>
                    <Navbar />
                    <Sidebar />
                    <Billing />
                    <MyToast />
                </BillSummaryProvider>
            </Provider>
        </div>
    );
}

export default App;
