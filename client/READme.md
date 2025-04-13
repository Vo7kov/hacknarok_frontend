# Hacknarok Frontend - Runes of Revelation

## Hackathon Theme: "Runes that open the invisible"

This project is a mobile application developed for the Hacknarok hackathon. It embodies the theme "Runes that open the invisible" by combining real-world event participation with an augmented reality (AR) experience triggered by scanning QR codes, revealing hidden "rune" information.

## Overview

The app allows users (participants) and admins (event organizers) to interact with events. Admins can create events and generate unique QR codes. Users can scan these QR codes to join events. Upon scanning, an AR experience is initiated where users collect virtual runes, ultimately revealing the event details previously hidden or "invisible".

## Features

*   **Role Selection:** Choose between `Admin` and `User` roles ([`client/app/(tabs)/index.tsx`](client/app/(tabs)/index.tsx)).
*   **Event Management (Admin):**
    *   Create new events with details like name, description, location, time, capacity, and password ([`client/app/(tabs)/events.tsx`](client/app/(tabs)/events.tsx)).
    *   View events created by the admin.
    *   Generate QR codes for specific events ([`client/app/(tabs)/generator.tsx`](client/app/(tabs)/generator.tsx)).
    *   Delete events.
    *   Get AI-powered "Viking Insights" for events ([`client/app/(tabs)/events.tsx`](client/app/(tabs)/events.tsx)).
*   **Event Joining (User):**
    *   Scan event QR codes using the device camera ([`client/app/(tabs)/scanner.tsx`](client/app/(tabs)/scanner.tsx), [`client/app/_layout.tsx`](client/app/_layout.tsx)).
*   **AR Rune Experience:**
    *   After scanning a QR code, an AR view is presented ([`client/app/_layout.tsx`](client/app/_layout.tsx)).
    *   Users interact with the AR scene to "collect" virtual runes ([`client/components/RunesGame.tsx`](client/components/RunesGame.tsx), [`client/components/RuneScene.tsx`](client/components/RuneScene.tsx)).
    *   Collecting enough runes reveals the details of the scanned event in a stylized popup ([`client/components/ARPopup.tsx`](client/components/ARPopup.tsx)).
*   **Themed UI:** Uses `react-native-paper` for components.

## How it Fits the Theme

The core idea is that event details are initially "invisible". The QR code acts as a key, and the AR rune collection is the ritual ("reading the runes") required to "open the invisible" and reveal the event information. The runes themselves are the thematic element linking the action to the hackathon's concept.

## Tech Stack

*   **Framework:** React Native / Expo
*   **Language:** TypeScript
*   **Navigation:** Expo Router
*   **UI:** React Native Paper, Themed Components ([`client/shared/ui/Themed.tsx`](client/shared/ui/Themed.tsx))
*   **AR/Graphics:** `expo-camera`, `expo-gl`, `three`
*   **QR Codes:** `react-native-qrcode-svg`
*   **State Management:** React Context API ([`client/shared/context/UserRoleContext.tsx`](client/shared/context/UserRoleContext.tsx), [`client/shared/providers/camera.provider.tsx`](client/shared/providers/camera.provider.tsx))
*   **Linting/Formatting:** ESLint, Prettier

## Setup and Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Vo7kov/hacknarok_frontend.git
    cd hacknarok-frontend/client
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Set up Environment Variables:**
    Create a `.env` file in the `client/` directory:
    ```env
    # Example: Replace with your actual backend API URL
    EXPO_PUBLIC_API_URL=http://192.168.1.100:8000
    ```
4.  **Run the app:**
    *   **Using Expo Go:**
        ```bash
        npx expo start
        ```
        or
        ```bash
        npx expo run:android
        ```
        Scan the QR code shown in the terminal with the Expo Go app on your device.
    *   **Using Development Build (for native modules like camera/AR):**
        *   Build the app: `eas build --profile development --platform <ios|android>`
        *   Install the build on your device/simulator.
        *   Start the development server: `expo start --dev-client`

## Project Structure
