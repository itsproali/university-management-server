import { Model, Schema, model } from "mongoose";
import { IUser } from "./user.interface";

type IUserMethods = {
  getRole(): string;
};

type UserModel = Model<IUser, object, IUserMethods>;

// User Schema
const userSchema: Schema = new Schema<IUser, UserModel, IUserMethods>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Methods
userSchema.method("getRole", function getRole() {
  return this.role;
});

// User Model
const User = model<IUser, UserModel>("User", userSchema);

export default User;
