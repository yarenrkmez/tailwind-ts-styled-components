import type { NextApiRequest, NextApiResponse } from 'next';
import tableData from '../../assets/json/tableData.json';

const getTableData = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const currentPage: number = Number(req.query.page) || 1;
    const perPage = Number(req.query.page_size) || 25;

    try {
        const tempData = [...tableData];
        let headers = Object.keys(tempData[0]);

        const capitalizeFirstLetter = (string: string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        headers = headers.map(item =>
            item = capitalizeFirstLetter(item.replaceAll('_', ' '))
        )

        const calculate = () => {
            let added2 = currentPage !== 1 ? 1 : 0;
            let added1 = currentPage !== 1 && currentPage !== 2 ? 1 : 0;

            return {
                first: ((currentPage - 1) * perPage) + added1,
                second: (currentPage * perPage) + added2
            }

        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(
            JSON.stringify({
                message: 'fetched',
                status: 200,
                // data: tempData,
                data: tempData.slice(calculate().first, calculate().second),
                headers: headers,
                current_page: currentPage,
                total_page: Math.ceil(tempData.length / perPage),
                tatal_data_len:tempData.length
            })
        );
    } catch (error) {
        console.log(error, "error")
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

    await getTableData(req, res);


}
