import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import {Login} from "@/components/Authentication/Login";

export default function LoginModal() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close}>
                <Login/>
            </Modal>

            <Button variant="default" onClick={open}>
                Login
            </Button>
        </>
    );
}