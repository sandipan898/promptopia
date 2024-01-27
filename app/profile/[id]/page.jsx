"use client";

import Profile from '@components/Profile';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'

const UserProfile = ({ params }) => {
    const [posts, setPosts] = useState([]);
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");

    useEffect(() => {
        const fetchPosts = async() => {
          const response = await fetch(`/api/users/${params.id}/posts`);
          const data = await response.json();
          console.log(data);
          setPosts(data);
        }
    
        if(params.id) fetchPosts();
      }, [params.id])

  return (
    <Profile
        name={userName}
        desc={`Welcome to ${userName}'s profile page`}
        data={posts}
    />
  )
}

export default UserProfile