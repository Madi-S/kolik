import React from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native'

const PostLoader = props => (
    <ContentLoader
        // speed={2}
        width={450}
        height={300}
        viewBox='0 0 450 300'
        backgroundColor='#f0f0f0'
        foregroundColor='#dedede'
        {...props}
    >
        <Rect x='19' y='20' rx='10' ry='10' width='350' height='180' />
        <Rect x='109' y='210' rx='3' ry='3' width='170' height='10' />
        <Rect x='134' y='230' rx='3' ry='3' width='120' height='10' />
        <Rect x='22' y='250' rx='4' ry='4' width='344' height='40' />
    </ContentLoader>
)

export default PostLoader
