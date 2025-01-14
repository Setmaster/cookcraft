'use client';
import { AboutHeader } from "@/components/About/AboutHeader";
import {Container, SimpleGrid, Stack} from "@mantine/core";
import { DevInfo } from "@/components/About/DevInfo";
import {useMediaQuery} from "@mantine/hooks";

export default function AboutPage() {
    const isMobile = useMediaQuery('(max-width: 790px)');
    
    return (
        <Container>
            <AboutHeader />
            {!isMobile && (
            <SimpleGrid cols={3}>
                <DevInfo
                    name="Vitor Gomes"
                    email="victor@craft.io"
                    phone="+11 (876) 890 56 21"
                    imageUrl="https://i.imgur.com/HVOs3rp.png"
                />
                <DevInfo
                    name="Andrew Lang"
                    email="andrew@craft.io"
                    phone="+11 (876) 890 56 22"
                    imageUrl="https://i.imgur.com/sKJus1t.jpeg"
                />
                <DevInfo
                    name="Ed Garmash"
                    email="ed@craft.io"
                    phone="+11 (876) 890 56 23"
                    imageUrl="https://i.imgur.com/0QZBlaG.png"
                />
            </SimpleGrid>
            )}
            {isMobile && (
            <Stack
            align="center"
            gap="lg"
            >
                <DevInfo
                    name="Vitor Gomes"
                    email="victor@craft.io"
                    phone="+11 (876) 890 56 21"
                    imageUrl="https://i.imgur.com/HVOs3rp.png"
                />
                <DevInfo
                    name="Andrew Lang"
                    email="andrew@craft.io"
                    phone="+11 (876) 890 56 22"
                    imageUrl="https://i.imgur.com/sKJus1t.jpeg"
                />
                <DevInfo
                    name="Ed Garmash"
                    email="ed@craft.io"
                    phone="+11 (876) 890 56 23"
                    imageUrl="https://i.imgur.com/0QZBlaG.png"
                />
            </Stack>
            )}
        </Container>
    );
}
