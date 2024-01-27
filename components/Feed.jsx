"use client";

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={() => handleTagClick(post.tag)}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const filterPostOnSearch = () => {
    const regex = new RegExp(searchText, "i");

    const postsAfterFilter = posts.filter(post => regex.test(post.creator.username) || regex.test(post.tag) || regex.test(post.prompt))
    setFilteredPosts(postsAfterFilter)
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
  }

  useEffect(() => {
    filterPostOnSearch();
  }, [searchText])

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch('api/prompt');
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    }

    fetchPosts();
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList 
        data={filteredPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed