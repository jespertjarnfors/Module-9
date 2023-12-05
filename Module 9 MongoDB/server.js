require("dotenv").config();
const express = require("express");
const app = express();
let dbConnect = require("./dbConnect");

// Routes

app.use(express.json());

let userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)

let postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

let likeRoutes = require('./routes/likeRoutes');
app.use('/api/likes', likeRoutes);

let commentRoutes = require('./routes/commentRoutes');
app.use('/api/comments', commentRoutes);


// parse requests of content-type -application/json
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my MongoDB application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on
port ${PORT}.`);
});
