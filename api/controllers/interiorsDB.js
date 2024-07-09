const mongoose = require("mongoose");
const productSchema = require("../models/product");
const { faker } = require('@faker-js/faker');

module.exports = class InteriorsDB {
  constructor(){
    this.Product = null;
  }

  //db functions
  initialize(connectionString){
    return new Promise((resolve, reject)=>{
      const db = mongoose.createConnection(connectionString);

      db.once('error', (err) => {
        reject(err);
      });
      db.once('open', () => {
        this.Product = db.model("products", productSchema);
        resolve();
      });  
    });
  }

  getAllProducts(){
    return this.Product.find().exec();
  }

  getProductById(id){
    return this.Product.findOne({_id: id}).exec();
  }

  
  //Load data
  loadData(){  
    const fakeProducts = Array.from({ length: 20 }, ()=>this.generateFakeProduct());
    return this.Product.insertMany(fakeProducts)
  }

  generateFakeProduct() {
    return new this.Product({
      //productId: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({min:0, max:1000, dec:2}),
      dimensions: {
        length: faker.number.int({ min: 0, max: 100 }),
        width: faker.number.int({ min: 0, max: 100 }),
        height: faker.number.int({ min: 0, max: 100 }),
      },
      weight: faker.number.int({ min: 0, max: 100 }),
      materials: faker.helpers.arrayElements(['Plastic', 'Metal', 'Wood', 'Glass'], faker.number.int({ min: 1, max: 4 })),
      categories: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
      images: [
        {
          url: faker.image.url(),
          altText: faker.lorem.sentence(),
        }
      ],
      stockQuantity: faker.number.int({ min: 0, max: 1000 }),
      featured: faker.datatype.boolean(),
      status: faker.helpers.arrayElement(['onSale', 'soldOut', 'preOrder'])
    });
  };
  
}