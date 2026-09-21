import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        // custom manejo de errores
        const custom = errors.formatWith((err) => {
            return `${err.msg}`;
        });

        return res.status(400).json(custom.array());
    }
    next();
}; 