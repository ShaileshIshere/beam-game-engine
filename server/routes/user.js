const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { User, Account } = require("../database");
const { JWT_SECRET } = require("../secret");
const authMiddleware = require("../middleware");
// const bcrypt = require("bcrypt");
const router = express.Router();

const userSignupBody = zod.object({
    Email: zod.string().email(),
    username: zod.string().min(3, "username must be atleast 3 characters long"),
    password: zod.string()
});
router.post("/signup", async (req, res) => {
    const { success } = userSignupBody.safeParse(req.body);
    
    if(!success) {
        return res.status(411).json({
            message: "there's a fault in credentials"
        });
    }

    try {
        const { Email, username, password } = req.body;
        const existingUserWithEmail = await User.findOne({
            Email
        })
        if(existingUserWithEmail) {
            return res.status(411).json({
                message: "this email is already registered"
            });
        }
        const existingUserWithUsername = await User.findOne({
            username
        })
        if(existingUserWithUsername) {
            return res.status(411).json({
                message: "this username is already taken"
            });
        }

        // const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);
        const user = await User.create({
            Email,
            username,
            password
        });
        const userId = user._id;
        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        await Account.create({
            userId,
            username,
            balance: 25000
        })
    
        res.status(201).json({
            message: "user created successfully",
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

const userSigninBody = zod.object({
    username: zod.string(),
    password: zod.string()
});
router.post("/signin", async (req, res) => {
    const { success } = userSigninBody.safeParse(req.body);
    if(!success) {
        res.status(411).json({
            message: "there's a fault in credentials"
        });
    }

    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            username
        });
        if (!user) {
            return res.status(401).json({
                message: "Username is incorrect",
            });
        }
        const isPasswordCorrect = await User.findOne({
            password
        });
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Password is incorrect",
            });
        }

        const token = jwt.sign({
            userId: user._id,
        }, JWT_SECRET);

        res.status(201).json({
            message: "user signin was successfull",
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

const userUpdateBody = zod.object({
    username: zod.string().optional(),
    password: zod.string().optional()
});
router.patch("/update", authMiddleware, async (req, res) => {
    const { success } = userUpdateBody.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            message: "there's a fault in credentials"
        });
    }

    try {
        const { username, password } = req.body;

        const updateFields = {};
        if (username) updateFields.username = username;
        if (password) updateFields.password = password;

        const user = await User.updateOne(
            { _id: req.userId },
            { $set: updateFields }
        );

        if (user.nModified === 0) {
            return res.status(404).json({
                message: "User not found or no changes made"
            });
        }
        return res.status(201).json({
            message: "user updated successfully",
            username: user.username
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
})

router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if(!user) {
            return res.status(404).json({
                message: "user not found"   
            });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("server error: ", error);
        res.status(500).json({
            message: "server error"
        });
    }
})

module.exports = router;