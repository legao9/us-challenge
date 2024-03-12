const User = require("../models/User");
const bcrypt = require("bcryptjs");
const ErrorResponse = require("../utils/ErrorResponse");
const jsonResponse = require('./jsonResponse');

function getRandomString(length) {
  var randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

exports.register = async (req, res, next) => {
  const {
    first_name,
    last_name,
    phone,
    email,
    password,
    address,
    lat,
    long,
    city,
    state,
    zipcode,
    profile_image,
    login_type,
    social_token,
    time_zone,
  } = req.body;
  var login_typ;
  if (!login_type) {
    return next(new ErrorResponse("login_type is required", 401));
  }
  login_typ = login_type.toLowerCase();
  const so = ["email", "facebook", "google", "linkedin"];
  const r = so.filter((s) => s == login_typ);
  if (r.length == 0) {
    return next(
      new ErrorResponse(
        "login_type can only be email, facebook, google, linkedin",
        401
      )
    );
  }
  if (
    login_typ == "email" ||
    login_typ == "facebook" ||
    login_typ == "google" ||
    login_typ == "linkedin"
  ) {
    const user = await User.findOne({ email });
    if (user) {
      return jsonResponse(
        res,
        0,
        `User already exists with ${user.login_type}`,
        {}
      );
    }
  }

  if (login_typ == "email") {
    if (!email) {
      return next(new ErrorResponse("email is required", 400));
    }
    if (!password) {
      return next(new ErrorResponse("password is required", 400));
    }
    const checkpass = password.match(/^[a-zA-Z0-9]{8,}$/);
    if (!checkpass) {
      return next(
        new ErrorResponse("Password must be at least 8 characters", 400)
      );
    }
    if (!first_name) {
      return next(new ErrorResponse("First name is required", 400));
    }
    if (!last_name) {
      return next(new ErrorResponse("Last name is required", 400));
    }
    if (!phone) {
      return next(new ErrorResponse("Mobile number is required", 400));
    }
    //const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(password, 10);
    //console.log(hashPassword);
    const s = await User.findOne({ email });
    if (s) {
      return next(
        new ErrorResponse("User already exists with this email", 400)
      );
    }

    const emailVerifyToken = getRandomString(20);
    const isEmailVerified = false;
    const user = await User.create({
      first_name,
      last_name,
      phone,
      email,
      password: hashPassword,
      address,
      lat,
      long,
      city,
      state,
      zipcode,
      profile_image,
      login_type: login_typ,
      social_token,
      time_zone,
      emailVerifyToken,
      isEmailVerified,
    });
    if (user) {return jsonResponse(res, true, "Registered = in successfully", {
      user,
     
    });}

  
  }


};

exports.login = async (req, res, next) => {
  const { email, password, login_type} = req.body;
  if (!login_type) {
    return next(new ErrorResponse("Please provide login_type", 400));
  }

  var login_typ = login_type.toLowerCase();
  const so = ["email", "facebook", "google", "linkedin", "apple"];
  const r = so.filter((s) => s == login_typ);
  if (r.length == 0) {
    return next(
      new ErrorResponse(
        "login_type can only be email, facebook, google, linkedin",
        "apple",
        401
      )
    );
  }
 

  if (login_typ == "email") {
    if (!email) {
      return next(new ErrorResponse("Please provide email", 400));
    }
    if (!password) {
      return next(new ErrorResponse("Please provide password", 400));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    try {
      await user.matchPassword(password);
    } catch (error) {
      return res.status(400).json({
        error: "Invalid credential",
        success: false,
      });
    }
    // if (user.is_userDeleted === true) {
    //   return res.status(400).json({
    //     error: "Your account has been de-activated",
    //   });
    // }
    // if (user && user.isEmailVerified == false) {
    //   return next(new ErrorResponse("Mail not verified !", 401));
    // }

    const token = user.getJwtToken();
    // req.session.userid = user._id;
    // if (user && user.company_id) {
    //   const companyId = user.company_id;
    //   const company = await Company.findById({ _id: companyId[0] }).select(
    //     "company_name isDeleted"
    //   );
    //   if (company && company.isDeleted === true) {
    //     return res.status(400).json({
    //       error: "Your company is not active",
    //       success: false,
    //     });
    //   }
    //   const token = user.getJwtToken();
    //   if (!company) {
    //     return jsonResponse(res, true, "Logeed in successfully", {
    //       user,
    //       token: token,
    //     });
    //   } else {
    //     return jsonResponse(res, true, "Logeed in successfully", {
    //       user,
    //       company_name: company.company_name,
    //       token: token,
    //     });
    //   }
    // }
    return jsonResponse(res, true, "Logeed in successfully", {
      token: token,
      user: user,
      // company_name: company.company_name,
    });
  }

  const {
    first_name,
    last_name,
    phone,
    address,
    lat,
    long,
    city,
    state,
    zipcode,
    profile_image,
    social_token,
  } = req.body;
  if (
    login_typ == "facebook" ||
    login_typ == "google" ||
    login_typ == "linkedin" ||
    login_typ == "apple"
  ) {
    const user = await User.findOne({ email });

    if (!user) {
      const info = {
        first_name,
        last_name,
        phone,
        email,
        address,
        lat,
        long,
        city,
        state,
        zipcode,
        profile_image,
        fcm_tokens,
        social_token,
      };
      if (login_typ == "facebook") {
        info.login_type = "facebook";
      }
      if (login_typ == "google") {
        info.login_type = "google";
      }
      if (login_typ == "linkedin") {
        info.login_type = "linkedin";
      }
      if (login_typ == "apple") {
        info.login_type = "apple";
      }

      const user = await User.create(info);

      const token = user.getJwtToken();
      return jsonResponse(res, true, "Logeed in successfully", {
        token: token,
        user,
      });
    }

    if (user.login_type !== login_typ) {
      return next(
        new ErrorResponse(
          `User already registered with ${user.login_type}`,
          401
        )
      );
    }

    user.social_token = req.body.social_token;
    user.lat = req.body.lat;
    user.long = req.body.long;
    user.save();
    if (user && user.company_id) {
      if (user.is_userDeleted === true) {
        return res.status(400).json({
          error: "Your account has been de-activated.",
          success: false,
        });
      }
      const companyId = user.company_id[0];
      const company = await Company.findById({ _id: companyId }).select(
        "company_name isDeleted"
      );
      if (company.isDeleted === true) {
        return res.status(400).json({
          error: "Your company is not active",
          success: false,
        });
      }

      const token = user.getJwtToken();
      if (!company) {
        return jsonResponse(res, true, "Logeed in successfully", {
          user,
          token: token,
        });
      } else {
        return jsonResponse(res, true, "Logeed in successfully", {
          user,
          company_name: company.company_name,
          token: token,
        });
      }
    }
    const token = user.getJwtToken();
    return jsonResponse(res, true, "Logeed in successfully", {
      user,
      company_name: company.company_name,
      token: token,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { first_name, last_name, phone, profile_image } = req.body;
    const _id = req.params.id;
    if (!_id) {
      return res.status(400).json({
        data: "Please enter id",
        success: false,
      });
    }
    const user = await User.findByIdAndUpdate(_id, req.body);
    if (!user) {
      return res.status(200).json({
        data: "user not found",
        success: false,
      });
    }
    await user.save();

    res.status(200).json({
      data: "User update successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      data: error.message || "something has gone wrong",
      success: false,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    if (!user_id) {
      return res.status(400).json({
        data: "Please enter user_id",
        success: false,
      });
    }
    const fcm_token = req.body.fcm_tokens;
    if (!fcm_token) {
      return res.status(400).json({
        data: "Please enter fcm_token",
        success: false,
      });
    }

    const user = await User.findOne({ _id: user_id });

    if (!user) {
      return res.status(400).json({
        data: "User not found",
        success: false,
      });
    }
    const fcm_tokens = user.fcm_tokens;

    if (!fcm_tokens.includes(fcm_token)) {
      return res.status(400).json({
        data: "Invalid fcm_token",
        success: false,
      });
    }
    const index = fcm_tokens.indexOf("fcm_token");
    await fcm_tokens.splice(index);
    await user.save();

    res.status(200).json({
      data: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      data: error.message,
      success: false,
    });
  }
};
exports.getAllUsers =async (req, res, next) => {  try {
  // Fetch all challenges from the database
  const userData = await User.find();

  // Log the challenges to the console

  // Send the challenges as the response
  res.json(userData);
} catch (error) {
  console.error("Error fetching polls:", error);
  res.status(500).json({ error: "Internal Server Error" });
}}