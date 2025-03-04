import Joi from "joi";


const validateForm = (schema) => (payload) => schema.validate(
    payload, { abortEarly: false });

const signUpSchema = Joi.object().keys({

    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(4).max(20).required(),
    maritalStatus:Joi.string().required(),
    title:Joi.string().required(),

});

const validatesignUp = validateForm(signUpSchema);

export const signupSchemaValidation = ( req, res, next) => {
    const { error } = validatesignUp(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details.map((detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, '')),
      });
    } else {
      next();
    }
};

const loginSchema = Joi.object().keys({
    email:Joi.string().email().required(),
    password:Joi.string().min(4).max(20).required(),

});

const validateLogin = validateForm(loginSchema);

export const loginSchemaValidation = (req,res,next) => {
    const { error } = validateLogin(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details.map((detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, '')),
      });
    } else {
      next();
    }
    
}

const emailSchema = Joi.object().keys({
  email:Joi.string().email().required(),
})


const validateEmail = validateForm(emailSchema);

export const emailSchemaValidation = (req,res,next) => {
    const { error } = validateEmail(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details.map((detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, '')),
      });
    } else {
      next();
    } 
}

const resetSchema = Joi.object().keys({
  newPassword:Joi.string().min(4).max(20).required(),
  confirmPassword:Joi.string().min(4).max(20).required(),

})

const validateResetSchema = validateForm(resetSchema);

export const resetPasswordValidation = (req,res,next) => {
  const { error } = validateResetSchema(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details.map((detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, '')),
    });
  } else {
    next();
  } 
}

const updatePasswordSchema = Joi.object().keys({
  currentPassword:Joi.string().min(4).max(20).required(),
  newPassword:Joi.string().min(4).max(20).required(),
  confirmPassword:Joi.string().min(4).max(20).required(),
});

const validateUpdateSchema = validateForm(updatePasswordSchema);

export const updateValidation = (req, res, next) => {
  const { error } = validateUpdateSchema(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details.map((detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, '')),
    });
  } else {
    next();
  } 

}