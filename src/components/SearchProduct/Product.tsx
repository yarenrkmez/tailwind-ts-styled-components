
import { Product as ProductType } from '@/type';
import React from 'react';
import tw, { styled, TwStyle } from 'twin.macro';

type Props = {
    product: ProductType
}

const Product = ({ product }: Props) => {
    return (
        <Container tw='max-w-[230px]'>
            <img
                src={product.image}
                tw="border rounded-lg border-color[#E5E5E5] p-1 h-[332px] object-cover mb-[13px]"
            />
            <Column tw="p-2.5">
                <Text className="header">
                    {product.name}
                </Text>

                <Row tw="mt-2.5">
                    <Text className="brand">
                        Marka:
                    </Text>
                    <Text className="header">{product.brand}</Text>
                </Row>

            </Column>

            <Column tw="p-2.5">
                <Text className="price">
                    {product?.discounted_price} TL
                </Text>

                {product?.discount_percentage && <Row>
                    <Text className="withoutDiscountPrice">
                        {product.price} TL
                    </Text>
                    <Text className="discountRate">{product.discount_percentage}% </Text>
                </Row>
                }
            </Column>

        </Container>
    )
}


const textStyles: Record<string, TwStyle> = {
    header: tw`text-xs text-[#484848]`,
    brand: tw`text-xs text-[#484848] font-bold`,
    price: tw`text-black font-bold`,
    withoutDiscountPrice: tw`text-xs text-[#9B9B9B] line-through`,
    discountRate: tw`text-xs text-[#F90000] font-bold ml-1`,

};

const Row = tw.div`flex flex-row`;
const Column = tw.div`flex flex-col`;
const Container = tw.div`flex flex-col justify-start items-start`;

const Text = styled.span(({ className }) => [
    className && textStyles[className]
]);

export default Product