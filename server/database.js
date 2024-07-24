const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try{
        await mongoose.connect("mongodb+srv://shailesh:d2Ps0UQEnEcmUUkM@cluster0.b5xkmr9.mongodb.net/beam");
        console.log("successfully connected to database");
    } catch (error) {
        console.log("error connecting to mongoDB : ", error);
    }
}
connectToDatabase();

const userSchema = mongoose.Schema({
    Email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 6,
        unique: true,
        trim: true
    }, 
    username: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
        trim: true
    },
    purchasedGames: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PurchasedGames"
    }]
});

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requried: true   
    },
    username: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    purchasedGames: { 
        type: [Number], 
        default: [] 
    }
});

const purchasedGamesSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    username: {
        type: String,
        required: true
    },
    games: [{
        gameId: {
            type: Number,
            required: true
        },
        gameName: {
            type: String,
            required: true
        },
        platform: {
            type: [String],
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }]
}, {
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.games.forEach(game => {
                delete game._id;
                delete game.id;
            });
            delete ret._id;
            delete ret.__v;
            delete ret.id;
            return ret;
        }
    }
});

// const wishlistedGamesSchema = mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     username: {
//         type: String,
//         required: true
//     },
//     games: [{
//         gameId: {
//             type: Number, 
//             required: true
//         },
//         gameName: {
//             type: String,
//             required: true
//         },
//         platform: {
//             type: [String],
//             required: true
//         },
//         price: {
//             type: Number,
//             required: true
//         }
//     }]
// }, {
//     toJSON: {
//         virtuals: true,
//         transform: (doc, ret) => {
//             ret.games.forEach(game => {
//                 delete game._id;
//                 delete game.id;
//             });
//             delete ret._id;
//             delete ret.__v;
//             delete ret.id;
//             return ret;
//         }
//     }
// })

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
const PurchasedGames = mongoose.model("PurchasedGames", purchasedGamesSchema);
// const WishlistGames = mongoose.model("WishlistGames", wishlistedGamesSchema);

module.exports = {
    User,
    Account,
    PurchasedGames,
    // WishlistGames
}