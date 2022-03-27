import Header from "./layout/Header";
import Nav from "./layout/Nav";
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/PostPage";
import About from "./pages/About";
import Missing from "./pages/Missing"
import EditPost from "./pages/EditPost";
import { DataProvider } from "./context/DataContext";
import {Route, Routes} from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Header title="ReactJS Blog" />
      <DataProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="post" element={<NewPost />} />
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="post/:id" element={<PostPage/>} />
          <Route path="*" element={<Missing />} />
          <Route path="about" element={<About />} />  
        </Routes>
      </DataProvider>
      <Footer />
    </div>
  );
}

export default App;
