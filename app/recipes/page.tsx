"use client";

import { Prompt } from "@/components/PromptBar/Prompt";

import React from "react";
import Listings from "@/components/Recipes/Listings";

export default function RecipesPage() {
    return (
      <>
        <Prompt />
        <Listings/>
      </>
    );
}
