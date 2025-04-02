import jwt from "jsonwebtoken";

export default function (req, res, next) {
    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(401).json({message: "Não autorizado"});
    }

    const token = authorization.replace("Bearer ", ""). trim();

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const {id, email} = data;
        req.user = {id, email};

        return next();

    } catch (error) {
        return res.status(401).json({message: "Não autorizado"});
    }
}

