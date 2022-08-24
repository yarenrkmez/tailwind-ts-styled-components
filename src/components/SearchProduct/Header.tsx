import React from 'react';
import tw, { styled, TwStyle } from 'twin.macro';

import Hb from '../svg/hb';

type Props = {
    callbackSearchText: (value: string) => void;
}

const Header = ({ callbackSearchText }: Props) => {
    return (
        <Container>
            <Hb />
            <Form>
                <label htmlFor="simple-search" tw="sr-only">Search</label>
                <InputContainer>
                    <Icon>
                        <svg aria-hidden="true" tw="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </Icon>
                    <Input
                        type="text"
                        id="simple-search"
                        placeholder="Search"
                        required
                        onChange={(e) => callbackSearchText(e.target.value)}
                    />
                </InputContainer>
            </Form>
            <MyCart>
                <span>Sepetim</span>
            </MyCart>
        </Container>
    )
}

const Container = tw.div`flex flex-row w-full justify-around py-8 border-b`;
const Input = tw.input`border border-gray-300 text-gray-900 bg-[#EEEEEE] text-sm rounded-[100px] block w-full px-10 py-2.5`;
const Icon = tw.div`flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none`;
const Form = tw.div`flex items-center w-6/12`;
const InputContainer = tw.div`relative w-full`;

const MyCart = tw.button`border rounded border-[#B0B0B0] 
[> span]:line-height[143%] text-[17px] text-[#B0B0B0] p-2`;

export default Header