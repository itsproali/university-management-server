import { Schema, model } from "mongoose";
import { IUser, IUserMethods, UserModel } from "./user.interface";

// User Schema
const userSchema: Schema = new Schema<IUser, UserModel, IUserMethods>(
  {
    id: {
      type: String,
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

    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },

    faculty: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
    },

    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Methods
userSchema.method("getRole", function getRole() {
  return this.role;
});

// User Model
const User = model<IUser, UserModel>("User", userSchema);

export default User;
