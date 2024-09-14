import express from "express"

const Router = express.Router()

    Router.get('/', (req, res) => {
        res.status(200).json( "index page is there" );
      });
      

export default Router ;