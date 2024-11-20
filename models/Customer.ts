import mongoose, { Model, Schema } from "mongoose";
import User, { IUser } from "./User";
export interface ICustomer extends IUser {
  phoneNumber: string;
}
const customerSchema: Schema = new Schema<ICustomer>({
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});

customerSchema.set("toObject", { virtuals: true });
customerSchema.set("toJSON", { virtuals: true });
customerSchema.pre("validate", function (next) {
  this.role = "customer";
  next();
});

const customerModel = User.discriminator<ICustomer>("Customer", customerSchema);
export default customerModel;
