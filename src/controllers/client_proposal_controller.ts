import { NextFunction, Router, Request, Response } from "express";
import ClientPraposal from "../models/client_proposal";
import mongoose from "mongoose";
const router = Router();


//create
router.post("/create-clientPraposal", (req: Request, res: Response, next: NextFunction) => {
   const { name, dob } = req.body;
   const r = new ClientPraposal(
      {
         _id: new mongoose.Types.ObjectId(),
         name,
         dob
      }
   );
   return r
      .save()
      .then((clientPraposal) => res.status(200).json({ clientPraposal }))
      .catch((error) => res.status(500).json({ error }));
})

//read
router.get("/", (req: Request, res: Response, nex: NextFunction) => {
   return ClientPraposal.find()
      .then(clientPraposals => res.status(200).json({ ClientPraposal_count: clientPraposals.length, clientPraposals }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})
//search by name
router.get("/:name", (req: Request, res: Response, nex: NextFunction) => {
   const name =  req.params.name;
   const query = {"name" : name}
   return ClientPraposal.find(query)
      .then(clientPraposals => res.status(200).json({ ClientPraposal_count: clientPraposals.length, clientPraposals }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return ClientPraposal.findById(__id)
      .then((clientPraposal) => {
         if (clientPraposal) return res.status(200).json(clientPraposal)
         else return res.status(404).json({ message: "ClientPraposal not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//update
router.put("/update-clientPraposal/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return ClientPraposal.findById(__id)
      .then((clientPraposal) => {
         if (clientPraposal) {
            clientPraposal.set(req.body);
            return clientPraposal
               .save()
               .then((clientPraposal) => {
                  return res.status(200).json({ clientPraposal });
               })
               .catch((err) => {
                  return res.status(500).json({ err });
               });
         } else {
            return res.status(404).send({ error: "ClientPraposal not found" });
         }
      })
      .catch((err) => {
         return res.status(500).json({ err });
      });
})

//delete
router.delete("/delete-clientPraposal/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return ClientPraposal.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})

export = router