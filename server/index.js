const express = require("express");
const rootRouter = require("./routes/index");
const PORT = 3000;

const app = express();

app.use(express.json());
app.use("/api", rootRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})