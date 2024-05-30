import jwt from "jsonwebtoken";

const createJWTToken = (payload: object | string, secret: string) => {
    try {
        const token = jwt.sign(payload, secret, {
            expiresIn: "1h",
        });

        return token;
    } catch (error) {
        console.log("Token signing failed : ", error);

        throw error;
    }
};

const verifyJWTToken = (token: string, secret: string) => {
    try {
        const decoded = jwt.verify(token, secret);

        return decoded;
    } catch (error) {
        console.log(error);

        throw error;
    }
};

export { createJWTToken, verifyJWTToken };
