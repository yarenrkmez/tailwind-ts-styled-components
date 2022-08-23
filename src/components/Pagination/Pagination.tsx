import React from 'react';
import { usePagination, DOTS } from '../../hooks/usePagination';
import tw, { styled, TwStyle } from 'twin.macro';

type Props = {
    onPageChange: (val: number | string) => void,
    totalCount: number,
    siblingCount?: number,
    currentPage: number,
    pageSize: number,
    className: string
}

const Pagination = (props: Props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || (paginationRange as Array<any>).length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange![paginationRange!.length - 1];


    return (
        <Container>
            {currentPage !== 1 &&
                <Arrow onClick={onPrevious}>
                    <span tw="sr-only">Previous</span>
                    <svg aria-hidden="true" tw="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                </Arrow>}


            {paginationRange!.map(pageNumber => {

                if (pageNumber === DOTS) {
                    return <li className="pagination-item dots">{'. . .'}</li>;
                }

                return (

                    <Item
                        isActive={pageNumber === currentPage}
                        onClick={() => onPageChange(pageNumber!)}
                    >
                        {pageNumber}

                    </Item>

                );
            })}
            <Arrow
                onClick={onNext}
                disabled={currentPage === lastPage}>
                <span tw="sr-only">Next</span>
                <svg aria-hidden="true" tw="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
            </Arrow>
        </Container>
    );
};
const Container = tw.ul`inline-flex items-center space-x-3.5`;
const Arrow = tw.button`block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer`;

const Item = styled.li(({ isActive }: { isActive: boolean }) => [
    isActive ? tw`z-10 py-2 px-3 leading-tight text-black bg-[#F3F3F3] border rounded-lg border-color[#D9D9D9] cursor-pointer`
        : tw`py-2 px-3 leading-tight text-gray-500 bg-white border rounded-lg border-color[#D9D9D9] hover:bg-gray-100 hover:text-gray-700 cursor-pointer`
]);

export default Pagination