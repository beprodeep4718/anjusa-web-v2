import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import User from '../models/user.model.js';
const seedAdminUser = async () => {
  try {
    const adminUser = {
      username: "admin",
      email: "admin@exe.com",
      password: "admin123",
      phone: "1234567890",
      role: "admin",
    };
    const existingUser = await User.findOne({ email: adminUser.email });
    if (!existingUser) {
      await User.create(adminUser);
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    
    await seedAdminUser();
    
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error during database seeding:", error);
    process.exit(1);
  }
};

seedDatabase()
  .then(() => {
    console.log("Database seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error during database seeding:", error);
    process.exit(1);
  });

