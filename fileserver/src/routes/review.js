const express = require('express');
const multer = require('multer');
const router = express.Router();
const uuid4 = require('uuid4');

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'public/images/review');
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
}).array('reviewImages', 5);

/**
 * @swagger
 *  components:
 *    schemas:
 *      request_saveImage(review):
 *        type: object
 *        properties:
 *          reviewImages:
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
 *    /Review/saveImages:
 *      post:
 *        tags:
 *        - "review"
 *        summary: "Login process"
 *        required: true
 *        description: ""
 *        requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                $ref: '#/components/schemas/request_saveImage(review)'
 *              example:
 *                reviewImages: '3개의 이미지가 선택됐습니다.'
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
 *                      imageURL : [localhost/adsaffa.jpg, localhost/asdf2.jpg, localhost/232aafea3.jpg]
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

router.post('/saveImages', (req, res) => {
    upload(req, res, (err) => {
        const files = req.files;
        const exportPaths = [];

        if(err){
            res.json({
                response: "error",
                message: "파일의 확장자가 잘못 됐거나 파일을 찾을 수 없습니다. "
            });
            return;
        }

        if(files.length===0){
            res.json({
                response: "error",
                message: "파일을 찾을 수 없습니다. "
            });
            return;
        }

        files.map(item => {
            const exportPath = `${req.headers.host}/${item.path.split('public/')[1]}`;
            exportPaths.push(exportPath);
        });

        res.json({
            response : "success",
            message : "파일이 정상적으로 처리 되었습니다.",
            data : {
                imageUrl : exportPaths
            }
        });
    })
});

module.exports = router;
