import joi from "joi";

export const urlSchema = joi.object({
    url: joi.string().required().uri()
})

export const urlIdSchema = joi.object({
    id: joi.number().integer().required()
})