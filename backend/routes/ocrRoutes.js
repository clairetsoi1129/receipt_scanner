import express from 'express';
import * as dotenv from 'dotenv';
import Tesseract from 'tesseract.js';

dotenv.config();

const router = express.Router();

router.route('/').post(async (req, res) => {
    try {
        const url = req.body.url;
        console.log(`url:${url}`)
        
        const data = Tesseract.recognize(url, 'eng', {logger: e => console.log(e) } )
            .then(out => {
                console.log(out.data.text);
                res.status(200).json({ data: out.data.text });
            })
    } catch (error) {
        console.error(error);
        res.status(500).send(error?.res.error.message || 'Something went wrong');
    } 
});

export default router;