// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Community is ERC721 {
    uint256 private tokenIdCounter;
    address public admin;

    struct Page {
        string owner;
        string content;
        uint256[] postIds;
        string uniqueCode;
        string avatar;
        string backgroundImage;
        string backgroundAudio;
    }

    struct Post {
        address author;
        string contentType; // "text", "video", "audio", etc.
        string content;
    }

    mapping(address => uint256) public pageIds;
    mapping(uint256 => Page) public pages;
    mapping(uint256 => Post) public posts;

    event PageCreated(address indexed owner, uint256 pageId, string content, string uniqueCode);
    event PostCreated(address indexed author, uint256 indexed pageId, uint256 postId, string contentType, string content);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    constructor() ERC721("CommunityPage", "CPAGE") {
        admin = msg.sender;
        tokenIdCounter = 1;
    }

    function createPage(string memory _content) external {
        require(pageIds[msg.sender] == 0, "Page already exists for the user");

        Page storage newPage = pages[tokenIdCounter];
        newPage.owner = "User"; // You can replace it with user input or integrate with a decentralized identity solution
        newPage.content = _content;

        // Generate a unique code (replace with your own logic)
        newPage.uniqueCode = generateUniqueCode();

        pageIds[msg.sender] = tokenIdCounter;
        _safeMint(msg.sender, tokenIdCounter);

        emit PageCreated(msg.sender, tokenIdCounter, _content, newPage.uniqueCode);
        tokenIdCounter++;
    }

    function generateUniqueCode() internal view returns (string memory) {
        // Implement your own logic to generate a unique code
        // This is just an example; you might want to use a hash function or another mechanism
        return string(abi.encodePacked("CODE", tokenIdCounter));
    }

    function createPost(uint256 _pageId, string memory _contentType, string memory _content) external {
        require(_pageId > 0 && _pageId <= tokenIdCounter, "Invalid pageId");
        require(ownerOf(_pageId) == msg.sender, "You are not the owner of this page");

        Post storage newPost = posts[tokenIdCounter];
        newPost.author = msg.sender;
        newPost.contentType = _contentType;
        newPost.content = _content;

        pages[_pageId].postIds.push(tokenIdCounter);

        emit PostCreated(msg.sender, _pageId, tokenIdCounter, _contentType, _content);
        tokenIdCounter++;
    }

    function getPagePostIds(uint256 _pageId) external view returns (uint256[] memory) {
        return pages[_pageId].postIds;
    }

    function getPostDetails(uint256 _postId) external view returns (address, string memory, string memory) {
        Post storage post = posts[_postId];
        return (post.author, post.contentType, post.content);
    }

    function getPages() external view returns (Page[] memory) {
        Page[] memory allPages = new Page[](tokenIdCounter - 1);
        for (uint256 i = 1; i < tokenIdCounter; i++) {
            allPages[i - 1] = pages[i];
        }
        return allPages;
    }

    function setAdmin(address _admin) external onlyAdmin {
        admin = _admin;
    }

    function setAvatar(uint256 _pageId, string memory _avatar) external {
        require(_pageId > 0 && _pageId <= tokenIdCounter, "Invalid pageId");
        require(ownerOf(_pageId) == msg.sender, "You are not the owner of this page");

        pages[_pageId].avatar = _avatar;
    }

    function getAvatar(uint256 _pageId) external view returns (string memory) {
        require(_pageId > 0 && _pageId <= tokenIdCounter, "Invalid pageId");
        return pages[_pageId].avatar;
    }

    function setBackgroundImage(uint256 _pageId, string memory _backgroundImage) external {
        require(_pageId > 0 && _pageId <= tokenIdCounter, "Invalid pageId");
        require(ownerOf(_pageId) == msg.sender, "You are not the owner of this page");

        pages[_pageId].backgroundImage = _backgroundImage;
    }

    function getBackgroundImage(uint256 _pageId) external view returns (string memory) {
        require(_pageId > 0 && _pageId <= tokenIdCounter, "Invalid pageId");
        return pages[_pageId].backgroundImage;
    }

    function setBackgroundAudio(uint256 _pageId, string memory _backgroundAudio) external {
        require(_pageId > 0 && _pageId <= tokenIdCounter, "Invalid pageId");
        require(ownerOf(_pageId) == msg.sender, "You are not the owner of this page");

        pages[_pageId].backgroundAudio = _backgroundAudio;
    }

    function getBackgroundAudio(uint256 _pageId) external view returns (string memory) {
        require(_pageId > 0 && _pageId <= tokenIdCounter, "Invalid pageId");
        return pages[_pageId].backgroundAudio;
    }
}
