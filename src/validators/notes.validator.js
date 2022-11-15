import Joi from '@hapi/joi';

export const newNotesValidator = (req, res, next) => {
    const schema = Joi.object({
        Title: Joi.string().min(2).required(),
        Descreption: Joi.string().min(2).required(),
        Color: Joi.string().optional(),
        isArchived: Joi.boolean().optional(),
        isDeleted: Joi.boolean().optional(),
        UserID: Joi.string().optional()

    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    } else {
        req.validatedBody = value;
        next();
    }
};
