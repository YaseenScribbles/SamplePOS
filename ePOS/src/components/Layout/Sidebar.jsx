import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCustomer } from "../../Store/customerSlice";
import { UseBillSummary } from "../../Context/BillContext";

export default function Sidebar() {
    let scannedProducts = useSelector((s) => s.scannedProducts);
    // const [qty, setQty] = useState(0);
    const [grossAmt, setGrossAmt] = useState(0);
    // const [amount, setAmount] = useState(0);
    const [roundoff, setRoundOff] = useState(0);
    // const [discount, setDiscount] = useState(0);
    let customer = useSelector((s) => s.customer);
    let dispatch = useDispatch();
    const [shopName, setShopName] = useState("");

    const {
        discValue,
        setDiscValue,
        amount,
        setAmount,
        totalPcs,
        setTotalPcs,
    } = UseBillSummary();

    useEffect(() => {
        const updateNavbarHeight = () => {
            const navbarHeight = document.querySelector(".navbar").offsetHeight;
            // const sidebarWidth = doucument.querySelector(".sidebar");
            // console.log(sidebarWidth);
            document.documentElement.style.setProperty(
                "--navbar-height",
                navbarHeight + "px"
            );
        };

        // Initial update
        updateNavbarHeight();

        //Shop Name
        getShopName();

        // Update on window resize
        window.addEventListener("resize", updateNavbarHeight);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", updateNavbarHeight);
        };
    }, []);

    useEffect(() => {
        // setQty(scannedProducts.reduce((acc, product) => acc + +product.qty, 0));
        setTotalPcs(
            scannedProducts.reduce((acc, product) => acc + +product.qty, 0)
        );

        setGrossAmt(
            scannedProducts.reduce(
                (acc, product) => acc + +product.qty * +product.retailPrice,
                0
            )
        );

        // setDiscount(
        //     scannedProducts.reduce(
        //         (acc, p) => acc + +p.qty * +p.retailPrice * (+p.discount / 100),
        //         0
        //     )
        // );

        setDiscValue(
            scannedProducts.reduce(
                (acc, p) => acc + +p.qty * +p.retailPrice * (+p.discount / 100),
                0
            )
        );

        let amt = scannedProducts.reduce(
            (acc, product) =>
                acc +
                +product.qty * +product.retailPrice -
                +product.qty * +product.retailPrice * (+product.discount / 100),
            0
        );

        const roundedValue = Math.round(amt);
        const adjustment = roundedValue - amt;
        setRoundOff(adjustment);
        setAmount(roundedValue);
    }, [scannedProducts]);

    const getShopName = async () => {
        try {
            const result = await fetch(
                `http://localhost:8000/api/shops/${localStorage.getItem(
                    "shop_id"
                )}`
            );
            const { data } = await result.json();
            setShopName(data[0].shopName || "");
        } catch (error) {
            console.error(error);
            setShopName("");
        }
    };

    return (
        <div>
            <div
                className="sidebar bg-dark position-absolute end-0 bottom-0"
                style={{
                    height: "calc(100dvh - var(--navbar-height))",
                    width: "20dvw",
                }}
            >
                <div className="row w-100 position-absolute top-0 bottom-0 right-0 p-0 m-0">
                    <div className="col ms-2">
                        <div className="row w-100">
                            <div className="shop-info d-flex justify-content-center align-items-center">
                                <box-icon
                                    name="store-alt"
                                    size="35px"
                                    color="white"
                                ></box-icon>
                                <h4 className="h4 text-bg-dark m-3 text-center">
                                    {shopName.toUpperCase()}
                                </h4>
                            </div>
                        </div>
                        <hr className="mb-1 text-light" />
                        <div className="row w-100">
                            <div className="customer-info">
                                <h4 className="h4 text-bg-dark m-3 text-center">
                                    Customer Info
                                </h4>
                                <div className="form-floating mb-3 w-100 ms-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="mobile_no"
                                        placeholder="Mobile No"
                                        onChange={(e) =>
                                            dispatch(
                                                updateCustomer({
                                                    value: e.target.value,
                                                    field: "mobile",
                                                })
                                            )
                                        }
                                        defaultValue={customer.mobile}
                                    />
                                    <label htmlFor="mobile_no">Mobile No</label>
                                </div>

                                <div className="form-floating mb-3 w-100 ms-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Name"
                                        onChange={(e) =>
                                            dispatch(
                                                updateCustomer({
                                                    value: e.target.value,
                                                    field: "name",
                                                })
                                            )
                                        }
                                        defaultValue={customer.name}
                                    />
                                    <label htmlFor="name">Name</label>
                                </div>
                            </div>
                        </div>
                        <hr className="mb-1 text-light" />
                        <div className="row w-100">
                            <div className="bill-info text-bg-dark">
                                <h4 className="h4 text-bg-dark m-3 text-center">
                                    Bill Info
                                </h4>
                                <div className="row mb-3">
                                    <div className="col-7">
                                        <h5>Purchased Pcs</h5>
                                    </div>
                                    <div className="col-1">
                                        <h5>:</h5>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="text-end">
                                            <strong>{totalPcs}</strong>
                                        </h5>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-7">
                                        <h5>Returned Pcs</h5>
                                    </div>
                                    <div className="col-1">
                                        <h5>:</h5>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="text-end">
                                            <strong>0</strong>
                                        </h5>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-7">
                                        <h5>Gross Amount</h5>
                                    </div>
                                    <div className="col-1">
                                        <h5>:</h5>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="text-end">
                                            <strong>
                                                {grossAmt.toFixed(2)}
                                            </strong>
                                        </h5>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-7">
                                        <h5>Discount</h5>
                                    </div>
                                    <div className="col-1">
                                        <h5>:</h5>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="text-end">
                                            <strong>
                                                {discValue.toFixed(2)}
                                            </strong>
                                        </h5>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-7">
                                        <h5>Round Off</h5>
                                    </div>
                                    <div className="col-1">
                                        <h5>:</h5>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="text-end">
                                            <strong>
                                                {roundoff.toFixed(2)}
                                            </strong>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="m-0 text-light" />
                        <div className="row w-100">
                            <div className="bill-summary text-bg-dark p-4">
                                <h4 className="h4 text-bg-dark mb-3 text-center">
                                    Bill Summary
                                </h4>
                                <div className="row">
                                    <div className="col-5 border-end">
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <h3>Pcs</h3>
                                            <h2 className="fw-bold">{totalPcs}</h2>
                                        </div>
                                    </div>
                                    <div className="col-7 border-start">
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <h3>Amount</h3>
                                            <h2 className="fw-bold">
                                                {amount.toFixed(2)}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
