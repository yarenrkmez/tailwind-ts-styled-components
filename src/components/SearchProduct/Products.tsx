/** Dependencies */
import React, { useState } from 'react';
import tw, { styled, TwStyle } from 'twin.macro';

/** Type */
import { Product as ProductType } from '@/type';

/**Components */
import Product from './Product';
import Pagination from '../Pagination/Pagination';

type Props = {
    products: Array<ProductType>;
    pagination: {
        totalCount: number,
        pageSize: number
    }
}

const Products = ({ products, pagination }: Props) => {
    const { pageSize, totalCount } = pagination;
    const [currentPage, setCurrentPage] = useState(1);

    const calculate = () => {
        let added2 = currentPage !== 1 ? 1 : 0;
        let added1 = currentPage !== 1 && currentPage !== 2 ? 1 : 0;


        return {
            first: ((currentPage - 1) * pageSize) + added1,
            second: (currentPage * pageSize) + added2
        }

    }

    return (
        <Container>

            <Body>
                {products.slice(calculate().first, calculate().second).map((item, index) =>
                    <React.Fragment key={`product-${index}`}>
                        <Product
                            product={item}
                        />
                    </React.Fragment>

                )}
            </Body>
            {totalCount > 9 && <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={page => setCurrentPage(page as number)}
            />}
        </Container>
    )
}
const Container = tw.div`flex flex-col justify-between`;
const Body = tw.div` flex m-5 flex-wrap gap-2.5 column-gap[.8125rem]`;

export default Products