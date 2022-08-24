import { searchDataTypeEnum } from '@/enum/serarchDataEnum';
import React, { useState } from 'react'
import tw, { styled, TwStyle } from 'twin.macro';

type Item = {
    title: string,
    labels: Array<string>,
    type: number
}

type Props = {
    items: Array<Item>;
    callbackFilter: (data: { sorting: number, brand: string }) => void;
    searchedValue: string;
}

const SideBar = ({ items, callbackFilter, searchedValue }: Props) => {
    const [selectedBrands, setSelectedBrands] = useState('');
    const [sorting, setSorting] = useState<number>();

    const setStateHelper = (type: any, data: any) => {
        switch (type) {
            case searchDataTypeEnum.sorting:
                setSorting(data);
                callbackFilter({ sorting: data, brand: selectedBrands || '' });
                break;
            case searchDataTypeEnum.filtered:
                setSelectedBrands(data);
                callbackFilter({ sorting: sorting || -1, brand: data });
                break;
            default:
                break;
        }
    }

    const SideBarItem = (element: Item) => {
        return (
            <Column tw="mb-16">

                <ListHeader>{element.title}</ListHeader>

                {element.labels.map((e, index) =>
                    <ListItem
                        isActive={element.type === searchDataTypeEnum.sorting ? sorting === index + 1 : selectedBrands === e}
                        onClick={() => setStateHelper(element.type, element.type === searchDataTypeEnum.sorting ? index + 1 : e)}>
                        {e}
                    </ListItem>

                )}

            </Column>)
    }

    return (

        <aside tw="w-full max-w-[300px] flex flex-col items-end" aria-label="Sidebar">

            <Column>
                <Title>Cep Telefonları</Title>
                {searchedValue && <Row tw="mt-3 text-center items-center whitespace-nowrap">
                    <span tw="text-[15px] line-height[100%] text-[#B0B0B0]">
                        Aranan Kelime:
                    </span>
                    <span tw="text-black ml-1">{searchedValue}</span>
                </Row>}

            </Column>

            <div tw="overflow-y-auto py-4 px-4 flex justify-end">

                <Filter>
                    {items.map(e =>
                        SideBarItem(e)
                    )}
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