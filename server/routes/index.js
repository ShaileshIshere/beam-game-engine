const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");
const gamesRouter = require("./games");
const cors = require("cors");

const router = express.Router();

router.use(cors(
    {
        origin: ["https://beam-game-engine-client.vercel.app"],
        methods: ["POST", "GET", "PUT", "PATCH"],
        credentials: true
    }
));

router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/games", gamesRouter);

router.get("/", (req, res) => {
    console.log("router-working-properly");
    res.send("router-working-properly");
})


module.exports = router;