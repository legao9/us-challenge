const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    default: null
  },
  last_name: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: [true, 'Email is already registered'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  login_type: {
    type: String,
    required: [true, 'Please add login_type']
  },
  company_id: {
    type: [String],
    default: "6100dd7e7c696310b85fd3c0"
  },
  company_name: {
    type: String
  },
  role_id: {
    type: Number,
    default: 6
  },
  role_type: {
    type: String,
    default: "user"
  },
  password: {
    type: String,
    minlength: [8, 'Please enter password greater than 8 character'],
    select: false
  },
  phone: {
    type: Number,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  lat: {
    type: Number,
    default: null
  },
  long: {
    type: Number,
    default: null
  },
  city: {
    type: String,
    default: null
  },
  state: {
    type: String,
    default: null
  },
  zipcode: {
    type: Number,
    default: null
  },
  profile_image: {
    type: String,
    default: null
  },
  fcm_tokens:[String],

  social_token: {
    type: String,
    default: null
  },
  time_zone: {
    type: String,
    default: null
  },
  resetPasswordToken: {
    type: String,
    default: null
  },
  emailVerifyToken: {
    type: String,
    default: null
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordExpire: {
    type: Date,
    default: null
  },
  isFirstTime: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  is_userDeleted: {
    type: Boolean,
    default: false
  },
  subscription_active: {
    type: Boolean,
    default: false
  }
});


// encrypt the password
UserSchema.pre('save', async function(next) {
  // const salt = await bcrypt.genSalt(10);
  // this.password = await bcrypt.hash(this.password, salt);
});

// return jsonwebtoken
UserSchema.methods.getJwtToken = function() {

  return jwt.sign(
    { id: this._id, role_id: this.role_id },
    process.env.JWT_SECRET
    // , {expiresIn: process.env.JWT_EXPIRE}
  );
};

// Match db hashed and plain password
UserSchema.methods.matchPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

// password reset route
UserSchema.methods.getResetPassword = function() {
  // generating random string
  const p = crypto.randomBytes(3).toString('hex');
  return p;
};
module.exports = mongoose.model('User', UserSchema);
