import cron from 'node-cron';
import User from '../models/usersModel.js';

const dbCleaner = cron.schedule('*/10 * * * *', async () => {
    try {
        const now = Date.now();
        const result = await User.deleteMany({ 
            isVerified: false, 
            otpExpires: { $lt: now } 
        });
        console.log(`Cleaned up ${result.deletedCount} unverified users.`);
    } catch (error) {
        console.error("Error in cleanup job:", error);
    }
});

export default dbCleaner;