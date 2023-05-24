const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up body parsing, static, and route middleware, 
// for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory


app.use('/api', apiRoutes); // Route middleware for API routes
app.use('/', htmlRoutes); // Route middleware for HTML routes


// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
