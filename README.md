# SDS Coin Project

## Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [Running the Application](#running-the-application)
3. [Testing the Application](#testing-the-application)
4. [Linting Your Code](#linting-your-code)
5. [Formatting Your Code](#formatting-your-code)

## Setup Instructions

To setup the project, follow these steps:

1. Install the latest version of [Node.js (v18)](https://nodejs.org/dist/latest-v18.x/).
2. Clone the repository using the command:
    ```
    git clone "https://github.com/doriav20/SDS-Coin.git"
    ```
3. Navigate to the project directory. Replace `{project_dir}` with the actual directory path.
    ```
    cd {project_dir}
    ```
4. Install the required dependencies:
    ```
    npm install
    ```

## Running the Application

To run the project:

1. Access your local filesystem from the Remix IDE:
    ```
    npx remixd
    ```
2. Deploy the contract by deploying the local Hardhat Ethereum network:
    ```
    npx hardhat node
    ```
3. Now, open the [Remix IDE](https://remix.ethereum.org/), compile the `SDSToken.sol` file located in `contracts/SDSToken.sol`, and select `Dev - Hardhat Provider` from the `ENVIRONMENT` options.

## Testing the Application

To run the tests located in the `test` folder, use the following command:
```
npm test
```

## Linting Your Code

The project uses solhint for Solidity files and ESLint for TypeScript files.

To lint Solidity files:
```
npx solhint "contracts/**/*.sol"
```

To lint TypeScript files:
```
npx eslint "**/*.ts"
```

## Formatting Your Code

The project uses Prettier for code formatting. The following commands will format Solidity and TypeScript files.

To format Solidity files:
```
npx prettier --write --plugin=prettier-plugin-solidity 'contracts/**/*.sol'
```

To format TypeScript files:
```
npx prettier --write "**/*.ts"
```

**Note:** If you wish to check the format without applying changes, replace `--write` with `--check` in the above commands.
