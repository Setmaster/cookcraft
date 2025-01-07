import { AboutHeader } from "@/components/About/AboutHeader";
import { Container, SimpleGrid } from "@mantine/core";
import { DevInfo } from "@/components/About/DevInfo";

export default function AboutPage() {
    return (
        <Container>
            <AboutHeader />
            <SimpleGrid cols={3}>
                <DevInfo
                    name="Vitor Gomes"
                    email="victor@craft.io"
                    phone="+11 (876) 890 56 21"
                    imageUrl="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                />
                <DevInfo
                    name="Andrew Lang"
                    email="andrew@craft.io"
                    phone="+11 (876) 890 56 22"
                    imageUrl="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                />
                <DevInfo
                    name="Ed Garmash"
                    email="ed@craft.io"
                    phone="+11 (876) 890 56 23"
                    imageUrl="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                />
            </SimpleGrid>
        </Container>
    );
}
