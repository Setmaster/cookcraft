'use client';

import { Container, Title, Accordion } from '@mantine/core';
import classes from './page.module.css';

const answers = {
    'what-is-cookcraft': 'CookCraft is a platform where you can input the ingredients you have, and it will suggest a variety of recipes you can make. This helps to reduce food waste and inspire culinary creativity.',
    'how-to-use-cookcraft': 'To use CookCraft, simply register and log in, then enter the ingredients you have in your kitchen into the input field. The app will generate a list of recipes you can try based on those ingredients.',
    'recipe-suggestions': 'Once you input your ingredients, CookCraft will provide a list of recipes along with detailed instructions and nutritional information. You can browse through the suggestions and choose the one that appeals to you.',
    'cookcraft-rules': 'CookCraft encourages creativity and minimizing food waste. Please ensure that the ingredients you enter are accurate to get the best recipe suggestions. Explore various cuisines and enjoy cooking!',
    'safety-and-support': 'CookCraft provides safe and reliable recipes. If you have any allergies or dietary restrictions, please double-check the ingredients in each recipe. For further assistance, visit our Support page.'
};

export default function FaqPage() {
    return (
        <Container size="sm" className={classes.wrapper}>
            <Title ta="center" className={classes.title}>
                Frequently Asked Questions
            </Title>

            <Accordion variant="separated">
                <Accordion.Item className={classes.item} value="what-is-cookcraft">
                    <Accordion.Control>What is CookCraft?</Accordion.Control>
                    <Accordion.Panel>{answers["what-is-cookcraft"]}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="how-to-use-cookcraft">
                    <Accordion.Control>How do I use CookCraft?</Accordion.Control>
                    <Accordion.Panel>{answers["how-to-use-cookcraft"]}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="recipe-suggestions">
                    <Accordion.Control>How do I get recipe suggestions?</Accordion.Control>
                    <Accordion.Panel>{answers["recipe-suggestions"]}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="cookcraft-rules">
                    <Accordion.Control>What are the guidelines for using CookCraft?</Accordion.Control>
                    <Accordion.Panel>{answers["cookcraft-rules"]}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="safety-and-support">
                    <Accordion.Control>What are the safety and support options?</Accordion.Control>
                    <Accordion.Panel>{answers["safety-and-support"]}</Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}
