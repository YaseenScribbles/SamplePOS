import { Container, Spinner, Row, Col } from "react-bootstrap";

export default function Loading() {
    return (
        <Container>
            <Row>
                <Col className="text-center">
                    <Spinner animation="grow" variant="dark" />
                </Col>
            </Row>
        </Container>
    );
}
