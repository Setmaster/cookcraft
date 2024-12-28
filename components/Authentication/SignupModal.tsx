import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import {Signup} from "@/components/Authentication/Signup";

export default function SignupModal() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close}>
                <Signup/>
            </Modal>

            <Button variant="default" onClick={open}>
                Signup
            </Button>
        </>
    );
}