const app = require("./app");
const connectDB = require("./src/config/dbConfig");
require("dotenv").config();

connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
