import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate, useParams } from 'react-router-dom';
import CommunityContract from './contractABI.json'; // Import your contract JSON

const CommunityPage = () => {
  const navigate = useNavigate();
  const { uniqueCode } = useParams();
  const [pageContract, setPageContract] = useState(null);
  const [pageId, setPageId] = useState(0);
  const [page, setPage] = useState({});
  const [avatar, setAvatar] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundAudio, setBackgroundAudio] = useState('');
  const [avatarInput, setAvatarInput] = useState('');
  const [backgroundImageInput, setBackgroundImageInput] = useState('');
  const [backgroundAudioInput, setBackgroundAudioInput] = useState('');
  const [contentType, setContentType] = useState('text'); // Default to text
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        // Connect to the Ethereum network
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Load the contract
        const contractAddress = '0xe26C4Af3d4b1aB0e7D8Db84AAb2701946ADB9Eb8'; // Replace with your contract address
        const communityContract = new ethers.Contract(contractAddress, CommunityContract, signer);

        // Get the pageId using the unique code
        const pageId = await communityContract.pageIds(signer.getAddress());
        setPageId(pageId);

        // Get the Page details
        const pageDetails = await communityContract.pages(pageId);
        setPage(pageDetails);

        // Get Avatar, Background Image, and Background Audio
        const avatar = await communityContract.getAvatar(pageId);
        setAvatar(avatar);

        const backgroundImage = await communityContract.getBackgroundImage(pageId);
        setBackgroundImage(backgroundImage);

        const backgroundAudio = await communityContract.getBackgroundAudio(pageId);
        setBackgroundAudio(backgroundAudio);

        // Get Posts for the current page
        const pagePostsIds = await communityContract.getPagePostIds(pageId);
        const posts = await Promise.all(pagePostsIds.map((postId) => communityContract.getPostDetails(postId)));
        setPosts(posts);

        setPageContract(communityContract);
      } catch (error) {
        console.error('Error initializing CommunityPage:', error);
      }
    };

    init();
  }, [navigate, uniqueCode]);

  const createPost = async (content) => {
    try {
      // Call the createPost function in the smart contract
      await pageContract.createPost(pageId, contentType, content);
      // Refresh the page after posting
      window.location.reload();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const setAvatarAndBackground = async () => {
    try {
      // Call the setAvatar and setBackgroundImage functions in the smart contract
      await pageContract.setAvatar(pageId, avatarInput);
      await pageContract.setBackgroundImage(pageId, backgroundImageInput);

      // Refresh the page after setting avatar and background
      window.location.reload();
    } catch (error) {
      console.error('Error setting avatar and background:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to your Community Page</h1>
      <p>Owner: {page.owner}</p>
      <p>Content: {page.content}</p>
      <p>Unique Code: {page.uniqueCode}</p>

      {/* Display Avatar, Background Image, Background Audio */}
      <img src={avatar} alt="Avatar" />
      <img src={backgroundImage} alt="Background Image" />
      <audio controls>
        <source src={backgroundAudio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <h2>Create a Post</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost(e.target.content.value);
        }}
      >
        <label>
          Content Type:
          <select
            name="contentType"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>
        </label>
        <br />
        <label>
          Content:
          {contentType === 'text' ? (
            <textarea name="content" />
          ) : contentType === 'video' ? (
            <input type="file" accept="video/*" capture="user" />
          ) : contentType === 'audio' ? (
            <input type="file" accept="audio/*" capture="user" />
          ) : null}
        </label>
        <br />
        <button type="submit">Create Post</button>
      </form>

      <h2>Set Avatar and Background</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setAvatarAndBackground();
        }}
      >
        <label>
          Avatar URL:
          <input
            type="text"
            value={avatarInput}
            onChange={(e) => setAvatarInput(e.target.value)}
          />
        </label>
        <br />
        <label>
          Background Image URL:
          <input
            type="text"
            value={backgroundImageInput}
            onChange={(e) => setBackgroundImageInput(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Set Avatar and Background</button>
      </form>

      <h2>Posts</h2>
      {posts.map((post, index) => (
        <div key={index}>
          <p>
            Author: <img src={avatar} alt="Author Avatar" style={{ height: '20px', width: '20px', borderRadius: '50%' }} /> {post[0]}
          </p>
          <p>Content Type: {post[1]}</p>
          <p>Content: {post[2]}</p>
        </div>
      ))}
    </div>
  );
};

export default CommunityPage;
