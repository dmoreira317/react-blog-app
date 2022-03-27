import Header from "./layout/Header";
import Nav from "./layout/Nav";
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/PostPage";
import About from "./pages/About";
import Missing from "./pages/Missing"
import EditPost from "./pages/EditPost";
import {Route, Routes} from 'react-router-dom';
import {useEffect} from 'react';
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions } from "easy-peasy";


function App() {

    const setPosts = useStoreActions((actions)=>actions.setPosts);
    
    //useAxiosFetch hook
    const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');
      
    //Set axiosFetch hook data to posts state
    useEffect(()=>{
        setPosts(data);
    },[data, setPosts]);

  return (
    <div className="App">
      <Header title="ReactJS Blog" />
      {/* <DataProvider> */}
        <Nav />
        <Routes>
          <Route path="/" element={<Home isLoading={isLoading} fetchError={fetchError} />} />
          <Route path="post" element={<NewPost />} />
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="post/:id" element={<PostPage/>} />
          <Route path="*" element={<Missing />} />
          <Route path="about" element={<About />} />  
        </Routes>
      {/* </DataProvider> */}
      <Footer />
    </div>
  );
}

export default App;
