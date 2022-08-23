import React, { useState } from 'react'
import tw, { styled, TwStyle } from 'twin.macro';

type Props = {}

const SideBar = (props: Props) => {
    const [selectedBrands, setSelectedBrands] = useState('');
    const [sorting, setSorting] = useState<number>();

    return (

        <aside tw="w-full max-w-[300px] flex flex-col items-end" aria-label="Sidebar">

            <Column>
                <Title>Cep Telefonları</Title>
                <Row tw="mt-3 text-center items-center">
                    <span tw="text-[15px] line-height[100%] text-[#B0B0B0]">
                        Aranan Kelime:
                    </span>
                    <span tw="text-black ml-1">iphone 11</span>
                </Row>

            </Column>

            <div tw="overflow-y-auto py-4 px-4 flex justify-end">

                <Filter>
                    <Column tw="mb-16">
                        <ListHeader>Sıralama</ListHeader>

                        <ListItem
                            isActive={sorting === 1}
                            onClick={() => setSorting(1)}>
                            En Düşük Fiyat
                        </ListItem>

                        <ListItem
                            isActive={sorting === 2}
                            onClick={() => setSorting(2)}>
                            En Yüksek Fiyat
                        </ListItem>
                    </Column>

                    <Column tw="mt-4">
                        <ListHeader>Marka</ListHeader>

                        <ListItem>Apple</ListItem>
                        <ListItem>Apple</ListItem>
                    </Column>
                </Filter>

            </div>
        </aside>

    )
}
const Column = tw.div`flex flex-col`;
const Row = tw.div`flex flex-row`;
const Filter = tw.ul`flex flex-col items-start space-y-2`;
const Title = tw.h2`font-bold text-[28px] line-height[100%] text-[#484848]`;

const ListHeader = tw.li`font-medium text-base text-[#484848] mb-5`;
const ListItem = styled.li(({ isActive }: { isActive?: boolean }) => [
    isActive ? tw`font-normal text-[14px] line-height[24px] text-[#FF6000] cursor-pointer`
        : tw`font-normal text-[14px] line-height[24px] text-[#646464] cursor-pointer`
]);

export default SideBar