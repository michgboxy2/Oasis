const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;


const PostSchema = new Schema({
    photo : {type : String, required : true},
    created : {type : Date, default : Date.now},
    post    : {type : Text},
    user : { type : mongoose.Schema.Types.ObjectId, ref : 'user', required : "You must be logged in"},
    likes: { type: Number, default: 0 },
    comments : [{type : Schema.Types.ObjectId, ref : 'comment'}]
},
{ usePushEach: true});


PostSchema.statics.like = function(id){
    const posts = mongoose.model('post');

    return posts.findById(id).then(post => {
        ++post.likes;
        return post.save();
    })
}


mongoose.model('post', PostSchema);