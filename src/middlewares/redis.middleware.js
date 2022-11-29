import { client } from "../config/redis";
export const redisCheck = async (req, res, next) => {
    const data = await client.get('getNotes');
    console.log(typeof data);

    if (data != null) {
        res.status(200).json({
            code: 200,
            data: JSON.parse(data),
            message: "All notes Fetch From redis"
        });
    } else {
        next();
    }
}
export const redisGetById = async (req, res, next) => {
    const data = await client.get('getNotesById');
    console.log(typeof data);

    if (data != null) {
        res.status(200).json({
            code: 200,
            data: JSON.parse(data),
            message: "Get Note By Id Fetch From redis"
        });
    } else {
        next();
    }
}