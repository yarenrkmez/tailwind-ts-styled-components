import type { NextApiRequest, NextApiResponse } from 'next';
import searchData from '../../assets/json/searchData.json';

const getProducts = async (res: NextApiResponse<any>) => {
    try {
        const tempData = [...searchData];

        const newData = tempData.map((item: any) =>
            item = { ...item, discounted_price: item?.discount_percentage ? (item.price - item.price * item.discount_percentage / 100).toFixed(3) : item.price }
        );

        const groupBy = (objectArray: Array<any>, property: string) => {
            return objectArray.reduce((acc, obj) => {
                const key = obj[property];
                acc[key] ??= [];
                acc[key].push(obj);
                return acc;
            }, {});
        };

        const groupedBrands = groupBy(newData, 'brand');

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(
            JSON.stringify({
                message: 'fetched',
                status: 200,
                data: newData,
                brands: Object.keys(groupedBrands),
                groupedBrands:groupedBrands
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

    getProducts(res);
    

}
