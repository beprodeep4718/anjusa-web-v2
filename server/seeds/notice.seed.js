import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import Notice from '../models/notice.model.js';

const sampleNotices = [
  {
    title: "Welcome to the New Academic Year",
    content: "We are excited to welcome all students and faculty to the new academic year. Please review the updated academic calendar and course schedules available on the student portal.",
    type: "important",
    priority: "high",
    status: "active",
    views: 156
  },
  {
    title: "Library Hours Extended",
    content: "Starting this week, the library will be open until 10 PM on weekdays to accommodate student study schedules. Weekend hours remain 9 AM to 6 PM.",
    type: "general",
    priority: "medium",
    status: "active",
    views: 89
  },
  {
    title: "Annual Science Fair Registration",
    content: "Registration for the annual science fair is now open. Students interested in participating should submit their project proposals by the end of this month. Contact the science department for more details.",
    type: "event",
    priority: "medium",
    status: "active",
    views: 234
  },
  {
    title: "Campus Safety Guidelines",
    content: "Please review the updated campus safety guidelines. All students and staff are required to carry their ID cards at all times. Emergency contact numbers have been updated.",
    type: "important",
    priority: "high",
    status: "active",
    views: 167
  },
  {
    title: "Cultural Festival Planning Meeting",
    content: "Join us for the cultural festival planning meeting next Friday at 3 PM in the main auditorium. We're looking for volunteers to help organize this year's events.",
    type: "event",
    priority: "low",
    status: "draft",
    views: 45
  },
  {
    title: "Winter Break Schedule",
    content: "Classes will be suspended for winter break from December 20th to January 5th. The campus will remain open with limited services during this period.",
    type: "general",
    priority: "medium",
    status: "active",
    views: 312
  }
];

const seedNotices = async () => {
  try {
    // Clear existing notices
    await Notice.deleteMany({});
    console.log("Existing notices cleared");

    // Insert sample notices
    await Notice.insertMany(sampleNotices);
    console.log(`${sampleNotices.length} sample notices created successfully`);
  } catch (error) {
    console.error("Error seeding notices:", error);
  }
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    
    await seedNotices();
    
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error during database seeding:", error);
    process.exit(1);
  }
};

seedDatabase()
  .then(() => {
    console.log("Notice seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error during notice seeding:", error);
    process.exit(1);
  });
