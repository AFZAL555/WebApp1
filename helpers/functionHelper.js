const req = require('express/lib/request');
const async = require('hbs/lib/async');
const {ObjectId, Db} = require('mongodb');
const db = require('../config/DBconnection');
const collections = require('../config/collections');


module.exports = {

    newuserData:(userData)=>{
        return new Promise((resolve,reject)=>{
            userData.status=true
            db.get().collection(collections.USER_COLLECTION).insertOne(userData).then(()=>{
                return resolve(true)
            })
            .catch(()=>{
                return reject(false)
            })
        })
    },
    checkUser:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            var user = await db.get().collection(collections.USER_COLLECTION).findOne({Email:userData.Email,Password:userData.Password,status:true})
            console.log(user);
            
            if(user){
                
                return resolve({status:true,user})
            }
            else{
                return resolve({status:false})
            }
        })
    },
    adminValidate:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            var admin = await db.get().collection(collections.ADMIN_COLLECTION).findOne({Email:userData.AdminEmail,Password:userData.AdminPassword})

            if(admin){
                return resolve({admin,status:true})
            }
            else{
                return resolve({status:false})
            }
        })
    },

    getuserDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            var userDetails =await db.get().collection(collections.USER_COLLECTION).find().toArray();

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
            var userDetail = await db.get().collection(collections.USER_COLLECTION).findOne({_id:ObjectId(id)})
           
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
            db.get().collection(collections.USER_COLLECTION).updateOne({_id:ObjectId(id)},{
                $set:{
                    Name: updatedBody.Name,
                    Email: updatedBody.Email,
                    Mob: updatedBody.Mob

                    
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
            db.get().collection(collections.USER_COLLECTION).updateOne({_id:ObjectId(id)},{
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
            db.get().collection(collections.USER_COLLECTION).updateOne({_id:ObjectId(id)},{
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
            db.get().collection(collections.USER_COLLECTION).deleteOne({_id:ObjectId(id)}).then(()=>{
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
            
            db.get().collection(collections.USER_COLLECTION).insertOne(userinfo)
        
        .then(()=>{
            return resolve(true) 
        })
        .catch(()=>{
            return reject(false)
        })
    })
    }

}