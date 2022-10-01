import express from "express"
import http from "http"
import mongoose from "mongoose"
import Logging from "./library/Loggin"

const router = express()

/**constorllers */
const client_proposal_controller = require("./controllers/client_proposal_controller")


const db_url = "mongodb+srv://root:071656Ad@cluster0.zekgg7g.mongodb.net/test"
const port = 8080
/* Connect to Mongo */
mongoose.connect(db_url)
   .then(() => {
      Logging.info('Mongo connected successfully.');
      StartServer();
   })
   .catch(err => {
      Logging.error(err)
   })


/** Onli start if the server if Mongo connects  */

const StartServer = () => {
   router.use((req, res, next) => {
      /** Log the request */
      Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

      res.on('finish', () => {
         /** Log the res */
         Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
      });

      next(); /**allow to pass through the middleware to next tasks */
   })

   router.use(express.urlencoded({ extended: true }));
   router.use(express.json());

   /** Rules of our API */
   router.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

      if (req.method == 'OPTIONS') {
         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
         return res.status(200).json({});
      }

      next();
   });

   /** Routes */
   router.use("/client-praposal-controller",client_proposal_controller)

   /** Healthcheck */
   router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

   /** Error handling */
   router.use((req, res, next) => {
      const error = new Error('Not found');

      Logging.error(error);

      res.status(404).json({
         message: error.message
      });
   });

   http.createServer(router).listen(port, () => Logging.info(`Server is running on port ${port}`));
}