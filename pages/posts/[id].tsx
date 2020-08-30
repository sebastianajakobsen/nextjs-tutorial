import React from 'react';
import {Post} from "../api/post";
import {GetServerSideProps} from "next";

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
    return (
        <div>
            {post.title}

            {
                comments.map(comment => (
                    <div>
                        <div>
                            {comment.name}
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