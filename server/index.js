const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
const PORT = 3000;

const app = express();

app.use(cors(
    {
        origin: ["https://beam-game-engine-client.vercel.app"],
        // origin: ["http://localhost:5173"],
        methods: ["POST", "GET", "PUT", "PATCH"],
        credentials: true
    }
));

app.use(express.json());
app.use("/api", rootRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})