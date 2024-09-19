import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
      },
      email: {
        type: String,
        required: true,
        // unique: true,
        // trim: true,
        // lowercase: true,
        // validate: {
        //   validator: function(v) {
        //     return /\S+@\S+\.\S+/.test(v);
        //   },
        //   message: props => `${props.value} is not a valid email!`
        // }
      },
      password: {
        type: String,
        required: true,
        // minlength: 8
      },
    //   roles: {
    //     type: [String],
    //     enum: ['user', 'admin'],
    //     default: 'user'
    //   },
    //   createdAt: {
    //     type: Date,
    //     default: Date.now,
    //     immutable: true
    //   },
    //   updatedAt: {
    //     type: Date,
    //     default: Date.now
    //   }
    // }, {
    //   timestamps: true,
    //   toJSON: {
    //     virtuals: true,
    //     transform: (doc, ret) => {
    //       delete ret.password;
    //       return ret;
    //     }
    //   },
    //   toObject: {
    //     virtuals: true
    //   }
    });
    
    // Add a compound index for frequent queries
    // userSchema.index({ email: 1, name: -1 });
    
    // Pre-save middleware to update the `updatedAt` field
    // userSchema.pre('save', function (next) {
    //   this.updatedAt = Date.now();
    //   next();
    // });
    
    const User = mongoose.model('User', userSchema);
    
    export default User;