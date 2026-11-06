const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const resetAdmin = async () => {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  try {
    await mongoose.connect(process.env.MONGO_URI);
    let admin = await Admin.findOne({ username });
    if (!admin) {
      admin = new Admin({ username, password });
      await admin.save();
      console.log(`Admin "${username}" created.`);
    } else {
      admin.password = password;
      await admin.save();
      console.log(`Admin "${username}" password reset.`);
    }
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message || error);
    process.exit(1);
  }
};

resetAdmin();