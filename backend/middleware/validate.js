import { ZodError } from "zod";

export const validate =
  (schema) =>
  (req, res, next) => {
    try {
      schema.parse(req.body);

      next();

    } catch (err) {

      // Zod validation error
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: err.issues.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        });
      }

      // Other error
      return res.status(500).json({
        message: "Server validation error",
      });
    }
  };
