import mongoose from 'mongoose';

import colors from 'colors';

export const connectDB = async () => {
    try {
        const connectionMy = await mongoose.connect(process.env.MONGO_URL   );
        console.log(`MongoDB Connected: ${connectionMy.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};
