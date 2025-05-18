require('dotenv').config(); // ✅ Load environment variables

const express = require('express');
const { initDb } = require('./config/db');
const routes = require('./routes/contacts');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Debugging middleware (add this)
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Contacts API - Week 1 - GET endpoints only');
});

// Mount contacts router
app.use('/api/contacts', routes);

// Initialize database and start server
initDb()
  .then(() => {
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });
