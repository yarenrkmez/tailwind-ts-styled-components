import Table from '@/components/Table/Table';
import { TableItem } from '@/type';
import { GetServerSideProps } from 'next';
import React from 'react'
import tw from 'twin.macro';

type TableData = {
    message: string,
    status: number,
    data: Array<TableItem>,
    headers: Array<string>
}
type Props = {
    tableData: TableData
}

const table = ({ tableData }: Props) => {
    const Container = tw.div`flex`;
    return (
        <Container>
            <Table
                headers={tableData.headers}
                data={tableData.data}
            />
        </Container>
    )
}

export default table

export const getServerSideProps: GetServerSideProps = async (context) => {
    let tableData: any;

    const res = await fetch(`http://${context?.req?.headers?.host}/api/all-table-data`);

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
