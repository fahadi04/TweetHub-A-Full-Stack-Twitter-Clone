import React, { useState } from "react";
import RepeatOnTwoToneIcon from "@mui/icons-material/RepeatOnTwoTone";
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PremiumIcon from "@mui/icons-material/VerifiedTwoTone";
import Tooltip from "@mui/material/Tooltip";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddRemove from "@mui/icons-material/NoteAdd";
import Mute from "@mui/icons-material/VolumeOffSharp";
import BlockIcon from "@mui/icons-material/Block";
import Embed from "@mui/icons-material/CodeOffSharp";
import Report from "@mui/icons-material/Flag";
import ViewPostActivity from "@mui/icons-material/BarChart";
import RequestCommunityNote from "@mui/icons-material/Campaign";

import TweetHub_logo from "../../assets/Logo/TweetHub_logo.png";

import Reply from "@mui/icons-material/ChatBubbleOutlineSharp";
import Repost from "@mui/icons-material/RepeatSharp";
import Like from "@mui/icons-material/FavoriteBorderSharp";
import Favorite from "@mui/icons-material/Favorite";
import View from "@mui/icons-material/BarChartSharp";
import Bookmark from "@mui/icons-material/BookmarkBorderSharp";
import Share from "@mui/icons-material/IosShare";

function TweetCard() {
  const navigate = useNavigate();

  const [anchorElMore, setAnchorElMore] = useState(null);
  const openMore = Boolean(anchorElMore);

  const handleMoreClick = (event) => setAnchorElMore(event.currentTarget);
  const handleMoreClose = () => setAnchorElMore(null);

  const moreOptions = [
    {
      title: "Not Interested in this post",
      icon: <NotInterestedIcon />,
      path: "/not-interested",
    },
    { title: "Follow @username", icon: <PersonAddAltIcon />, path: "/follow" },
    { title: "Add/remove from Lists", icon: <AddRemove />, path: "/lists" },
    { title: "Mute", icon: <Mute />, path: "/mute" },
    { title: "Block @username", icon: <BlockIcon />, path: "/block" },
    {
      title: "View post activity",
      icon: <ViewPostActivity />,
      path: "/post-activity",
    },
    { title: "Embed post", icon: <Embed />, path: "/embed" },
    { title: "Report post", icon: <Report />, path: "/report" },
    {
      title: "Request community note",
      icon: <RequestCommunityNote />,
      path: "/community-note",
    },
  ];

  const handleOpenReplyModel = () => {
    console.log("Open Reply Model");
  };

  const handleCreateRetweet = () => {
    console.log("Create Retweet");
  };

  const handleOpenViewModel = () => {
    console.log("Open View Model");
  };

  const handleOpenBookmarkModel = () => {
    console.log("Open Bookmark Model");
  };

  const handleOpenShareModel = () => {
    console.log("Open Share Model");
  };

  const handleLikeTweet = () => {
    console.log("Like Tweet");
  };

  return (
    <div>
      <div>
        {/* <div className='flex items-center font-semibold text-gray-700 py-2'>
                    <RepeatIcon className='text-gray-500' />
                    <span className='ml-2'>Retweeted by User</span>
                </div> */}

        <div className="flex items-start space-x-4 p-4 border-b border-gray-600">
          <Avatar
            onClick={() => navigate(`/profile/${5}`)}
            className="cursor-pointer"
            alt="username"
            src="/path/to/avatar.jpg"
            sx={{ width: 30, height: 30 }}
          />
          <div className="w-full">
            <div className="flex flex-col items-start justify-between space-x-2">
              <div className="flex cursor-pointer justify-between space-x-2 items-start w-full">
                <div>
                  <span className="font-bold text-lg" sx={{ fontSize: 30 }}>
                    Username
                  </span>
                  <span
                    className="text-gray-500 font-semibold text-md"
                    sx={{ fontSize: 20 }}
                  >
                    @username
                  </span>
                  <span
                    className="text-gray-500 font-semibold text-md"
                    sx={{ fontSize: 20 }}
                  >
                    2m
                  </span>
                  <PremiumIcon
                    className="text-blue-500"
                    sx={{ fontSize: 25 }}
                  />
                </div>

                <div className="flex items-end justify-between">
                  <Tooltip title="More" arrow placement="bottom">
                    <div
                      onClick={handleMoreClick}
                      className="cursor-pointer flex justify-between ml-2  w-10 h-10 rounded-full text-gray-500 transition-all duration-200 hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0]"
                    >
                      <MoreHorizIcon sx={{ fontSize: 40 }} />
                    </div>
                  </Tooltip>

                  <Menu
                    anchorEl={anchorElMore}
                    open={openMore}
                    onClose={handleMoreClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    PaperProps={{
                      style: {
                        width: "400px",
                        borderRadius: "25px",
                        border: "2px solid #333",
                        boxShadow: "0px 8px 30px rgba(0,0,0,0.12)",
                        backgroundColor: "gray-800",
                        padding: "12px 8px",
                      },
                    }}
                  >
                    {moreOptions.map((item) => (
                      <React.Fragment key={item.title}>
                        <MenuItem
                          onClick={() => {
                            navigate(item.path);
                            handleMoreClose();
                          }}
                          sx={{
                            py: 2,
                            px: 3,
                            borderRadius: "12px",
                            margin: "4px 0",
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: "#1d9bf0",
                              fontSize: "28px",
                              minWidth: "50px",
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.title}
                            primaryTypographyProps={{
                              fontWeight: "bold",
                              fontSize: "17px",
                              color: "#fff",
                              letterSpacing: "0.5px",
                            }}
                          />
                        </MenuItem>
                        {item.title === "Bookmarks"}
                      </React.Fragment>
                    ))}
                  </Menu>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full px-4 pb-4 overflow-hidden">
              <div className="text-white text-[15px] leading-normal mb-3 break-words">
                <p>
                  This is a sample tweet content. It can be multiple lines long
                  and will display the text of the tweet.
                </p>
              </div>

              <div className="max-w-[90%] w-full">
                <div className="rounded-2xl border border-gray-800 overflow-hidden bg-black">
                  <img
                    src={TweetHub_logo}
                    alt="TweetHub Logo"
                    className="w-full h-auto max-h-[450px] object-contain block mx-auto"
                  />
                </div>
              </div>
            </div>
            <div className="py-5 flex flex-wrap justify-between itesm-center">
              <div className="space-x-3 flex items-center text-gray-600">
                <label>
                  <Reply
                    className="cursor-pointer"
                    onClick={handleOpenReplyModel}
                  />
                  <p>10</p>
                </label>
              </div>
              <div
                className={`${true ? "text-red-500" : "text-gray-600"} space-x-3 flex items-center `}
              >
                <label>
                  <Repost
                    className="cursor-pointer"
                    onClick={handleCreateRetweet}
                  />
                  <p>5</p>
                </label>
              </div>
              <div
                className={`${true ? "text-red-500" : "text-gray-600"}  space-x-3 flex items-center`}
              >
                <label>
                  {true ? (
                    <Favorite
                      onClick={handleLikeTweet}
                      className="cursor-pointer"
                    />
                  ) : (
                    <Like
                      onClick={handleLikeTweet}
                      className="cursor-pointer"
                    />
                  )}
                  <p>20</p>
                </label>
              </div>
              <div className="space-x-3 flex items-center text-gray-600">
                <label>
                  <View
                    className="cursor-pointer"
                    onClick={handleOpenViewModel}
                  />
                  <p>100</p>
                </label>
              </div>
              <div className="space-x-3 flex items-center text-gray-600">
                <label>
                  <Bookmark
                    className="cursor-pointer"
                    onClick={handleOpenBookmarkModel}
                  />
                  <p>15</p>
                </label>
              </div>
              <div>
                <label>
                  <Share
                    className="cursor-pointer"
                    onClick={handleOpenShareModel}
                  />
                  <p>8</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TweetCard;
