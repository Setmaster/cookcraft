import { IconTrash, IconClockHour12, IconReceipt } from '@tabler/icons-react';
import {
    Badge,
    Card,
    Container,
    Group,
    SimpleGrid,
    Stack,
    Text,
    Title,
    useMantineTheme,
} from '@mantine/core';
import classes from './FeatureCards.module.css';

const mockdata = [
    {
        title: 'Save time',
        description:
            'Save your precious time from trying to come up with recipes. There are thousands of recipes out there, you just need the right ingredients.',
        icon: IconClockHour12,
    },
    {
        title: 'Create new recipes',
        description:
            'Try out new recipes you have not tried before. Expand your horizon and find your new favourite recipe',
        icon: IconReceipt,
    },
    {
        title: 'Reduce food waste',
        description:
            'Remember those potatoes sitting in the pantry? Or the leftover ground beef nearing its expiry date? Use those in a recipe instead of throwing them out.',
        icon: IconTrash,
    },
];

export function FeaturesCards() {
    const theme = useMantineTheme();
    const features = mockdata.map((feature) => (
        <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
            <Stack align="center">
                <feature.icon size={50} stroke={2} color={theme.colors.blue[6]} />
                <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                    {feature.title}
                </Text>
                <Text fz="sm" c="dimmed" mt="sm" ta="center">
                    {feature.description}
                </Text>
            </Stack>
        </Card>
    ));

    return (
        <Container size="lg" py="xl">
            <Group justify="center">
                <Badge variant="filled" size="lg">
                    Cookcraft
                </Badge>
            </Group>

            <Title order={2} className={classes.title} ta="center" mt="sm">
                Generate recipes with any ingredients in a single prompt
            </Title>

            <Text c="dimmed" className={classes.description} ta="center" mt="md">
                Type your list of ingredients and pass it to Cookcraft. It will generate a list of recipes
                that you can make with those ingredients.
            </Text>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
                {features}
            </SimpleGrid>
        </Container>
    );
}