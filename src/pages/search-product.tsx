
import Header from '@/components/SearchProduct/Header';
import Products from '@/components/SearchProduct/Products';
import SideBar from '@/components/SearchProduct/SideBar';
import { searchDataTypeEnum, sortingEnum } from '@/enum/serarchDataEnum';
import { Product as ProductType } from '@/type';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';

import tw, { styled, TwStyle } from 'twin.macro';

type GetProducts = {
    message: string,
    status: number,
    data: Array<ProductType> | undefined,
    brands: Array<string>,
    groupedBrands: object
}

type Props = {
    products: GetProducts
}



const searchProduct = ({ products }: Props) => {
    const [searchText, setSearchText] = useState('');
    const [filterData, setFilterData] = useState<{ sorting: number, brand: string }>();

    const items = [
        { title: 'Sıralama', labels: ['En Düşük Fiyat', 'En Yüksek Fiyat'], type: searchDataTypeEnum.sorting },
        { title: 'Marka', labels: products.brands, type: searchDataTypeEnum.filtered }
    ];

    useEffect(() => {
        if (filterData?.brand || filterData?.sorting || searchText.length > 2) [
            Router.push({
                pathname: '/search-product',
                query: { text: searchText, sorting: filterData?.sorting, brand: filterData?.brand },
            })
        ]

    }, [filterData, searchText]);

    if (products.status !== 200) return <p>Hata</p>

    return (
        <Container>

            <Header
                callbackSearchText={(val) => setSearchText(val)}
            />

            <Body tw="flex flex-row">
                <SideBar
                    items={items}
                    callbackFilter={(data) => {
                        setFilterData(data);
                    }}
                    searchedValue={searchText}
                />
                {products?.data && <Products
                    products={products?.data}
                    pagination={{
                        pageSize: 8,
                        totalCount: products?.data?.length!
                    }}
                />}
            </Body>



        </Container>
    )
}
const Container = tw.div`flex flex-col justify-between`;
const Body = tw.div` flex m-5 flex-nowrap gap-2.5 column-gap[.8125rem]`;

export default searchProduct

export const getServerSideProps: GetServerSideProps = async (context) => {
    let products: any;
    const { text, sorting, brand } = context.query;

    if (text || sorting || brand) {
        const res = await fetch(`http://${context?.req?.headers?.host}/api/product-search`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text, sorting, brand }),
            }
        );

        if (res.status !== 200) {
            return {
                notFound: true,
            };
        } else {
            products = await res.json();
        }
    } else {
        const res = await fetch(`http://${context?.req?.headers?.host}/api/all-products`);

        if (res.status !== 200) {
            return {
                notFound: true,
            };
        } else {
            products = await res.json();
        }

    }



    return {
        props: {
            products
        },
    };
};
