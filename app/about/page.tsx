import {AboutHeader} from "@/components/About/AboutHeader";
import {Container, SimpleGrid} from "@mantine/core";
import {DevInfo} from "@/components/About/DevInfo";

export default function AboutPage() {
    return (
        <Container>
            <AboutHeader/>
            <SimpleGrid cols={3}>
                <DevInfo/>
                <DevInfo/>
                <DevInfo/>
            </SimpleGrid>
        </Container>
    );
}