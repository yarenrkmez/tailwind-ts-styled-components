
import Products from '@/components/SearchProduct/Products';
import { Product as ProductType } from '@/type';
import { GetServerSideProps } from 'next';
import React from 'react'

import tw, { styled, TwStyle } from 'twin.macro';

type Props = {
    products: { message: string, status: number, data: Array<ProductType> | undefined }
}

const searchProduct = ({ products }: Props) => {

    if (products.status !== 200) return <p>Hata</p>

    return (
        <Container>
            <Body>
                {products?.data && <Products
                    products={products.data}
                    pagination={{
                        pageSize: 8,
                        totalCount: products.data?.length!
                    }}
                />}
            </Body>



        </Container>
    )
}
const Container = tw.div`flex flex-col justify-between`;
const Body = tw.div` flex m-5 flex-wrap gap-2.5 column-gap[.8125rem]`;

export default searchProduct

export const getServerSideProps: GetServerSideProps = async (context) => {
    let products: any;

    const res = await fetch(`http://${context?.req?.headers?.host}/api/product-search`);

    if (res.status !== 200) {
        return {
            notFound: true,
        };
    } else {
        products = await res.json();
    }

    return {
        props: {
            products
        },
    };
};
