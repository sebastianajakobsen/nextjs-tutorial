import React from 'react';
import {Post} from "../api/post";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";


interface Props {
    post:Post,
    comments:Comment[]
}

interface Comment {
    postId:number,
    id:number,
    name:string,
    email:string,
    body:string,
}

const Id: React.FC<Props> = ({post, comments}) => {

    const router = useRouter()

    return (
        <div>
            <button onClick={() => router.push('/')}>Back</button>
            <h1 className="text-lg font-medium my-3" >{post.title}</h1>

            {
                comments.map((comment, index) => (
                    <div key={index}>
                        <div className="font-medium mt-3">
                            {comment.name} by: <span className="italic">{comment.email}</span>
                        </div>
                        <div>
                            {comment.body}
                        </div>
                    </div>
                ))
            }

        </div>
    );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
    // Fetch data from external API
    const resPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.query.id}`)
    const post = await resPost.json()

    const resComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.query.id}/comments`)
    const comments = await resComments.json()
    // Pass data to the page via props
    return { props:
            {
                post,
                comments
            }
    }
}



export default Id