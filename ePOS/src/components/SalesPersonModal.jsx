import { useState } from "react";
import {
    Modal,
    Container,
    Row,
    Col,
    FloatingLabel,
    Form,
    Button,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateSalesPerson } from "../Store/scannedProductsSlice";
import {
    addNotification,
    removeNotificationAfterDelay,
} from "../Store/notificationSlice";
import { salespersons } from "../assets/salespersons";


export default function SalesPersonModal(props) {
    const [salePersonCode, setSalePersonCode] = useState("");
    const { barcode, onClose, show } = props;
    const dispatch = useDispatch();

    const updateSalePerson = () => {

        let sp = salespersons.find(p => p.code === salePersonCode)

        if (!sp) {
            dispatch(
                addNotification({
                    type: "error",
                    message: "please provide valid salesperson code.",
                })
            );
            dispatch(removeNotificationAfterDelay());
            return;
        }

        dispatch(updateSalesPerson({ code: salePersonCode, barcode: barcode }));
        setSalePersonCode('');
        onClose();
    };

    return (
        <>
            <Modal
                show={show}
                keyboard={false}
                backdrop="static"
                onHide={onClose}
                centered
            >
                <Modal.Header closeButton>Change SalesPerson </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row>
                            <Col xs={8}>
                                <FloatingLabel
                                    controlId="salesPerson"
                                    label="Sale Person"
                                    className="mb-3 p-0"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="*******"
                                        onChange={(e) =>
                                            setSalePersonCode(e.target.value)
                                        }
                                        value={salePersonCode ?? ""}
                                        autoFocus
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col xs={4}>
                                <Button
                                    variant="info"
                                    className="text-light w-100 h-75"
                                    onClick={updateSalePerson}
                                >
                                    Update
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}
