import {AboutHeader} from "@/components/About/AboutHeader";
import {Container, SimpleGrid} from "@mantine/core";
import {DevInfoEd} from "@/components/About/DevInfoEd";
import {DevInfoVic} from "@/components/About/DevInfoVic";
import {DevInfoAndrew} from "@/components/About/DevInfoAndrew";

export default function AboutPage() {
    return (
        <Container>
            <AboutHeader/>
            <SimpleGrid cols={3}>
                <DevInfoVic/>
                <DevInfoAndrew/>
                <DevInfoEd/>
            </SimpleGrid>
        </Container>
    );
}