import React, {useEffect, useState} from 'react';
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import axios from 'axios';

interface Props {
    post:Post,
}

interface Comment {
    postId:number,
    id:number,
    name:string,
    email:string,
    body:string,
}

interface Post {
    id:number,
    userId:number,
    title:string,
    body:string
}

const Post: React.FC<Props> = ({post}) => {

    const router = useRouter()

    const [comments, setComments] = useState<Comment[]>([])


    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
            .then(res => {
                setComments(res.data)
            })
    }, [post])

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

    // Pass data to the page via props
    return { props:
            {
                post
            }
    }
}



export default Post