import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate} from "react-router-dom";
import DataContext from "../context/DataContext";
import {format} from 'date-fns';
import api from '../api/posts';

const EditPost = () => {
    const [editBody, setEditBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const {posts, setPosts} = useContext(DataContext);
    
    //bringing the url parameter
    const {id } = useParams();

    //find the current post by its id
    const post = posts.find(post=>(post.id).toString() === id);
    
    //setting the navigation for user to be redirected
    const navigate = useNavigate();

    const handleEdit = async (id)=>{
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = {id, title: editTitle, datetime, body: editBody};
        try{
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPosts(posts.map((post)=>{
                return (post.id === id ? {...response.data} : post);
            }));
            setEditTitle('');
            setEditBody('');
            navigate('/');
        }catch(err){
            console.log(`Error: ${err.message}`)
        }
    }

    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditBody, setEditTitle]);

    return (
        <main className="NewPost">
            {editTitle &&
            <>
                <h2>Edit Post</h2>
                <form className="newPostForm" onSubmit={(e)=>e.preventDefault()}>
                    <label htmlFor="postTitle">Title:</label>
                    <input 
                        id="postTitle"
                        type="text"
                        required
                        value={editTitle}
                        onChange={(e)=>setEditTitle(e.target.value)}
                    />
                    <label htmlFor="postBody">Body:</label>
                    <textarea 
                        id="postBody"
                        required
                        value={editBody}
                        onChange={(e)=>setEditBody(e.target.value)}
                    />
                    <button type="submit" onClick={()=>handleEdit(post.id)}>Submit</button>
                </form>
            </>
        }
        {!editTitle &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>
                                Visit Our Homepage
                            </Link>
                        </p>
                    </>
        }
    </main>
    )
}

export default EditPost