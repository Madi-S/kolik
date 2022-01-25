import React from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native'

const PostLoader = props => (
    <ContentLoader
        // speed={2}
        width={450}
        height={400}
        viewBox='0 0 450 400'
        backgroundColor='#f0f0f0'
        foregroundColor='#dedede'
        {...props}
    >
        <Rect x='34' y='292' rx='4' ry='4' width='271' height='9' />
        <Rect x='34' y='272' rx='3' ry='3' width='119' height='8' />
        <Rect x='34' y='77' rx='10' ry='10' width='320' height='180' />
    </ContentLoader>
)

export default PostLoader
