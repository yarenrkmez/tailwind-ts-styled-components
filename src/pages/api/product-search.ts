import type { NextApiRequest, NextApiResponse } from 'next';
import searchData from '../../assets/json/searchData.json';

const getProducts = async (res: NextApiResponse<any>) => {
    try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(
            JSON.stringify({
                message: 'fetched',
                data: searchData,
                status: 200
            })
        );
    } catch (error) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(
            JSON.stringify({
                message: 'error',
                status: 404
            })
        );
    }
}



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    getProducts(res)

}
