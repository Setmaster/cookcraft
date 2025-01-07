'use client';

import { Container, Title, Accordion } from '@mantine/core';
import classes from './page.module.css';

const answers = {
    'what-is-cookcraft': 'CookCraft is an innovative platform designed to transform the way you approach cooking. Simply input the ingredients you have on hand, and CookCraft will provide a variety of delicious and creative recipes tailored to your pantry. Whether you\'re looking to minimize food waste, experiment with new dishes, or just make the most of what you already have, CookCraft is here to inspire your culinary journey. With its user-friendly interface and diverse recipe suggestions, CookCraft makes cooking enjoyable, efficient, and sustainable.',
    'how-to-use-cookcraft': 'Using CookCraft is simple and intuitive. Start by registering for an account and logging in. Once you\'re in, head to the input field and list the ingredients you currently have in your kitchen. With just a click, CookCraft will generate a personalized list of recipes tailored to the ingredients you provided. Whether you\'re a beginner or a seasoned cook, the app makes it easy to discover new dishes and get creative with what\'s already in your pantry.',
    'recipe-suggestions': 'Getting recipe suggestions with CookCraft is quick and easy. Simply enter the ingredients you have, and CookCraft will generate a curated list of recipes tailored to your pantry. Each recipe comes with detailed instructions, making it simple to follow, and includes nutritional information to help you make informed choices. Browse through the suggestions, pick the one that inspires you the most, and start cooking with confidence!',
    'cookcraft-rules': 'CookCraft is designed to inspire creativity in the kitchen while helping to reduce food waste. To get the most out of the platform, make sure the ingredients you input are accurate and up-to-date. This ensures the recipe suggestions are relevant and practical. Don’t be afraid to explore different cuisines, experiment with new ideas, and enjoy the process of cooking. With CookCraft, every meal can be an exciting and sustainable culinary adventure!',
    'safety-and-support': 'CookCraft ensures that all recipes are safe and reliable, but it’s important to consider your personal dietary needs. If you have allergies or specific dietary restrictions, make sure to carefully review the ingredients listed in each recipe before preparing it. Your health and safety are our priority. For additional help or inquiries, visit our Support page, where you can find resources and assistance tailored to your needs.'
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
