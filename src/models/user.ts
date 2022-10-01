import mongoose, { Schema, Document } from 'mongoose';
export interface IUserData extends Document {
  email: string,
  password: string,
  userCompanies:any[],
}
const UserSchema: Schema = new Schema({
  email: { type: String, required: true,lowercase: true, unique: true },
  password: { type: String, required: true, unique: false },
});

export default mongoose.model<IUserData>('user', UserSchema);