var express = require('express');
var router = express.Router();
var coupon= require('../../models/coupon');
var verifyToken = require('../../middleware/verifytokenadmin');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
// multer start

const multer = require("multer");
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}.${file.originalname}`
        callback(null,filename)
    }
  });
  const upload = multer({
    storage,
  });
// multer end

router.get('/list',verifyToken, async function(req, res, next){
  try{
        const data = await coupon.find().populate('userId',{name:1}).sort({"createdAt":-1}).exec();
        return res.status(200).json({ success:'Data found', data:data });
  }catch(err){
    return res.status(500).json({ errors: err });
  }
});
router.post('/create',verifyToken,
   async function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try{
     var getData = await coupon.findOne({'coupon_code':req.body.coupon_code}).exec();
      if (getData) {
      return res.status(400).json({ errors: "Coupon Already Exist " });
    }
            const add = new coupon({
                'coupon_code':req.body.coupon_code,
                'usage_limit':req.body.usage_limit,
                'amount':req.body.amount,
                'currency':req.body.currency,
                'expiry_date':req.body.expiry_date,
                'userId':req.decoded.id
            });
            await add.save()
            return res.status(200).json({ success: 'Coupon created'});
  }catch(err){
    return res.status(500).json({ errors: err });
  }
});

router.post('/update',verifyToken, body('couponId').not().isEmpty().withMessage('Coupon Id Required'),
 async function(req, res, next){
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try{
      var getData = await coupon.findOne({'_id':req.body.couponId}).exec();
      if (!getData) {
      return res.status(400).json({ errors: "Coupon Didn't Exist " });
    }
    let updateData = { 
        'coupon_code':req.body.coupon_code,
        'usage_limit':req.body.usage_limit,
        'amount':req.body.amount,
        'currency':req.body.currency,
        'expiry_date':req.body.expiry_date,
        'userId':req.decoded.id
     };
        const data = await coupon.findByIdAndUpdate(req.body.couponId,updateData).exec();
        
        return res.status(200).json({ success:'Coupon Updated' });
  }catch(err){
    return res.status(500).json({ errors: err });
  }
});

router.get('/show/:id',verifyToken, async function(req, res, next){
    let dataId= req.params.id;
try{
    const data = await coupon.findOne({'_id':dataId}).exec();
    return res.status(200).json({ data:data });
}catch(err){
    return res.status(500).json({ errors: err });
}
});

router.get('/remove/:id',verifyToken, async function(req, res, next){
    let dataId= req.params.id;
    try{
    const user = await coupon.findByIdAndDelete(dataId)
    if(!user){
        return res.status(400).json({ errors: "Coupon Not Exits" });
    }
    return res.status(200).json({ success:"Coupon Deleted" });
    }
    catch(err){
    return res.status(500).json({ errors: err });
    }
});

router.get('/statusUpdate/:id',verifyToken, async function(req, res, next){
    let dataId= req.params.id;
try{
   const viewDatas= await coupon.findOne({'_id':dataId}).exec();
if(viewDatas){
  var statusKey= viewDatas.status;
  var newStatusKey='';
  if(statusKey == 'Active'){
    newStatusKey= 'Deactive';
  }else{z
    newStatusKey= 'Active';
  }
   await coupon.findOneAndUpdate({'_id':dataId}, {'status':newStatusKey});
}
return res.status(200).json({ sucess:"Status Changed" });
}catch(err){
return res.status(500).json({ errors: err });
}
});
module.exports = router;