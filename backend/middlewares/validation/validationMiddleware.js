import ExpressError from "../../utils/expressError.js";

export const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) throw new ExpressError(400, result.error.format());
  req.validatedData = result.data;
  next();
};
