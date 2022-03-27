import Header from "./layout/Header";
import Nav from "./layout/Nav";
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/PostPage";
import About from "./pages/About";
import Missing from "./pages/Missing"
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {format} from 'date-fns';
import api from './api/posts';
import EditPost from "./pages/EditPost";
import useWindowSize from "./hooks/useWindowSize";

function App() {

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editBody, setEditBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  
  //Replaces useHistory, used to take the user to another page.
  const navigate = useNavigate();

  //useWindowSize hook info
  const {width} = useWindowSize();

  useEffect(()=>{
    const fetchPosts =async ()=>{
      try{
        const response = await api.get('/posts');
        setPosts(response.data);
      }catch(err){
        if(err.response){
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }else{
          console.log(`Error: ${err.message}`)
        }
      }
    }
    fetchPosts();
  },[]);

  useEffect(()=>{
    const filteredresults = posts.filter(post=>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      ||
      ((post.title).toLowerCase()).includes(search.toLowerCase()))

      setSearchResults(filteredresults.reverse());
  },[posts, search]);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length -1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, datetime, body: postBody};
    
    try{
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    }catch (err){
      console.log(`Error: ${err.message}`)
    }
  }

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

  const handleDelete = async (id)=>{
    try{
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      navigate('/');
    }catch(err){
      console.log(`Error: ${err.message}`)
    }
  }

  return (
    <div className="App">
      <Header
        width={width}
        title="ReactJS Blog"
      />
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              posts={searchResults}
            />}
        />
        <Route 
          path="post" 
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              postBody={postBody}
              setPostTitle={setPostTitle}
              setPostBody={setPostBody}
            />}
        />
        <Route 
          path="edit/:id" 
          element={
            <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              editBody={editBody}
              setEditTitle={setEditTitle}
              setEditBody={setEditBody}
            />}
        />
        <Route 
          path="post/:id" 
          element={
            <PostPage
              posts={posts}
              handleDelete={handleDelete}
            />}
        />
        <Route 
          path="*" 
          element={
            <Missing
            />}
        />
        <Route 
          path="about" 
          element={
            <About
            />}
        />  
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
