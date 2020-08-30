import React from 'react';
import Link from "next/link";
import {Post} from "./api/post";
import {GetServerSideProps} from "next";


export interface Props {
    posts:Array<Post>
}


const Index:React.FC<Props> = ({posts}) => {

    return (
        <div>
            {
                posts.map(post => (
                    <div key={post.id}>
                        <Link href="/posts/[id]" as={`/posts/${post.id}`}>
                            <a>{post.title}</a>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    // Fetch data from external API
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const posts = await res.json()
    // Pass data to the page via props
    return { props: { posts } }
}



export default Index