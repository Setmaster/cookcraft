# **COOKCRAFT**

---

## **Table of Contents**
1. [Overview](#overview)
2. [Features](#features)
3. [Settings](#settings)
4. [Usage](#usage)
5. [Dependencies](#dependencies)
6. [License](#license)
7. [Contact](#contact)

## **Overview**
This project is a web application built with Next.js and Node.js, designed to help users find recipes based on the ingredients they have at home. The app leverages an AI model to suggest recipes tailored to those ingredients.

## **Features** 
- User registration and authentication.
- Search recipes using comma-separated ingredients.
- Manage personal recipes.
- Frequently Asked Questions (FAQ) section.

## **Settings**

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
    - DATABASE_URL: your database host address
    - POSTGRES_USER: your database user
    - POSTGRES_PASSWORD: your database password
    - POSTGRES_DB: your database name
    - DB_PORT: your database port
    - DATABASE_URL: your database URL (eg. postgres://user:password@host:port/db_name)
    - BETTER_AUTH_SECRET: you encryption key for user authentication 
    - BETTER_AUTH_URL: your web app root URL
    - GOOGLE_PROJECT_ID:  your google cloud ID
    - GOOGLE_PRIVATE_KEY: your google authentication for the google project 
    - GOOGLE_CLIENT_EMAIL: your user for authentication  
3. Install dependencies: `npm i`
4. Run the development server: npm run dev
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## **Dependencies**

- Node 20.x or above
- NPM 5.x or above
- PG 8.x
- Typesctipt 5.x
- Next 15.x
- Drizzle ORM 0.38

## **Usage**

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://github.com/user-attachments/assets/cd4c2c19-eec2-4b63-b1a8-cf576747de10)

## **License** 
TBA

## **Contact**

info@craft.io
