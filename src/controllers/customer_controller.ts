import { NextFunction, Router, Request, Response } from "express";
import Customer from "../models/customer";
import mongoose from "mongoose";
const router = Router();


//create
router.post("/create-customer", (req: Request, res: Response, next: NextFunction) => {
   const { name, nic, uid, account_balance, dob, address, email, contact_number } = req.body;
   const r = new Customer(
      {
         _id: new mongoose.Types.ObjectId(),
         name,
         address,
         nic,
         uid,
         account_balance,
         dob,
         email,
         contact_number
      }
   );
   return r
      .save()
      .then((Customer) => res.status(200).json({ Customer }))
      .catch((error) => res.status(500).json({ error }));
})

//read
router.get("/", (req: Request, res: Response, nex: NextFunction) => {
   return Customer.find()
      .then(Customers => res.status(200).json({ Customer_count: Customers.length, Customers }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Customer.findById(__id)
      .then((Customer) => {
         if (Customer) return res.status(200).json(Customer)
         else return res.status(404).json({ message: "Customer not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//update
router.put("/update-customer/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Customer.findById(__id)
      .then((Customer) => {
         if (Customer) {
            Customer.set(req.body);
            return Customer
               .save()
               .then((Customer) => {
                  return res.status(200).json({ Customer });
               })
               .catch((err) => {
                  return res.status(500).json({ err });
               });
         } else {
            return res.status(404).send({ error: "Customer not found" });
         }
      })
      .catch((err) => {
         return res.status(500).json({ err });
      });
})

//delete
router.delete("/delete-customer/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Customer.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})

//get ac balance
router.get("/check-balance/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Customer.findById(__id)
      .then((Customer) => {
         if (Customer) return res.status(200).json(Customer.account_balance)
         else return res.status(404).json({ message: "Customer not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})


export = router