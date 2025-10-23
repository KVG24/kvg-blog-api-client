import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DOMPurify from "dompurify";
import useFetch from "../hooks/useFetch";
import NavigationBar from "./NavigationBar";
import BlogPostSkeletonLoader from "./BlogPostSkeletonLoader";

const BLOG_API = import.meta.env.VITE_BLOG_API_URL;

export default function BlogPost() {
    const [commenterName, setCommenterName] = useState("");
    const [commentText, setCommentText] = useState("");
    const { id } = useParams();
    const { data, loading, error } = useFetch(`${BLOG_API}/posts/${id}`);

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        const commentData = { creator: commenterName, text: commentText };

        try {
            const response = await fetch(`${BLOG_API}/posts/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentData),
            });

            if (!response.ok) throw new Error("Failed to create comment");

            return await response.json();
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    function convertDate(date) {
        return new Date(date).toLocaleString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    }

    if (loading) return <BlogPostSkeletonLoader />;
    if (error) return <Error />;

    return (
        <>
            <NavigationBar />
            <Container>
                <TitleZone>
                    <h1>{data.title}</h1>
                </TitleZone>
                <TextZone>
                    <Dates>
                        <p>Posted: {convertDate(data.createdAt)}</p>
                        {data.updatedAt &&
                            data.updatedAt !== data.createdAt && (
                                <p>Updated: {convertDate(data.updatedAt)}</p>
                            )}
                    </Dates>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(data.content),
                        }}
                    />
                </TextZone>
                <CommentSection>
                    <CommentSubmitForm onSubmit={handleSubmitComment}>
                        <CommenterNameInput
                            type="text"
                            placeholder="Name"
                            value={commenterName}
                            onChange={(e) => setCommenterName(e.target.value)}
                        />
                        <CommentTextarea
                            value={commentText}
                            placeholder="Leave a comment here"
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <SubmitCommentBtn type="submit">
                            Submit
                        </SubmitCommentBtn>
                    </CommentSubmitForm>

                    <CommentsContainer>
                        {data?.comments?.length > 0 ? (
                            data.comments.map((comment) => (
                                <CommentBlock key={comment.id}>
                                    <p>
                                        <strong>{comment.creator}:</strong>
                                    </p>
                                    <CommentText>{comment.text}</CommentText>
                                    <CommentDate>
                                        {convertDate(comment.createdAt)}
                                    </CommentDate>
                                </CommentBlock>
                            ))
                        ) : (
                            <p>No comments yet</p>
                        )}
                    </CommentsContainer>
                </CommentSection>
            </Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`;

const Error = styled.p`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
`;

const TitleZone = styled.div`
    border-radius: 5px;
    width: 100%;
    background-color: #3d3d3d;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
`;

const Dates = styled.div`
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    position: relative;
    top: -70px;
`;

const TextZone = styled.div`
    padding: 1rem;
    max-width: 1000px;
    position: relative;
`;

const CommentSection = styled.div`
    padding: 1rem;
    border: 1px solid white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 800px;
`;

const CommentSubmitForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
`;

const SubmitCommentBtn = styled.button`
    border-radius: 5px;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
    background-color: #449b9b;
    color: black;
    transition: 0.1s all ease-in-out;

    &:hover {
        background-color: black;
        color: #449b9b;
    }
`;

const CommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const CommentBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px solid #747474;
    padding: 0.5rem;
    border-radius: 3px;
`;

const CommenterNameInput = styled.input`
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
`;

const CommentTextarea = styled.textarea`
    padding: 1rem;
    border-radius: 5px;
    width: 80%;
`;

const CommentText = styled.p`
    word-break: break-word;
`;

const CommentDate = styled.p`
    color: #919191;
    font-size: 0.8rem;
`;
