import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractABI from './contractABI.json';

const SocMed = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');

  useEffect(() => {
    const connectToProvider = async () => {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
          const contractAddress = '0x486927bA1C886a5F491e51545bd3B4da2F2BE56f';
          const contract = new web3.eth.Contract(contractABI, contractAddress);
          setWeb3(web3);
          setContract(contract);
        } catch (error) {
          console.error(error);
        }
      }
    };

    connectToProvider();
  }, []);

  const handleCreatePost = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.createPost(newPostContent).send({ from: accounts[0] });
      setNewPostContent('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateComment = async (postId) => {
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.createComment(postId, newCommentContent).send({ from: accounts[0] });
      setNewCommentContent('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setNewPostContent(event.target.value);
  };

  const handleCommentInputChange = (event) => {
    setNewCommentContent(event.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (contract) {
        const postCount = await contract.methods.postCount().call();
        const posts = [];

        for (let i = 1; i <= postCount; i++) {
          const post = await contract.methods.posts(i).call();
          const commentCount = await contract.methods.getCommentCount(post.postId).call();
          const comments = [];

          for (let j = 1; j <= commentCount; j++) {
            const comment = await contract.methods.getComment(post.postId, j).call();
            comments.push(comment);
          }

          posts.push({
            ...post,
            comments,
          });
        }

        setPosts(posts);
      }
    };

    fetchPosts();
  }, [contract]);

  return (
    <div>
      <h1>Social Media Dapp</h1>

      <div>
        <input type="text" value={newPostContent} onChange={handleInputChange} />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>

      <div>
        {posts.map((post) => (
          <div key={post.postId}>
            <h3>Post #{post.postId}</h3>
            <p>Author: {post.author}</p>
            <p>Content: {post.content}</p>

            <div>
              <input type="text" value={newCommentContent} onChange={handleCommentInputChange} />
              <button onClick={() => handleCreateComment(post.postId)}>Add Comment</button>
            </div>

            <div>
              {post.comments.map((comment) => (
                <div key={comment.commentId}>
                  <p>Comment #{comment.commentId}</p>
                  <p>Author: {comment.author}</p>
                  <p>Content: {comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocMed;