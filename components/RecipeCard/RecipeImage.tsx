'use client';

import Image from "next/image";
import classes from './RecipeImage.module.css';
import {useState} from "react";
import {LoadingOverlay} from "@mantine/core";

// type RecipeImageProps = {
//    
// };

export default function RecipeImage() {
    const [isLoading, setIsLoading] = useState(true);


    return (
        <>
            <LoadingOverlay
                visible={isLoading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 25 }}
                loaderProps={{ color: 'red', type: 'bars' }}
            />
            <Image
                className={classes.saleImage}
                src={"https://images.unsplash.com/photo-1562923690-e274ba919781?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                alt={``}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                onLoad={() => setIsLoading(false)}
            />
        </>
    );
}