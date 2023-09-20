import { expect } from "chai";
import { ethers } from "hardhat";
import { SDSToken, TicTacToeGame } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("SDSToken", function () {
    let instance: SDSToken;
    let ticTacToeInstance: TicTacToeGame;
    let decim = 0;
    let player1: HardhatEthersSigner;
    let player1Address: string;
    let player2: HardhatEthersSigner;
    let player2Address: string;

    beforeEach(async function () {
        const ContractFactory = await ethers.getContractFactory("SDSToken");
        instance = await ContractFactory.deploy();
        await instance.waitForDeployment();

        const gameAddress = await instance.ticTacToeContract();
        ticTacToeInstance = await ethers.getContractAt("TicTacToeGame", gameAddress);
        decim = await instance.decimals();
        let otherSigners: HardhatEthersSigner[] = [];
        [player1, player2, ...otherSigners] = await ethers.getSigners();
        [player1Address, player2Address] = [await player1.getAddress(), await player2.getAddress()];

        const mintAmount = 100n;
        await instance.mint(await player1.getAddress(), mintAmount);
        await instance.mint(await player2.getAddress(), mintAmount);

        for (const signer of otherSigners) {
            await instance.mint(await signer.getAddress(), mintAmount);
        }
    });

    it("Player should be able to enter a tic-tac-toe game", async function () {
        await instance.connect(player1).playTicTacToe();
        await instance.connect(player2).playTicTacToe();

        const gameIdP1 = await ticTacToeInstance.getGameId(player1Address);
        const gameIdP2 = await ticTacToeInstance.getGameId(player2Address);

        expect(gameIdP1).to.equal(gameIdP2).to.equal(1);

        const game = await ticTacToeInstance.getGame(gameIdP1);
        expect(game.player1).to.equal(player1Address);
        expect(game.player2).to.equal(player2Address);
        expect(game.isActive).to.equal(true);
        expect(game.betAmount).to.equal(40n * 10n ** decim);
        expect(game.board).to.equal(0n);
    });

    it("Player should be able to make a move in a game", async function () {
        await instance.connect(player1).playTicTacToe();
        await instance.connect(player2).playTicTacToe();

        const gameId = await ticTacToeInstance.getGameId(player1Address);

        await instance.connect(player1).makeMove(1);

        const game = await ticTacToeInstance.getGame(gameId);
        expect(game.board).to.equal(0b000_00_1_00_00_00_00_00_00_00_01_00n);
        expect(game.isActive).to.equal(true);
    });

    it("Player should win if they make a winning move", async function () {
        await instance.connect(player1).playTicTacToe();
        await instance.connect(player2).playTicTacToe();

        let player1Balance = await instance.balanceOf(player1Address);
        let player2Balance = await instance.balanceOf(player2Address);
        expect(player1Balance).to.equal(80n * 10n ** decim);
        expect(player2Balance).to.equal(80n * 10n ** decim);

        const gameId = await ticTacToeInstance.getGameId(player1Address);

        // Simulating a winning sequence for player1 (assuming this results in a win)
        await instance.connect(player1).makeMove(0);
        await instance.connect(player2).makeMove(3);
        await instance.connect(player1).makeMove(1);
        await instance.connect(player2).makeMove(4);
        await instance.connect(player1).makeMove(2);

        const game = await ticTacToeInstance.getGame(gameId);
        expect(game.board).to.equal(0b000_01_1_00_00_00_00_10_10_01_01_01n);
        expect(game.isActive).to.equal(false);

        // Check balances
        player1Balance = await instance.balanceOf(player1Address);
        player2Balance = await instance.balanceOf(player2Address);
        expect(player1Balance).to.equal(120n * 10n ** decim);
        expect(player2Balance).to.equal(80n * 10n ** decim);
    });

    it("Game should be a draw if no player wins", async function () {
        await instance.connect(player1).playTicTacToe();
        await instance.connect(player2).playTicTacToe();

        let player1Balance = await instance.balanceOf(player1Address);
        let player2Balance = await instance.balanceOf(player2Address);
        expect(player1Balance).to.equal(80n * 10n ** decim);
        expect(player2Balance).to.equal(80n * 10n ** decim);

        const gameId = await ticTacToeInstance.getGameId(player1Address);

        // Simulating a sequence that results in a draw (assuming this results in a draw)
        await instance.connect(player1).makeMove(0);
        await instance.connect(player2).makeMove(2);
        await instance.connect(player1).makeMove(1);
        await instance.connect(player2).makeMove(3);
        await instance.connect(player1).makeMove(5);
        await instance.connect(player2).makeMove(4);
        await instance.connect(player1).makeMove(6);
        await instance.connect(player2).makeMove(7);
        await instance.connect(player1).makeMove(8);

        const game = await ticTacToeInstance.getGame(gameId);
        expect(game.board).to.equal(0b000_11_1_01_10_01_01_10_10_10_01_01);
        expect(game.isActive).to.equal(false);

        // Check balances
        player1Balance = await instance.balanceOf(player1Address);
        player2Balance = await instance.balanceOf(player2Address);
        expect(player1Balance).to.equal(100n * 10n ** decim);
        expect(player2Balance).to.equal(100n * 10n ** decim);
    });

    it("Player should not be able to make a move in a game that is not active", async function () {
        await instance.connect(player1).playTicTacToe();
        await instance.connect(player2).playTicTacToe();

        await instance.connect(player1).makeMove(0);
        await instance.connect(player2).makeMove(4);
        await instance.connect(player1).makeMove(1);
        await instance.connect(player2).makeMove(5);
        await instance.connect(player1).makeMove(2);

        await expect(instance.connect(player2).makeMove(8)).to.be.revertedWith("Game is not active");
    });

    it("Player should not be able to make a move in a game that is not theirs", async function () {
        await instance.connect(player1).playTicTacToe();
        await instance.connect(player2).playTicTacToe();

        const player3 = (await ethers.getSigners())[2];
        await instance.connect(player3).playTicTacToe();

        await expect(instance.connect(player3).makeMove(1)).to.be.revertedWith("Game is not active");
    });

    it("Player should not be able to start a new game if they already have an active game", async function () {
        await instance.connect(player1).playTicTacToe();
        await instance.connect(player2).playTicTacToe();

        await expect(instance.connect(player1).playTicTacToe()).to.be.revertedWith("You are already in a game");
    });

    it("Player should not be able to play with themselves", async function () {
        await instance.connect(player1).playTicTacToe();
        await expect(instance.connect(player1).playTicTacToe()).to.be.revertedWith("You are already in a game");
    });

    it("Player should be able to start a new game after their previous game has ended", async function () {
        //Play 3 times
        await instance.connect(player1).playTicTacToe();
        await instance.connect(player2).playTicTacToe();

        const gameId1 = await ticTacToeInstance.getGameId(player1Address);
        expect(gameId1).to.equal(1);

        await instance.connect(player1).makeMove(0);
        await instance.connect(player2).makeMove(4);
        await instance.connect(player1).makeMove(1);
        await instance.connect(player2).makeMove(5);
        await instance.connect(player1).makeMove(2);

        await instance.connect(player1).playTicTacToe();
        await instance.connect(player2).playTicTacToe();

        const gameId2 = await ticTacToeInstance.getGameId(player1Address);
        expect(gameId2).to.equal(2);

        await instance.connect(player1).makeMove(0);
        await instance.connect(player2).makeMove(4);
        await instance.connect(player1).makeMove(1);
        await instance.connect(player2).makeMove(5);
        await instance.connect(player1).makeMove(2);

        await instance.connect(player1).playTicTacToe();
        await instance.connect(player2).playTicTacToe();

        const gameId3 = await ticTacToeInstance.getGameId(player1Address);
        expect(gameId3).to.equal(3);

        const game1 = await ticTacToeInstance.getGame(gameId1);
        const game2 = await ticTacToeInstance.getGame(gameId2);
        const game3 = await ticTacToeInstance.getGame(gameId3);

        expect(game1.isActive).to.equal(false);
        expect(game2.isActive).to.equal(false);
        expect(game3.isActive).to.equal(true);
    });

    it("Player should not be able to make a move to an occupied square", async function () {
        await instance.connect(player1).playTicTacToe();
        await instance.connect(player2).playTicTacToe();

        await instance.connect(player1).makeMove(0);
        await instance.connect(player2).makeMove(4);

        await expect(instance.connect(player1).makeMove(4)).to.be.revertedWith("Cell is not empty");
    });

    it("Player should not be able to make a move if it is not their turn", async function () {
        await instance.connect(player1).playTicTacToe();
        await instance.connect(player2).playTicTacToe();

        await expect(instance.connect(player2).makeMove(0)).to.be.revertedWith("Not your turn");
    });

    it("Player should not be able to make a move to an invalid square", async function () {
        await instance.connect(player1).playTicTacToe();
        await instance.connect(player2).playTicTacToe();

        await expect(instance.connect(player1).makeMove(9)).to.be.revertedWith("Cell is out of range");
    });

    it("Player should not be able to make a move if they are not in a game", async function () {
        await expect(instance.connect(player1).makeMove(0)).to.be.revertedWith("Game not found");
    });
});
