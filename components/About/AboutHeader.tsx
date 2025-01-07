'use client';
import { IconCheck } from '@tabler/icons-react';
import { Button, Container, Group, Image, List, Text, ThemeIcon, Title } from '@mantine/core';
import classes from './AboutHeader.module.css';
import image from '@/assets/craft.webp';

export function AboutHeader() {
    return (
        <Container size="md">
            <div className={classes.inner}>
                <div className={classes.content}>
                    <Title className={classes.title}>
                    Welcome to <span className={classes.highlight}>CRAFT</span> team! <br /> 
                    </Title>
                    <Text c="dimmed" mt="md">
                    We are a passionate team of three developers dedicated to creating innovative and user-friendly solutions. As co-founders, we bring together a diverse set of skills and experiences to craft products that push the boundaries of what's possible. Let us introduce ourselves:
                    </Text>

                    <List
                        mt={30}
                        spacing="sm"
                        size="sm"
                        icon={
                            <ThemeIcon size={20} radius="xl">
                                <IconCheck size={12} stroke={1.5} />
                            </ThemeIcon>
                        }
                    >
                        <List.Item>
                            <b>Vitor Gomes</b> excels in transforming complex ideas into seamless, user-friendly solutions.
                        </List.Item>
                        <List.Item>
                            <b>Andrew Lang</b> crafts intuitive, visually stunning interfaces that delight users and drive engagement.
                        </List.Item>
                        <List.Item>
                            <b>Ed Garmash</b> ensures our applications run efficiently delivering robust, high-performance solutions.
                        </List.Item>
                    </List>
                    <Text c="dimmed" mt="md">
                    Together, we have created CRAFT with a shared vision of delivering high-quality software and providing exceptional customer experiences.
                    </Text>
                </div>
                <Image src={image.src} className={classes.image} />
            </div>
        </Container>
    );
}