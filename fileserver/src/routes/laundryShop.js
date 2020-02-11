const express = require('express');
const multer = require('multer');
const router = express.Router();
const uuid4 = require('uuid4');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/laundryShop');
    },

    filename: (req, file, cb) => {
        const filename = uuid4();
        file.uploadedFile = {
            ext: file.mimetype.split('/')[1]
        };
        switch (file.uploadedFile.ext) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'bmp':
                cb(null, filename + '.' + file.uploadedFile.ext);
                break;
            default:
                cb(new Error("file ext Error"));
                break;
        }
    }
});

const upload = multer({
    storage: storage
}).single('shopImage');

/**
 * @swagger
 *  components:
 *    schemas:
 *      request_saveImage(laundryShop):
 *        type: object
 *        properties:
 *          shopImage:
 *            type: string
 *            format: binary
 *
 *      response:
 *        type: object
 *        properties:
 *          response:
 *            type: string
 *          message:
 *            type: string
 *          data:
 *            type: object
 */

/**
 * @swagger
 *  paths:
 *    /laundryShop/saveImage:
 *      post:
 *        tags:
 *        - "LaundryShop"
 *        summary: "Login process"
 *        required: true
 *        description: ""
 *        requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                $ref: '#/components/schemas/request_saveImage(laundryShop)'
 *              example:
 *                shopImage: 'abcefghij.jpg'
 *        responses:
 *          '200: 성공':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/response'
 *                example:
 *                  response: "success"
 *                  message: "파일이 정상적으로 입력됐습니다."
 *                  data: "{
 *                      imageURL : localhost/adsaffa.jpg
 *                  }"
 *
 *          '200: 확장자 실패':
 *            description: 올바르지 않은 확장자
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/response'
 *                example:
 *                  response: "error"
 *                  message: "파일의 확장자가 잘못 됐거나 파일을 찾을 수 없습니다."
 *
 *          '200: 에러':
 *            description: 그 외의 모든 에러가 발생했을 때
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/response'
 *                example:
 *                  response: "error"
 *                  message: "파일을 찾을수가 없습니다. "
 */

router.post('/saveImage', (req, res, next) => {
    upload(req,res,(err)=>{
        const file = req.file;

        if(err){
            console.log(err);
            res.json({
                response: "error",
                message: "파일의 확장자가 잘못 됐거나 파일을 찾을 수 없습니다. "
            });
            return;
        }

        if (!file) {
            res.json({
                response: "error",
                message: "파일을 찾을수가 없습니다. "
            });
            return;
        }

        file.exportPath = `${req.headers.host}/${file.path.split('public/')[1]}`;

        res.json({
            response: "success",
            message: "파일이 정상적으로 입력됐습니다.",
            data: {
                imageUrl: file.exportPath
            }
        });
    })
});

module.exports = router;