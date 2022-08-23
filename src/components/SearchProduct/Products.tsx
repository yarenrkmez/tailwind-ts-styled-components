/** Dependencies */
import { Product as ProductType } from '@/type';
import React from 'react';
import Product from './Product';
import tw, { styled, TwStyle } from 'twin.macro';

type Props = {
    products: Array<ProductType>;
}

const Products = ({ products }: Props) => {
    return (
        <Container>

            <Body>
                {products.map((item, index) =>
                    <React.Fragment key={`product-${index}`}>
                        <Product
                            product={item}
                        />
                    </React.Fragment>

                )}
            </Body>

        </Container>
    )
}
const Container = tw.div`flex flex-col justify-between`;
const Body = tw.div` flex m-5 flex-wrap gap-2.5 column-gap[.8125rem]`;
export default Products