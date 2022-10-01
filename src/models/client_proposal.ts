import mongoose, { Schema } from "mongoose"

export interface ICustomerPraposal {
   name: string,
   dob: Date,
}

export interface ICustomerPraposalModel extends ICustomerPraposal, Document { }

const CustomerPraposalSchema: Schema = new Schema(
   {
      name: { type: String, required: true },
      dob: { type: Date, required: true },
   }
   , {
      versionKey: false
   }
)

export default mongoose.model<ICustomerPraposalModel>("CustomerPraposal", CustomerPraposalSchema)