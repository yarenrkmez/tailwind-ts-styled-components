import React from 'react'
import tw from 'twin.macro'

type Props = {}

const table = (props: Props) => {
    const Container = tw.div`flex bg-red-600`;
    return (
        <Container>
            table
        </Container>
    )
}

export default table