import {
    Button,
    Col,
    Container,
    FloatingLabel,
    Form,
    Modal,
    Row,
} from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../Store/productSlice";

export default function Setting(props) {
    const { show, onClose } = props;
    const dispatch = useDispatch();

    const [termId, setTermId] = useState(localStorage.getItem("term_id"));
    const [shopId, setShopId] = useState(localStorage.getItem("shop_id"));

    const saveSettings = () => {
        localStorage.setItem("term_id", termId);
        localStorage.setItem("shop_id", shopId);
        dispatch(getProducts(localStorage.getItem('shop_id')));
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
            <Modal.Header className="h4" closeButton>
                Shop Setting
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <Row>
                        <Col xs={4}>
                            <FloatingLabel
                                controlId="termId"
                                label="Term ID"
                                className="mb-3 p-0 text-secondary"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="*******"
                                    value={termId || ""}
                                    onChange={(e) => setTermId(e.target.value)}
                                    autoFocus
                                />
                            </FloatingLabel>
                        </Col>
                        <Col xs={4}>
                            <FloatingLabel
                                controlId="shopId"
                                label="Shop ID"
                                className="mb-3 p-0 text-secondary"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="****"
                                    value={shopId || ""}
                                    onChange={(e) => setShopId(e.target.value)}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col xs={4}>
                            <Button
                                className="text-light h-75 w-75"
                                variant="info"
                                onClick={saveSettings}
                            >
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}
