import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError.js";
import Joi from "joi";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
    },
    text: {
      type: String,
      required: [true, "Text is required"],
    },
  },
  { versionKey: false }
);

categorySchema.post("save", handleMongooseError);

export const addCategorySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required field "name"`,
  }),
  text: Joi.string().required().messages({
    "any.required": `missing required field "text"`,
  }),
});

export const Category = model("category", categorySchema);
