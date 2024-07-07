const express = require('express');
const productController = require('../controllers/producctController');
const router = express.Router()


router.post('/add-product/:firmId', productController.addProduct)
router.get('/:firmId/products', productController.getProductByFirm)


router.get('/uploads/:imageName', (req,res)=>{
    const imageNAme=req.params.imageName;
    res.header('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'...','uploads',imageNAme))
})

router.delete('/:productId',productController.deleteProduct)

module.exports = router;