import mongoose, { Schema, Document } from 'mongoose';
export interface ICustomer extends Document {
   uid: string,
   name: string,
   account_balance: number,
   nic: string,
   dob: Date,
   address : string,
   email : string,
   contact_number:string
}
const UserSchema: Schema = new Schema({
   email: { type: String, required: true, lowercase: true, unique: true },
   uid: { type: String, required: true, unique: false },
   name: { type: String, required: true, unique: false },
   account_balance: { type: String, required: true, unique: false },
   nic: { type: String, required: true, unique: false },
   dob: { type: Date, required: true, unique: false },
   address: { type: String, required: true, unique: false },
   contact_number: { type: String, required: true, unique: false },
});

export default mongoose.model<ICustomer>('customer', UserSchema);