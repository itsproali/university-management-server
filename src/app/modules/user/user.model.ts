import { Schema, model } from "mongoose";
import { IUser, IUserMethods, UserModel } from "./user.interface";
import config from "../../../config";
import bcrypt from "bcrypt";

// User Schema
const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: 0,
    },

    needPasswordChange: {
      type: Boolean,
      default: true,
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
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, config.BCRYPT_SALT_ROUNDS);

  next();
});

userSchema.methods.comparePassword = async function comparePassword(
  password: string
) {
  return await bcrypt.compare(password, this.password);
};

// User Model
const User = model<IUser, UserModel>("User", userSchema);

export default User;
