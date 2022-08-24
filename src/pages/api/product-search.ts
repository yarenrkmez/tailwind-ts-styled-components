import type { NextApiRequest, NextApiResponse } from 'next';


const searchProducts = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    try {

        const resAllData = await fetch(`http://${req.headers.host}/api/all-products`);
        const allData = await resAllData.json();

        let allProducts = allData.data;
        const groupedBrands = allData.groupedBrands;

        const searchedText = req.body.text;
        const sortingVal = req.body.sorting;
        const brandFilterVal = req.body.brand;

        if (brandFilterVal) {
            allProducts = groupedBrands[brandFilterVal];
        }

        if (searchedText) {
            allProducts = allProducts?.filter((item: any) => {
                if (item.name.toLowerCase().includes(searchedText.toLowerCase()) || item.brand.toLowerCase().includes(searchedText.toLowerCase()))
                    return item
            }) || [];
        }

        //lowest
        if (sortingVal === '1') {
            allProducts = allProducts.sort((a: any, b: any) => parseFloat(a.discounted_price) - parseFloat(b.discounted_price));
        }

        //highest
        if (sortingVal === '2') {
            allProducts = allProducts.sort((a: any, b: any) => parseFloat(b.discounted_price) - parseFloat(a.discounted_price));
        }


        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(
            JSON.stringify({
                message: 'fetched',
                status: 200,
                data: allProducts,
                brands: Object.keys(groupedBrands),
                groupedBrands: groupedBrands
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
        console.log(error, "error")
    }
}



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    await searchProducts(req, res);



}
