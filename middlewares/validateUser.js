const Joi = require("joi");

const validateAdminSignup = async (req, res, next) => {
  try {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(10).required().messages({
        "string.base": `"username" must be of type "text and combination of numbers"`,
        "string.required": `"username" is required"`,
      }),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,10}$"))
        .required()
        .messages({
          "string.base": `"password" must be less than 10`,
          "string.required": `"password" is required"`,
        })
      
    });
    await schema.validateAsync(req.body, { abortEarly: true });
    next();
  } catch (error) {
    return res.status(422).json({
      message: error.message,
      success: false,
    });
  }
};


module.exports ={validateAdminSignup}