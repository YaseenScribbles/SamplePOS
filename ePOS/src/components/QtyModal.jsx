import {
    Button,
    Container,
    Modal,
    Row,
    FloatingLabel,
    Form,
    Col,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateQty } from "../Store/scannedProductsSlice";
import { useState } from "react";
import { addNotification, removeNotificationAfterDelay } from "../Store/notificationSlice";

export default function QtyModal(props) {
    const [qty, setQty] = useState(0);
    const { show, onClose, barcode } = props;
    const dispatch = useDispatch();

    const updateQuantity = () => {
        if (qty <= 0){
            dispatch(addNotification({
                type: 'error',
                message: 'Qty should not be zero or less'
            }))
            dispatch(removeNotificationAfterDelay());
            return;
        }

        dispatch(updateQty({ barcode: barcode, qty: qty }));
        setQty(0);
        onClose();
    };

    return (
        <Modal
            show={show}
            keyboard={false}
            backdrop="static"
            onHide={onClose}
            centered
        >
            <Modal.Header closeButton>Change Qty </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <Row>
                        <Col xs={8}>
                            <FloatingLabel
                                controlId="qty"
                                label="Qty"
                                className="mb-3 p-0"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="*******"
                                    onChange={(e) => setQty(e.target.value)}
                                    value={qty === 0 ? '' : qty}
                                    autoFocus
                                />
                            </FloatingLabel>
                        </Col>
                        <Col xs={4}>
                            <Button
                                variant="info"
                                className="text-light w-100 h-75"
                                onClick={updateQuantity}
                            >
                                Update
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}
