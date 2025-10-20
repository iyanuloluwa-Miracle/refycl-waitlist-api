"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const routes_1 = __importDefault(require("./routes/routes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// --- Middlewares ---
// Enable CORS for all routes (allows your frontend to connect)
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// --- API Routes ---
app.use('/api', routes_1.default);
// Simple health-check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});
// Initialize database connection and start server
const startServer = async () => {
    try {
        // Initialize the data source
        await db_1.AppDataSource.initialize();
        console.log('✅ Database connected successfully');
        // Start the server
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('❌ Error during database initialization:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map