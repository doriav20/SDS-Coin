export const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export const ABI = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [],
        name: 'FunctionCanOnlyBeCalledOnceByTheCaller',
        type: 'error',
    },
    {
        inputs: [],
        name: 'OnlyOwnerCanCallThisFunction',
        type: 'error',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'Mint',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'randomNumber',
                type: 'uint256',
            },
        ],
        name: 'RandomNumberGenerated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'from',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
            },
        ],
        name: 'Transfer',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'addOwner',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'canMint100',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'decimals',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [],
        name: 'generateRandomNumber',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getRandomNumber',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'functionSignature',
                type: 'string',
            },
        ],
        name: 'hasFunctionBeenCalledOnce',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: 'cell',
                type: 'uint8',
            },
        ],
        name: 'makeMove',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'mint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'mint100',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'mintSelf',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'myBalance',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'name',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owners',
        outputs: [
            {
                internalType: 'address[]',
                name: '',
                type: 'address[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'playTicTacToe',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'symbol',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [],
        name: 'ticTacToeContract',
        outputs: [
            {
                internalType: 'contract TicTacToeGame',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'transfer',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'from',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'transferFrom',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];

export const TIC_TAC_TOE_ABI = [
    {
        inputs: [
            {
                internalType: 'address',
                name: '_tokenAddress',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'gameId',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'player1',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'player2',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'betAmount',
                type: 'uint256',
            },
        ],
        name: 'GameCreated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'gameId',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'winner',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'loser',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'betAmount',
                type: 'uint256',
            },
        ],
        name: 'GameFinished',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'gameId',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'player',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint8',
                name: 'cell',
                type: 'uint8',
            },
        ],
        name: 'PlayerMoved',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'playerAddress',
                type: 'address',
            },
        ],
        name: 'enterGame',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'gameId',
                type: 'uint256',
            },
        ],
        name: 'getGame',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint24',
                        name: 'board',
                        type: 'uint24',
                    },
                    {
                        internalType: 'address',
                        name: 'player1',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'player2',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'betAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'bool',
                        name: 'isActive',
                        type: 'bool',
                    },
                ],
                internalType: 'struct TicTacToeGame.Game',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'player',
                type: 'address',
            },
        ],
        name: 'getGameId',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'playerAddress',
                type: 'address',
            },
            {
                internalType: 'uint8',
                name: 'cell',
                type: 'uint8',
            },
        ],
        name: 'makeMove',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
