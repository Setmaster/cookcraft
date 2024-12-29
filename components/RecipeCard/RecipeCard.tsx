import { ActionIcon, Card, Group, rem, useMantineTheme, Modal, Button, Text } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import classes from './RecipeCard.module.css';
import Link from "next/link";
import RecipeImage from "@/components/RecipeCard/RecipeImage";
import { IconShare } from "@tabler/icons-react";
import { getAPPUrl } from "@/lib/actions/userActions";

export default function RecipeCard() {
    const theme = useMantineTheme();
    const [opened, { open, close }] = useDisclosure(false);

    const handleShare = async (event: { stopPropagation: () => void; preventDefault: () => void; }) => {
        event.stopPropagation(); // Prevent the Card link from being triggered
        event.preventDefault(); // Stop the default behavior

        const baseUrl = await getAPPUrl();
        const shareLink = `${baseUrl}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Recipe Details',
                    url: shareLink,
                });
            } catch (error) {
                console.error('Error sharing link:', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareLink);
            } catch (error) {
                console.error('Error copying link:', error);
            }
        }
    };

    const handleCardClick = (event: React.MouseEvent) => {
        event.preventDefault();
        open();
    };

    return (
        <>
            <Card
                withBorder
                padding="lg"
                radius="md"
                className={classes.card}
                onClick={handleCardClick}
                component="div"
            >
                <Card.Section mb="sm">
                    <div className={classes.saleImageContainer}>
                        <RecipeImage />
                    </div>
                </Card.Section>

                <Card.Section className={classes.footer}>
                    <div className={classes.bottomText}>Recipe Name</div>
                </Card.Section>
            </Card>

            <Modal opened={opened} onClose={close} title="Recipe Title">
                <Text>Recipe information</Text>
            </Modal>
        </>
    );
}
