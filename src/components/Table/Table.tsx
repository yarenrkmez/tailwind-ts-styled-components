import { TableItem } from '@/type';
import React from 'react'
import tw from 'twin.macro';

type Props = {
    headers: Array<string>;
    data: Array<TableItem>;
}

const Table = ({ headers, data }: Props) => {

    const getDataHeaderList = () => {
        return Object.keys(data?.[0] || {});
    };
    // const calculate = () => {
    //     let added2 = currentPage !== 1 ? 1 : 0;
    //     let added1 = currentPage !== 1 && currentPage !== 2 ? 1 : 0;

    //     return {
    //         first: isServerSide() ? 0 : ((currentPage - 1) * pageSize) + added1,
    //         second: isServerSide() ? defaultPageSize : (currentPage * pageSize) + added2
    //     }

    // }

    // const rowHeader = () => {
    //     return (
    //         <tr>
    //             {getDataHeaderList()?.map((item, index) =>
    //                 <th><div className={classnames({ "resizable": resizableIndex?.includes(index) })}>{item}</div></th>
    //             )}
    //         </tr>
    //     )
    // };

    const rowHeader = () => {
        return (
            <thead>
                <tr>
                    {headers.map((item, index) =>
                        <Th key={`header-row-${index}`}>
                            {item}
                        </Th>
                    )}
                </tr>
            </thead>
        )
    }

    const rowBody = () => {
        return (
            <tbody>

                {data.map((item: any) =>
                    <tr>
                        {getDataHeaderList().map((key, index) =>
                            <Td key={`row-body-${index}`}>
                                {item[key]}
                            </Td>
                        )}
                    </tr>
                )}

            </tbody>
        )
    }

    return (
        <table tw="border-collapse border border-blue-400">
            {rowHeader()}
            {rowBody()}
        </table>
    )
}

const Th = tw.th`border border-blue-300`;
const Td = tw.td`border border-blue-300`;
export default Table