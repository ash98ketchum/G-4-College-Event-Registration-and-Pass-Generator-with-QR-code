import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  college?: string;
  phone?: string;
  password?: string;
  role: "admin" | "user";         // <-- ADDED
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    college: { type: String },
    phone: { type: String },
    password: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" }  // <-- ADDED
  },
  { timestamps: true }
);

/**
 * Hash password before save
 */
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password || "", salt);
});

/**
 * Compare hashed password
 */
UserSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password || "");
};

export default model<IUser>("User", UserSchema);
