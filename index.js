const cors = require("cors");
const express = require("express");
require("dotenv").config();
const userRouter = require("./routes/userRouter");
const geminiRouter = require("./routes/geminiRouter");
const insuranceRoutes = require('./routes/insuranceRoutes');

// Enable express
const app = express();
//Middleware run middleware function before the request gets into route handler
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});


// Use the router for a specific path
app.use("/api", userRouter);
app.use("/api/gemini", geminiRouter);
app.use('/api/insurance', insuranceRoutes);

// default route handler
app.get("/", (req, res) => {
  res.send("hello world");
});

// Set up port
const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
