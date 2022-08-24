import { TableItem } from '@/type';
import React, { useEffect, useState } from 'react'
import tw from 'twin.macro';
import Pagination from '../Pagination/Pagination';
import Router from 'next/router';

type Pagination = {
    totalCount: number;
    pageSizes: Array<{ label: any, value: any, isDefault?: boolean }>
}

type Props = {
    headers: Array<string>;
    data: Array<TableItem>;
    pagination: Pagination;

}

const Table = ({ headers, data, pagination }: Props) => {
    const { totalCount, pageSizes } = pagination;

    const [currentPage, setCurrentPage] = useState(1);
    // const [pageSize, setPageSize] = useState(0);

    const defaultPageSize = pageSizes.find(item => item?.isDefault)?.value;


    useEffect(() => {

        Router.push({
            pathname: '/table',
            query: { page: currentPage },
        })

    }, [currentPage]);

    const getDataHeaderList = () => {
        return Object.keys(data?.[0] || {});
    };

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
        <Container>
            <table tw="border-collapse border border-blue-400">
                {rowHeader()}
                {rowBody()}
            </table>
            <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={defaultPageSize}
                onPageChange={page => setCurrentPage(page as number)}
            />
        </Container>

    )
}

const Th = tw.th`border border-blue-300`;
const Td = tw.td`border border-blue-300`;
const Container = tw.div`flex flex-col`;

export default Table