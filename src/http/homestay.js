import instance from '@/http/http.js'


function homestayRead(sid){
    return new Promise((resolve,reject)=>{
        instance.get('/api/homestay/'+sid).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
    
}

function homestaySave(data){
    return new Promise((resolve,reject)=>{
        instance.post('/api/homestay/',data).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function homestayUpdate(data){
    return new Promise((resolve,reject)=>{
        instance.put('/api/homestay/'+data.sid,data).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function homestayDelete(sid){
    return new Promise((resolve,reject)=>{
        instance.delete('/api/homestay/'+sid).then(res=>{
            //   this.categorys = res.data
            resolve(res);
        }).catch(error=>{
            reject(error);
        })
    })
}

export {homestayDelete,homestayRead,homestaySave,homestayUpdate}