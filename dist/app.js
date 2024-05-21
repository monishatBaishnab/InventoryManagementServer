'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const product_route_1 = __importDefault(
  require('./app/modules/product/product.route'),
);
const order_route_1 = __importDefault(
  require('./app/modules/order/order.route'),
);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Route for checking the health of the service
app.get('/api/health', (req, res) => {
  res.status(200).send('Service is up and running!');
});
// Mounting product routes
app.use('/api', product_route_1.default);
//Mounting order routes
app.use('/api', order_route_1.default);
// Middleware to handle requests to unknown routes
app.use('*', (req, res) => {
  res.send({
    success: false,
    message: 'Route Not Found.',
  });
});
// Error handling middleware to catch and handle errors
app.use((error, req, res) => {
  if (error) {
    res.status(400).send({
      success: false,
      message: 'Somthing want wrong.',
    });
  }
});
exports.default = app;
