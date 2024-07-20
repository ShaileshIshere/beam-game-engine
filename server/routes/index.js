const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");
const gamesRouter = require("./games");
const cors = require("cors");

const router = express.Router();

router.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET", "PUT"],
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