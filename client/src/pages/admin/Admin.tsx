import { Container } from "@mantine/core";
import { Outlet } from "react-router-dom";

export default function Admin() {

    return (
        <Container>
            <Outlet />            
        </Container>
    );
}