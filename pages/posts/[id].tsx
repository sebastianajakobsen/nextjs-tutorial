import React from 'react';
import {Post} from "../api/post";
import {GetServerSideProps} from "next";

interface Props {
    post:Post
}

const Id: React.FC<Props> = ({post}) => {
    return (
        <div>
            {post.title}
        </div>
    );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
    // Fetch data from external API
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.query.id}`)
    const post = await res.json()
    // Pass data to the page via props
    return { props: { post } }
}



export default Id