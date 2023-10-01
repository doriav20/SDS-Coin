# SDS Coin Project

Welcome to the SDS Coin Project! This project offers a comprehensive Hardhat environment for smart contract development, complemented by a user-friendly React frontend application.

## 📖 Table of Contents

1. [Getting Started](#getting-started)
2. [Deploying the Smart Contract](#deploying-the-smart-contract)
3. [Launching the Frontend](#launching-the-frontend)
4. [Application Testing Guide](#application-testing-guide)
5. [Code Quality: Linting](#code-quality-linting)
6. [Code Quality: Formatting](#code-quality-formatting)

## 🚀 Getting Started

To kickstart your journey with the SDS Coin Project:

1. Ensure you have [Node.js (v18)](https://nodejs.org/dist/latest-v18.x/) installed.
2. Clone the repository:
    ```
    git clone "https://github.com/doriav20/SDS-Coin.git"
    ```
3. Dive into the project directory:
    ```
    cd SDS-Coin
    ```

### Hardhat Environment Setup

1. Enter the Hardhat directory:
    ```
    cd backend
    ```
2. Install the necessary dependencies:
    ```
    npm install
    ```

### Frontend Environment Setup

1. From the main project directory, switch to the frontend directory:
    ```
    cd frontend
    ```
2. Install the essential dependencies:
    ```
    npm install
    ```

## 📜 Deploying the Smart Contract

1. Within the `backend` directory, connect to your local filesystem via the Remix IDE:
    ```
    npx remixd
    ```
2. Deploy the contract using the local Hardhat Ethereum network:
    ```
    npx hardhat node
    ```
3. Head over to the [Remix IDE](https://remix.ethereum.org/), compile the `SDSToken.sol` file located in `contracts/SDSToken.sol`, and opt for `Dev - Hardhat Provider` from the available `ENVIRONMENT` choices.

## 🌐 Launching the Frontend

From the `frontend` directory:

1. Fire up the React application:
    ```
    npm start
    ```

2. The application should pop up in your default web browser. If it doesn't, simply head to:
    ```
    http://localhost:3000/
    ```

## 🔍 Application Testing Guide

### Smart Contract Tests

Execute the following from the `backend` directory:
```
npm test
```

### Frontend Tests

Execute the following from the `frontend` directory:
```
npm test
```

## 🧹 Code Quality: Linting

### Solidity Linting (Hardhat)

From the `backend` directory:
```
npx solhint "contracts/**/*.sol"
```

### TypeScript Linting (Hardhat)

From the `backend` directory:
```
npx eslint "**/*.ts"
```

### JavaScript and JSX Linting (Frontend)

From the `frontend` directory:
```
npm run lint
```

## 🎨 Code Quality: Formatting

### Solidity Formatting (Hardhat)

From the `backend` directory:
```
npx prettier --write --plugin=prettier-plugin-solidity "contracts/**/*.sol"
```
**Note:** To review the format of Solidity files without making changes, swap `--write` with `--check`.

### TypeScript Formatting (Hardhat)

From the `backend` directory:
```
npx prettier --write "**/*.ts"
```
**Note:** To inspect the format of TypeScript files without modifications, switch `--write` with `--check`.

### JavaScript and JSX Formatting (Frontend)

From the `frontend` directory:
```
npm run format
```
