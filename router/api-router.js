//express: 서버를 켜줌
const express = require("express");
const router = express.Router();
const Pool= require("../utils/mysql");

//사용자가 db에 직접 입력할 수는 없음-> 사용자의 입력을 db에 입력
router.post("/sample", async(req, res, next) =>{
    const connection = await Pool.getConnection(); //await: 다 실행되어야 넘어감
    try{
        await connection.query("INSERT INTO `test1`.`user` (`id`, `password`, `email`) VALUES (?,?,?);", 
        [req.body.id, req.body.password, req.body.email]);
        //console.log(req.body)
        //console.log("sample called!");
        res.json({
            msg: "success"
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            msg: "fail"
        });
    }finally{
        connection.release();
    } 
});

router.post("/login", async(req, res, next)=>{
    const connection= await Pool.getConnection();
    try{
        const result= await connection.query("SELECT * FROM `test1`.`user` where user.id=? and password=?", [req.body.id, req.body.password])
        //id가 존재한다면
        if(result.length===1){
            res.json({msg: "Success"})
        }else{
            res.json({msg: "Fail"})
        }
    }catch(err){
        //
    }finally{
        //
    }
})



router.post("/getMenu", async(req, res, next)=>{
    const connection = await Pool.getConnection();
    try{
        const [result] =await connection.query("SELECT * FROM `test1`.`menu`")
        res.json({result:result})
    }catch(err){
        console.log(err)
    }finally{
        //connection.release();
    }
})

router.post("/saveRecipe", async(req, res, next)=>{
    const connection = await Pool.getConnection();
    try{
        await connection.query("INSERT INTO `test1`.`menu` (`menu`, `material`, `time`, `keypoint`, `recipe`) VALUES (?,?,?,?,?);", 
        [req.body.menu, req.body.material, req.body.time, req.body.keypoint, req.body.recipe]);
        res.json({msg: "Recipe Success"})
    }catch(err){
        console.log(err)
    }finally{
        connection.release();
    }
})

module.exports = router;