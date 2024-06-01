const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this product.']
    },

    quantity:{
        type: Number,
        required: true,
        default: 0
    },

    price: {
        type: Number,
        required: true,
        default : 0
    },

    image: {
        type: String,
        required: false
    },
},
{
    timestamps: true
}
);

const Product = mongoose.model('Product', ProductSchema);   // Product is the name of the model and ProductSchema is the schema that we have defined above.
module.exports = Product;    // Exporting the model so that we can use it in other files.