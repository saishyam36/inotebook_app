const flagData={
    starRating: false,
    accordian: true
}

export default function featureFlagsDataServiceCall(){
    return new Promise((resolve,reject)=>{
        if(flagData) setTimeout(resolve(flagData),500)
        else reject('Some Error Occured!!!')
    })
}