import { ToastContainer, Toast } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function MyToast() {
    let notification = useSelector((s) => s.notification);

    //   // Check if notification is not an empty object
    //   if (
    //     Object.keys(notification).length === 0 &&
    //     notification.constructor === Object
    //   ) {
    //     return null; // or any other fallback content
    //   }

    return Object.keys(notification).length !== 0 ? (
        <ToastContainer
            className="p-3"
            position={"top-end"}
            style={{ zIndex: 1 }}
        >
            <Toast
                bg={notification.type === "success" ? "success" : "danger"}
                className="d-inline-block m-1"
            >
                <Toast.Header closeButton={false}>
                    <box-icon
                        size="xl"
                        color="black"
                        name="calculator"
                    ></box-icon>
                    <strong className="me-auto text-dark ms-2">ePOS</strong>
                </Toast.Header>
                <Toast.Body className="text-light">
                    {notification.message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    ) : null;
}
