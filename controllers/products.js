const Product = require('../models/product') ;


async function getAllProductsStatic(req, res){
    const {name , price} = req.query ;
    const products = await Product.find({price : {$gt : 40 }}).sort('price'  ) ;       // these 
    res.status(200).json({length : products.length , message : products});
}


async function getAllProducts(req, res){

  // we have to handle the case if user send those query which
//    is not present in the model like in these we have page
// *** we fetch all the property from that which is possible 
let {featured ,name , company , price , sort , fields , numericFilters } = req.query ;
const queryObject = {} ;
if(featured){
    queryObject.featured = featured === 'true' ? true :false ;
}

if(name){
    queryObject.name = {$regex : name , $options : 'i'} ;
}

if(company){
    queryObject.company = company ;
}
if(price){
    queryObject.price = price ;
}
// these only to display the data in the sorted list
let sortList = 'name';
if(sort){
    sortList = sort.split(',').join(' ') ;
}
let fieldList  ;

if(fields){
    fieldList = fields.split(',').join(' ');
}

if(numericFilters){
   const operatorMap = {
    '>' : '$gt' ,
    '>=' : '$gte' ,
    '<' : '$lt' ,
    '<=' : '$lte' ,
    '=' : '$eq' ,
    
   }
   const regEx = /\b(<|>|<=|>=|=)\b/g ;

   // match method is used to pass the matching string from regEx
  let filters = numericFilters.replace(regEx , (match)=>(`-${operatorMap[match]}-`))    
  const options = ['price' , 'rating'] ;

  filters = filters.split(',').forEach((item) => {

    const [field , operator , value] = item.split('-');
    if(options.includes(field)){
        if(field in queryObject){                 // if field already exist 
            queryObject[field][operator] = Number(value) ;
        }else{
        queryObject[field] = {[operator] : Number(value)}
        }
    }
    
  });
  console.log(queryObject)
    // numericFilters = numericFilters.replace('>=', '{:gte:}').replace('<=', ':lte:').replace('>', ':gt:').replace('<', ':lt:');
    
}


let page = Number(req.query.page) || 1 ;     // either it is given or it is one
let limit = Number(req.query.limit) || 10    
let skip = (page-1)*limit ;


const products = await Product.find(queryObject).sort(sortList).select(fieldList).skip(skip).limit(limit);



     
    res.status(200).json({ length :  products.length , message : products  })
}



module.exports = {getAllProductsStatic , getAllProducts}