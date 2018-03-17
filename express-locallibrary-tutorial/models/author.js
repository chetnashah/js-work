var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var authorSchema = new Schema({
    first_name: { type: String, required: true, max: 100 },
    family_name: { type: String, required: true, max: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date }
})

authorSchema.virtual('name').get(
    function() {
        return this.first_name + ' ' + this.family_name;
    }
);

authorSchema.virtual('lifespan').get(function(){
    return this.date_of_death - this.date_of_birth;
});

// virtual for author's url
authorSchema.virtual('url').get(
    function() {
        return '/catalog/author/' + this._id;
    }
)

// export model
module.exports = mongoose.model('Author', authorSchema);
