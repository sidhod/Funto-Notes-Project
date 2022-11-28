import { client } from "../config/redis";
export const redisCheck = async (req, res, next) => {
    const data = await client.get('getNote');
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
