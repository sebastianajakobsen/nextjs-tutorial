import React from 'react';
import Link from "next/link";
import {Post} from "./api/post";


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

export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    const posts = await res.json()
    return {
        props: {
            posts,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every second
        revalidate: 10, // In seconds
    }
}



export default Index