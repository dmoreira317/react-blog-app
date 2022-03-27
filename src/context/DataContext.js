import { createContext, useEffect, useState } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

//create the context instance
const DataContext = createContext();

export const DataProvider = ({children})=>{
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    //useAxiosFetch hook
    const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');
    
    //Set axiosFetch hook data to posts state
    useEffect(()=>{
        setPosts(data);
    },[data]);

    useEffect(()=>{
        const filteredresults = posts.filter(post=>
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        ||
        ((post.title).toLowerCase()).includes(search.toLowerCase()))

        setSearchResults(filteredresults.reverse());
    },[posts, search]);

    return (
        <DataContext.Provider value={{
            search, setSearch,
            searchResults, fetchError, isLoading,
            posts, setPosts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;