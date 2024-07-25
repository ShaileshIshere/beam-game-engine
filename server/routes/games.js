const express = require("express");
const games = require("../API/allGames");
const authMiddleware = require("../middleware");
const { User, Account, PurchasedGames, WishlistGames } = require("../database");
const router = express.Router();

router.get("/all", authMiddleware, async (req, res) => {
    try {
        const filteredGames = games.map(game => ({
            gameId: game.id,
            gameName: game.name,
            platform: game.platform,
            price: game.priceINR
        }));
        res.json(filteredGames);
    } catch (error) {
        console.error('Error fetching games data', error);
        res.status(500).json({ 
            message: 'Server error' 
        });
    }
})

router.get("/purchased", authMiddleware, async (req, res) => {
    const userId = req.userId;

    try {
        // Fetch the purchased games for the user
        const userPurchasedGames = await PurchasedGames.findOne({ userId: userId }).populate('games.gameId', 'name priceINR platform').exec();
        
        if (!userPurchasedGames || userPurchasedGames.games.length === 0) {
            return res.status(404).json({
                // purchasedGames: null,
                message: "No purchased games found"
            });
        }

        // Remove sensitive data and format response
        const cleanedPurchasedGames = userPurchasedGames.games.map(game => {
            const { _id, ...cleanedGame } = game.toObject();
            return cleanedGame;
        });
        
        res.status(200).json({
            message: "Purchased games retrieved successfully",
            purchasedGames: cleanedPurchasedGames
        });
        
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

// router.post("/wishlist", authMiddleware, async (req, res) => {
//     const gameIds = req.body.gameIds;
  
//     if (!Array.isArray(gameIds) || gameIds.length === 0) {
//         return res.status(404).json({
//             message: 'No games found'
//         });
//     }
  
//     try {
//         const userId = req.userId;

//         const user = await User.findById(userId);
//         if(!user) {
//             res.status(404).json({
//                 message: "User not found"
//             });
//         }

//         let userCartedGames = await WishlistGames.findOne({ userId: userId});
//         if(!userCartedGames) {
//             userCartedGames = new WishlistGames({
//                 userId: userId,
//                 username: user.username,
//                 games: []
//             })
//         }

//         const existingGameIds = userCartedGames.games.map(game => game.gameId);
//         const newCartedGames = [];
    
//         for (const gameId of gameIds) {
//             if(existingGameIds.includes(gameId))
//                 continue;

//             const game = games.find(game => game.id === gameId);
    
//             if (!game) {
//                 return res.status(404).json({
//                     message: `Game with ID ${gameId} not found`
//                 });
//             }
    
//             newCartedGames.push({
//                 gameId: gameId,
//                 gameName: game.name,
//                 platform: game.platform,
//                 price: game.priceINR
//             });
//         }

//         if(newCartedGames.length > 0) {
//             userCartedGames.games.push(...newCartedGames);
//             await userCartedGames.save();
//         }

//         const cleanedCartedGames = userCartedGames.games.map(game => {
//             const { _id, id, ...cleanedGame } = game.toObject();
//             return cleanedGame;
//         });
    
//         res.status(200).json({
//             message: "Game added to cart successfully",
//             cartedGames: cleanedCartedGames
//         });
  
//     } catch (error) {
//         console.log("server error: ", error);
//         return res.status(500).json({
//             message: "server error"
//         });
//     }
// });

// router.get("/wishlist", authMiddleware, async (req, res) => {
//     const userId = req.userId;

//     try {
//         const userCartedGames = await WishlistGames.findOne({ userId: userId }).populate('games.gameId', 'name priceINR platform').exec();

//         if (!userCartedGames || userCartedGames.games.length === 0) {
//             return res.status(404).json({
//                 message: "No wishlist games found"
//             });
//         }

//         const cleanedCartedGames = userCartedGames.games.map(game => {
//             const { _id, ...cleanedGame } = game.toObject();
//             return cleanedGame;
//         });

//         res.status(200).json({
//             message: "Wishlist games retrieved successfully",
//             cartedGames: cleanedCartedGames
//         });

//     } catch (error) {
//         console.error("Server error:", error);
//         res.status(500).json({
//             message: "Internal server error",
//             error: error.message
//         });
//     }
// });
  

module.exports = router;