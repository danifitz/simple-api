var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CatSchema = new Schema({
    name: String,
    breed: String,
    color: String
});

module.exports = mongoose.model('Cat', CatSchema);
