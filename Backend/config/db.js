import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      `mongodb+srv://whitewalter71958:5qDqUauHAvjplLyz@cluster0.dnczr.mongodb.net/ecommerce-app`
    )
    .then(() => console.log("Database Connected"));
};
