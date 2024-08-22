import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    add,
    remove,
    update,
    updateDiscount,
    updateSalesPerson,
} from "../../Store/scannedProductsSlice";
import { addCustomer } from "../../Store/customerSlice";
import { Modal } from "react-bootstrap";
import {
    addNotification,
    removeNotificationAfterDelay,
} from "../../Store/notificationSlice";
import { DeleteIcon } from "../../assets/icons/delete-icon";
import { AddIcon } from "../../assets/icons/add-icon";
import { PersonIcon } from "../../assets/icons/person-icon";
import QtyModal from "../QtyModal";
import SalesPersonModal from "../SalesPersonModal";
import { getProducts } from "../../Store/productSlice";
import { getSalesPersons } from "../../Store/salesPersonsSlice";
import { getCustomers } from "../../Store/customersSlice";
import { Status } from "../../assets/status";
import Loading from "../Loading";

export default function Billing() {
    const [universal, setUniversal] = useState("");
    const dispatch = useDispatch();
    const scannedProducts = useSelector((s) => s.scannedProducts);
    const [discount, _setDiscount] = useState(0);
    const [showDiscModal, setShowDiscModal] = useState(false);
    const [discValue, setDiscValue] = useState(0);
    const [grossAmount, setGrossAmount] = useState(0);
    const [showSettModal, setShowSettModal] = useState(false);
    const [settlement, setSettlement] = useState({ cash: 0, card: 0, upi: 0 });
    const [showQtyModal, setShowQtyModal] = useState(false);
    const [barcode, setBarcode] = useState("");
    const [showSalesPersonModal, setShowSalesPersonModal] = useState(false);
    let { data: products, status: productStatus } = useSelector(
        (s) => s.products
    );
    let salespersons = useSelector((s) => s.salesPersons);
    let customers = useSelector((s) => s.customers);

    useEffect(() => {
        dispatch(getProducts(localStorage.getItem("shop_id")));
        dispatch(getSalesPersons(localStorage.getItem("shop_id")));
        dispatch(getCustomers(localStorage.getItem("shop_id")));
    }, []);

    const handleKeyDown = (e) => {
        if (e.key == "Enter") {
            e.preventDefault();

            if (!universal) return;

            if (universal.charAt(0) === ".") {
                if (scannedProducts.length) {
                    let salesPerson = salespersons.find(
                        (s) => s.code === universal.slice(1)
                    );
                    if (salesPerson) {
                        scannedProducts.forEach((product) => {
                            if (product.salesPersonCode === "1") {
                                dispatch(
                                    updateSalesPerson({
                                        barcode: product.barcode,
                                        code: salesPerson.code,
                                    })
                                );
                            }
                        });
                    } else {
                        dispatch(
                            addNotification({
                                type: "error",
                                message: "sales person not found",
                            })
                        );
                        dispatch(removeNotificationAfterDelay());
                    }
                }
                setUniversal("");
                return;
            }

            if (universal.toLowerCase() === "d") {
                setUniversal("");
                if (scannedProducts.length) {
                    setShowDiscModal(true);
                }
                return;
            }

            if (+universal === 0) {
                setUniversal("");
                if (scannedProducts.length) {
                    setShowSettModal(true);
                }
                return;
            }

            const regex = /^\d{10}$/;

            if (universal.length === 10) {
                if (regex.test(universal)) {
                    let customer = customers.find(
                        (c) => c.mobile === universal
                    );
                    if (customer) {
                        dispatch(addCustomer(customer));
                    } else {
                        dispatch(
                            addCustomer({
                                id: "",
                                mobile: universal,
                                name: "",
                            })
                        );
                    }
                    setUniversal("");
                    return;
                } else {
                    dispatch(
                        addNotification({
                            type: "error",
                            message: "enter valid mobile number",
                        })
                    );
                    dispatch(removeNotificationAfterDelay());
                    setUniversal("");
                    return;
                }
            }

            if (productStatus === Status.Error) {
                dispatch(
                    addNotification({
                        type: "error",
                        message: "shop not defined",
                    })
                );
                dispatch(removeNotificationAfterDelay());
                return;
            }

            const product = products.find((product) => {
                return product.barcode.toLowerCase() == universal.toLowerCase();
            });

            if (!product) {
                dispatch(
                    addNotification({
                        type: "error",
                        message: "barcode not found",
                    })
                );
                dispatch(removeNotificationAfterDelay());
                return;
            }

            let scannedProduct = null;
            if (scannedProducts.length) {
                scannedProduct = scannedProducts.find((p) => {
                    return (
                        p.barcode.toLowerCase() == product.barcode.toLowerCase()
                    );
                });
            }

            if (!scannedProduct) {
                dispatch(add(product));
            } else {
                dispatch(update(product.barcode));
            }

            setUniversal("");
        }
    };

    useEffect(() => {
        setGrossAmount(
            scannedProducts.reduce(
                (acc, product) => acc + +product.qty * +product.retailPrice,
                0
            )
        );
    }, [scannedProducts]);

    const removeProduct = (barcode) => {
        dispatch(remove(barcode));
    };

    const setDiscount = () => {
        dispatch(updateDiscount(discount));
        // Close the Bootstrap modal
        setShowDiscModal(false);
    };

    const handleClose = () => {
        setShowDiscModal(false);
    };

    const closeSettlementModal = () => {
        setShowSettModal(false);
    };

    const validateSettlement = () => {
        const { card, upi } = settlement;
        const totalPayment = parseFloat(card) + parseFloat(upi);
        const requiredAmt = parseFloat(grossAmount) - parseFloat(discValue);

        if (parseFloat(card) > requiredAmt) {
            dispatch(
                addNotification({
                    type: "error",
                    message: "Card amount exceeds the required value",
                })
            );
        } else if (parseFloat(upi) > requiredAmt) {
            dispatch(
                addNotification({
                    type: "error",
                    message: "UPI amount exceeds the required value",
                })
            );
        } else if (totalPayment > requiredAmt) {
            dispatch(
                addNotification({
                    type: "error",
                    message: "Card + UPI amount exceeds the required value",
                })
            );
        }
        dispatch(removeNotificationAfterDelay());
    };

    const updateSettlement = (e, mode) => {
        const newValue = e.target.value.trim(); // Remove leading/trailing whitespace

        // Check if the input is empty or not a valid number
        if (newValue === "" || isNaN(newValue)) {
            setSettlement((prev) => ({
                ...prev,
                [mode]: 0,
            }));
            return;
        }

        setSettlement((prev) => ({
            ...prev,
            [mode]: parseFloat(newValue),
        }));
    };

    return (
        <div
            className="billing position-absolute bottom-0 left-0 border-top border-info border-5 rounded-2"
            style={{
                height: "calc(100dvh - var(--navbar-height))",
                width: "80dvw",
            }}
        >
            <div className="barcode m-3 border-bottom">
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-floating mb-3 w-100">
                            <input
                                type="text"
                                className="form-control"
                                id="universal"
                                placeholder="*****"
                                onChange={(e) => setUniversal(e.target.value)}
                                onKeyDown={handleKeyDown}
                                value={universal}
                            />
                            <label
                                htmlFor="universal"
                                className="text-secondary"
                            >
                                Barcode / Mobile No / SalesPerson No
                            </label>
                        </div>
                    </div>
                    {/* <div className="col-md-3">
                        <div className="row h-100">
                            <button
                                type="button"
                                className="btn btn-info text-light h-75 w-25 me-3"
                            >
                                ADD
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
            {productStatus === Status.Loading ? (
                <Loading />
            ) : (
                <div className="datatable m-3">
                    <div className="table-responsive-md">
                        <table className="table table-striped table-hover table-dark">
                            <thead>
                                <tr>
                                    <th className="d-none">Id</th>
                                    <th>S No</th>
                                    <th>Barcode</th>
                                    <th>Description</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Disc %</th>
                                    <th>Disc</th>
                                    <th>Amount</th>
                                    <th>Sales Person</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scannedProducts &&
                                    scannedProducts.map((product, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="d-none">
                                                    {product.id}
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {product.barcode.toUpperCase()}
                                                </td>
                                                <td>
                                                    {product.description.toUpperCase()}
                                                </td>
                                                <td>{product.qty}</td>
                                                <td>
                                                    {(+product.retailPrice).toFixed(
                                                        2
                                                    )}
                                                </td>
                                                <td>{product.discount}</td>
                                                <td>
                                                    {(
                                                        +product.qty *
                                                        +product.retailPrice *
                                                        (+product.discount /
                                                            100)
                                                    ).toFixed(2)}
                                                </td>
                                                <td>
                                                    {(
                                                        +product.qty *
                                                            +product.retailPrice -
                                                        +product.qty *
                                                            +product.retailPrice *
                                                            (+product.discount /
                                                                100)
                                                    ).toFixed(2)}
                                                </td>
                                                <td>
                                                    {salespersons
                                                        .find(
                                                            (p) =>
                                                                p.code ===
                                                                product.salesPersonCode
                                                        )
                                                        .name.toUpperCase()}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn py-0"
                                                        type="button"
                                                        onClick={() => {
                                                            setShowQtyModal(
                                                                true
                                                            );
                                                            setBarcode(
                                                                product.barcode
                                                            );
                                                        }}
                                                    >
                                                        <AddIcon />
                                                    </button>
                                                    <button
                                                        className="btn py-0"
                                                        type="button"
                                                        onClick={() => {
                                                            setShowSalesPersonModal(
                                                                true
                                                            );
                                                            setBarcode(
                                                                product.barcode
                                                            );
                                                        }}
                                                    >
                                                        <PersonIcon />
                                                    </button>
                                                    <button
                                                        className="btn py-0"
                                                        type="button"
                                                        onClick={() =>
                                                            removeProduct(
                                                                product.barcode
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <Modal
                show={showDiscModal}
                backdrop="static"
                keyboard={false}
                onHide={handleClose}
                centered
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title>Discount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-4">
                            <div className="form-floating mb-3">
                                <input
                                    autoFocus
                                    className="form-control"
                                    type="text"
                                    placeholder="***"
                                    value={discount !== 0 ? discount : ""}
                                    onChange={(e) => {
                                        _setDiscount(+e.target.value);
                                        setDiscValue(
                                            scannedProducts.reduce(
                                                (acc, p) =>
                                                    acc +
                                                    +p.qty *
                                                        +p.retailPrice *
                                                        (+e.target.value / 100),
                                                0
                                            )
                                        );
                                    }}
                                />
                                <label className="text-secondary">
                                    Disc in %
                                </label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="***"
                                    value={discValue === 0 ? "" : discValue}
                                    onChange={(e) => {
                                        const newDiscValue = +e.target.value;
                                        setDiscValue(newDiscValue);
                                        _setDiscount(
                                            (
                                                (+newDiscValue * 100) /
                                                grossAmount
                                            ).toFixed(2)
                                        );
                                    }}
                                />
                                <label className="text-secondary">
                                    Disc in value
                                </label>
                            </div>
                        </div>
                        <div className="col-2">
                            <button
                                className="btn btn-info text-light h-75 w-100"
                                onClick={setDiscount}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={showSettModal}
                backdrop="static"
                onHide={closeSettlementModal}
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Bill Settlement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="***"
                                    value={
                                        settlement.cash === 0
                                            ? ""
                                            : settlement.cash
                                    }
                                    onChange={(e) =>
                                        updateSettlement(e, "cash")
                                    }
                                    autoFocus
                                />
                                <label
                                    htmlFor="cash"
                                    className="text-secondary"
                                >
                                    CASH
                                </label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="***"
                                    value={
                                        settlement.card === 0
                                            ? ""
                                            : settlement.card
                                    }
                                    onChange={(e) =>
                                        updateSettlement(e, "card")
                                    }
                                />
                                <label
                                    htmlFor="card"
                                    className="text-secondary"
                                >
                                    CARD
                                </label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="***"
                                    value={
                                        settlement.upi === 0
                                            ? ""
                                            : settlement.upi
                                    }
                                    onChange={(e) => updateSettlement(e, "upi")}
                                />
                                <label htmlFor="upi" className="text-secondary">
                                    UPI
                                </label>
                            </div>
                            <div className="ms-1 mb-3">
                                <label>
                                    Return :
                                    <h3 className="d-inline ms-2">
                                        {Math.max(
                                            0,
                                            settlement.cash +
                                                settlement.card +
                                                settlement.upi -
                                                (grossAmount - discValue)
                                        )}
                                    </h3>
                                </label>
                            </div>
                            <div>
                                <button
                                    className="btn btn-info text-light w-100"
                                    type="button"
                                    onClick={validateSettlement}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <QtyModal
                barcode={barcode}
                show={showQtyModal}
                onClose={() => setShowQtyModal(false)}
            />
            <SalesPersonModal
                barcode={barcode}
                show={showSalesPersonModal}
                onClose={() => setShowSalesPersonModal(false)}
            />
        </div>
    );
}
