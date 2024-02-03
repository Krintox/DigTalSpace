// tests/DigitalSpace.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DigitalSpace", function () {
  let DigitalSpace;
  let digitalSpace;
  let owner;
  let user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    // Deploy the DigitalSpace contract
    DigitalSpace = await ethers.getContractFactory("DigitalSpace");
    digitalSpace = await DigitalSpace.deploy();
    await digitalSpace.connect(owner).deployed();

    // Set up digital space for the user
    await digitalSpace.connect(user).setAvatar("UserAvatar");
    await digitalSpace.connect(user).setBackground("Blue", "BackgroundAudio");
  });

  it("should connect to digital space", async () => {
    await expect(digitalSpace.connect(user).connectToDigitalSpace())
      .to.emit(digitalSpace, "ConnectedToDigitalSpace")
      .withArgs(user.address);
  });

  it("should disconnect from digital space", async () => {
    await expect(digitalSpace.connect(user).disconnectFromDigitalSpace())
      .to.emit(digitalSpace, "DisconnectedFromDigitalSpace")
      .withArgs(user.address);
  });

  it("should post video", async () => {
    const videoHash = "VideoHash";
    await expect(digitalSpace.connect(user).postVideo(videoHash))
      .to.emit(digitalSpace, "VideoPosted")
      .withArgs(user.address, videoHash);
  });

  it("should post audio", async () => {
    const audioHash = "AudioHash";
    await expect(digitalSpace.connect(user).postAudio(audioHash))
      .to.emit(digitalSpace, "AudioPosted")
      .withArgs(user.address, audioHash);
  });

  it("should start and end event", async () => {
    await expect(digitalSpace.connect(owner).startEvent())
      .to.emit(digitalSpace, "EventStarted")
      .withArgs(owner.address);

    await expect(digitalSpace.connect(owner).endEvent())
      .to.emit(digitalSpace, "EventEnded")
      .withArgs(owner.address);
  });

  it("should set avatar", async () => {
    const newAvatar = "NewAvatar";
    await expect(digitalSpace.connect(user).setAvatar(newAvatar))
      .to.emit(digitalSpace, "AvatarSet")
      .withArgs(user.address, newAvatar);
  });

  it("should set background", async () => {
    const color = "Green";
    const audio = "NewBackgroundAudio";
    await expect(digitalSpace.connect(user).setBackground(color, audio))
      .to.emit(digitalSpace, "BackgroundSet")
      .withArgs(user.address, color, audio);
  });

  it("should invite people", async () => {
    const invitedUser = await ethers.getSigner();
    await expect(digitalSpace.connect(user).invitePeople(invitedUser.address))
      .to.emit(digitalSpace, "InvitedPeople")
      .withArgs(user.address, invitedUser.address);
  });

  it("should get videos", async () => {
    const videoHash = "VideoHash";
    await digitalSpace.connect(user).postVideo(videoHash);

    const videos = await digitalSpace.connect(user).getVideos();
    expect(videos).to.deep.equal([videoHash]);
  });

  it("should get audios", async () => {
    const audioHash = "AudioHash";
    await digitalSpace.connect(user).postAudio(audioHash);

    const audios = await digitalSpace.connect(user).getAudios();
    expect(audios).to.deep.equal([audioHash]);
  });

  it("should get background audio", async () => {
    const audio = "BackgroundAudio";
    await digitalSpace.connect(user).setBackground("Blue", audio);

    const backgroundAudio = await digitalSpace.connect(user).getBackgroundAudio();
    expect(backgroundAudio).to.equal(audio);
  });

  it("should get background color", async () => {
    const color = "Red";
    await digitalSpace.connect(user).setBackground(color, "BackgroundAudio");

    const backgroundColor = await digitalSpace.connect(user).getBackgroundColor();
    expect(backgroundColor).to.equal(color);
  });

  it("should get avatar", async () => {
    const avatar = "UserAvatar";
    const userAvatar = await digitalSpace.connect(user).getAvatar();
    expect(userAvatar).to.equal(avatar);
  });

  it("should get live video stream", async () => {
    const liveVideoStream = "LiveVideoStreamURL";
    await digitalSpace.connect(owner).startEvent();

    const userLiveVideoStream = await digitalSpace.connect(user).getLiveVideoStream();
    expect(userLiveVideoStream).to.equal(liveVideoStream);
  });

  it("should get posts", async () => {
    const videoHash = "VideoHash";
    const audioHash = "AudioHash";
    await digitalSpace.connect(user).postVideo(videoHash);
    await digitalSpace.connect(user).postAudio(audioHash);

    const posts = await digitalSpace.connect(user).getPosts();
    expect(posts).to.deep.equal([
      { content: videoHash, postType: "Video" },
      { content: audioHash, postType: "Audio" },
    ]);
  });
});
