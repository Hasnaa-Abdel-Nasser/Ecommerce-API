

export class ApiFeatures{
    constructor(mongooseQuery , queryString){
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    paginate(total){
        let page = this.queryString.page;
        this.page = page * 1 || 1;
        if(page <= 0 || !page || page > total)  page = 1;
        let skip = (page - 1) * 10;
        this.mongooseQuery.skip(skip).limit(10);
        return this;
    }

    fields(){
        if(this.queryString.fields){
            let fields = this.queryString.fields.split(',').join(' ');
            console.log(fields);
            this.mongooseQuery.select(fields)
        }
        return this;
    }

    search(){
        if(this.queryString.keyword){
            this.mongooseQuery.find({
                $or:
                [
                    {title : {$regex : this.queryString.keyword , $options : 'i'}},
                    {discription : {$regex : this.queryString.keyword , $options : 'i'}},
                ]
            })
        }
        return this;
    }

    sort(){
        if(this.queryString.sort){
            console.log(this.queryString.sort);
            let sortedBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery.sort(sortedBy);
        }
        return this
    }
}
