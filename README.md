# SDS Coin Project

This project includes a Hardhat setup for smart contract development and a React frontend application for user
interaction.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Running the Smart Contract](#running-the-smart-contract)
3. [Running the Frontend](#running-the-frontend)
4. [Testing the Application](#testing-the-application)
5. [Linting Your Code](#linting-your-code)
6. [Formatting Your Code](#formatting-your-code)

## Setup Instructions

To setup the project, follow these steps:

1. Install the latest version of [Node.js (v18)](https://nodejs.org/dist/latest-v18.x/).
2. Clone the repository:
    ```
    git clone "https://github.com/doriav20/SDS-Coin.git"
    ```
3. Navigate to the project directory:
    ```
    cd SDS-Coin
    ```

### Hardhat Setup

1. Navigate to the Hardhat directory:
    ```
    cd backend
    ```
2. Install the required dependencies:
    ```
    npm install
    ```

### Frontend Setup

1. Navigate to the frontend directory from the main project directory:
    ```
    cd frontend
    ```
2. Install the required dependencies:
    ```
    npm install
    ```

## Running the Smart Contract

1. From the `backend` directory, access your local filesystem from the Remix IDE:
    ```
    npx remixd
    ```
2. Deploy the contract by deploying the local Hardhat Ethereum network:
    ```
    npx hardhat node
    ```
3. Now, open the [Remix IDE](https://remix.ethereum.org/), compile the `SDSToken.sol` file located
   in `contracts/SDSToken.sol`, and select `Dev - Hardhat Provider` from the `ENVIRONMENT` options.

## Running the Frontend

From the `frontend` directory:

1. Start the React application:
    ```
    npm start
    ```

2. Once started, the application should automatically open in your default web browser. If not, you can manually
   navigate to:
    ```
    http://localhost:3000/
    ```
   in your web browser to view the application.

## Testing the Application

### Smart Contract Tests

From the `backend` directory:

```
npm test
```

### Frontend Tests

From the `frontend` directory:

```
npm test
```

## Linting Your Code

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

Got it! Here's the updated section with the note adjusted for clarity:

## Formatting Your Code

### Solidity Formatting (Hardhat)

From the `backend` directory:

```
npx prettier --write --plugin=prettier-plugin-solidity "contracts/**/*.sol"
```

**Note:** If you wish to check the format of Solidity files without applying changes, replace `--write` with `--check`
in the above command.

### TypeScript Formatting (Hardhat)

From the `backend` directory:

```
npx prettier --write "**/*.ts"
```

**Note:** If you wish to check the format of TypeScript files without applying changes, replace `--write` with `--check`
in the above command.

### JavaScript and JSX Formatting (Frontend)

From the `frontend` directory:

```
npm run format
```

