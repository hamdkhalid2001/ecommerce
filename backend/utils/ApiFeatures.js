class ApiFeatures{
    constructor(query,query_str){
        this.query = query
        this.query_str = query_str
    }

    search(){
        const keyword = this.query_str.keyword ? {
            name:{
                $regex:this.query_str.keyword,
                $options:'i',
            }
        }:{};
        this.query = this.query.find({...keyword})
        return this;
    }
    filter(){
        
        let queryCopy = {...this.query_str}
        Reflect.deleteProperty(queryCopy,'keyword','limit','pagination')
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|lt|gte|lte)\b/g, (key) => `$${key}`)
        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }
}
module.exports = ApiFeatures