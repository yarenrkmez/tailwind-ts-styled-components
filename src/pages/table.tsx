import Table from '@/components/Table/Table';
import { TableItem } from '@/type';
import { GetServerSideProps } from 'next';
import React from 'react'
import tw from 'twin.macro';

type TableData = {
    message: string,
    status: number,
    data: Array<TableItem>,
    headers: Array<string>,
    current_page: number,
    total_page: number,
    tatal_data_len: number
}
type Props = {
    tableData: TableData
}

const table = ({ tableData }: Props) => {

    return (
        <Container>
            <Table
                headers={tableData.headers}
                data={tableData.data}
                pagination={{
                    pageSizes: pageSizes,
                    totalCount: tableData.tatal_data_len
                }}
            />
        </Container>
    )
}
const Container = tw.div`flex`;
const pageSizes = [
    { value: 25, label: 25, isDefault: true },
    { value: 30, label: 30 }
]
export default table

export const getServerSideProps: GetServerSideProps = async (context) => {
    let tableData: any;
    const page = context?.query?.page;
    const pageSize = context?.query?.page_size;

    const res = await fetch(`http://${context?.req?.headers?.host}/api/all-table-data?page=${page || 1}+${pageSize ? `&page_size=${pageSize}` : ''}`);

    if (res.status !== 200) {
        return {
            notFound: true,
        };
    } else {
        tableData = await res.json();
    }

    return {
        props: {
            tableData
        },
    };
};
