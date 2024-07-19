const express = require("express");
const authMiddleware = require("../middleware");
// const fs = require("fs").promises;
// const path = require("path");
const { Account, User, PurchasedGames } = require("../database");
const games = require("../API/allGames");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const acc = await Account.findOne({
            userId: req.userId
        });

        if(!acc) {
            return res.status(404).json({
                message: "this user doesn't exists"
            });
        }    
        
        return res.status(200).json({
            balance: acc.balance
        });

    } catch (error) {
        console.log("server error: ", error);
        return res.status(500).json({
            message: "server error"
        });
    }
});

router.post("/purchaseGame", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { gameId } = req.body;
        const userId = req.userId;

        // Fetch the user to get the username
        const user = await User.findById(userId);
        if (!user) {
            await session.abortTransaction();
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Find the game in the local data
        const game = games.find(game => game.id === gameId);
        if (!game) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Game not found"
            });
        }

        // Fetch the user's account
        let account = await Account.findOne({ userId: userId }).session(session);

        // Create a new account if one doesn't exist
        if (!account) {
            account = new Account({
                userId: userId,
                username: user.username, // Set username from User
                balance: 25000, // Set initial balance as needed
                purchasedGames: []
            });
        }

        // Check if the user has enough balance
        if (account.balance < game.priceINR) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        // Deduct the game cost from the user's balance
        account.balance -= game.priceINR;

        // Save the updated account
        await account.save({ session });

        // Update the PurchasedGames document
        let userPurchasedGames = await PurchasedGames.findOne({ userId: userId }).session(session);

        if (!userPurchasedGames) {
            userPurchasedGames = new PurchasedGames({
                userId: userId,
                username: user.username,
                games: []
            });
        }

        // Check if the game is already purchased
        const gameAlreadyPurchased = userPurchasedGames.games.some(g => g.gameId === gameId);
        
        if (!gameAlreadyPurchased) {
            userPurchasedGames.games.push({
                gameId: game.id,
                gameName: game.name,
                platform: game.platform,
                price: game.priceINR
            });
            await userPurchasedGames.save({ session });
        }

        // Commit the transaction
        await session.commitTransaction();

        res.json({
            message: "Purchase successful",
            purchasedGames: userPurchasedGames
        });

    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    } finally {
        session.endSession();
    }
});

module.exports = router;