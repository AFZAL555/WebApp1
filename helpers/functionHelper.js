const req = require('express/lib/request');
const async = require('hbs/lib/async');
const {ObjectId, Db} = require('mongodb');
const db = require('../config/DBconnection');

module.exports = {

    newuserData:(userData)=>{
        return new Promise((resolve,reject)=>{
            userData.status=true
            db.get().collection('userDatas').insertOne(userData).then(()=>{
                return resolve(true)
            })
            .catch(()=>{
                return reject(false)
            })
        })
    },
    checkUser:(userDetail)=>{
        return new Promise(async(resolve,reject)=>{
            var user = await db.get().collection('userDatas').findOne({email:userDetail.email,password:userDetail.password,status:true})
            console.log(user);
            // if(user){
            //     var userStatus=user.status
            // }
            
            if(user){
                
                return resolve({status:true,user})
            }
            else{
                return resolve({status:false})
            }
        })
    },
    adminValidate:(adminCredential)=>{
        return new Promise(async(resolve,reject)=>{
            var admin = await db.get().collection('adminData').findOne({adminName:adminCredential.adminName,password:adminCredential.password})

            if(admin){
                return resolve({status:true})
            }
            else{
                return resolve({status:false})
            }
        })
    },
    getuserDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            var userDetails =await db.get().collection('userDatas').find().toArray();

            if(userDetails){
                return resolve({userDetails,status:true})
            }
            else{
                return resolve({staus:false})
            }
        })
  
    },
    userDetails:(id)=>{
        return new Promise(async(resolve,reject)=>{
            var userDetail = await db.get().collection('userDatas').findOne({_id:ObjectId(id)})
           
                if(userDetail){
                    return resolve({userDetail,status:true})
                }
                else{
                    return resolve({status:false})
                }
        })
    },
    userModify:(id,updatedBody)=>{
        
        return new Promise((resolve,reject)=>{
            db.get().collection('userDatas').updateOne({_id:ObjectId(id)},{
                $set:{
                    firstName: updatedBody.firstName,
                    lastName: updatedBody.lastName
                }}).then(()=>{
                return resolve(true)
            })
            .catch(()=>{
                return reject(false)
            })
        })
    },
    userBlock:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('userDatas').updateOne({_id:ObjectId(id)},{
                $set:{
                    status:false
                }}).then(()=>{
                    return resolve(true)

                })
                .catch(()=>{
                    return reject(false)
                })
        })
    },
    userUnblock:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('userDatas').updateOne({_id:ObjectId(id)},{
                $set:{
                    status:true
                }})
                .then(()=>{
                    return resolve(true)
                })
                .catch(()=>{
                    return resolve(false)
                })
        })
    },
    userDelete:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('userDatas').deleteOne({_id:ObjectId(id)}).then(()=>{
                return resolve(true)
            })
            .catch(()=>{
                return reject(false)
            })
        })
    },
    adminUsercreate:(userinfo)=>{
        return new Promise((resolve,reject)=>{

            userinfo.status=true
            
            db.get().collection('userDatas').insertOne(userinfo)
        
        .then(()=>{
            return resolve(true) 
        })
        .catch(()=>{
            return reject(false)
        })
    })
    }

}