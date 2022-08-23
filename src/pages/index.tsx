import React from 'react';
import { NextPage } from 'next';
import tw, { styled, TwStyle } from 'twin.macro';

import Layout from '@/components/Layout';


const IndexPage: NextPage = () => {

  return (
    <Layout title="Home | Tailwind + Styled Components + TypeScript Example">
      <Container>
        <div tw="text-xl space-y-4 md:space-x-4">
          <Link color="blue" href="/table">
            Table
          </Link>
          <Link color="blue" href="/search-product">
            Search Product
          </Link>
        </div>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  ${tw`absolute inset-0 w-full h-screen flex flex-col justify-center items-center`}
`;

const linkStyles: Record<string, TwStyle> = {
  blue: tw`text-blue-500 hover:text-blue-700`,
};

const Link = styled.a(({ color }) => [
  tw`block md:inline font-semibold transition-colors duration-300`,
  color && linkStyles[color]
]);

export default IndexPage;
