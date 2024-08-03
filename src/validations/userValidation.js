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
