import React, { useState } from "react";
import TweetHub_logo from "../../assets/Logo/TweetHub_logo.png";
import { navigationMenu } from "./NavigationMenu";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ListsIcon from "@mui/icons-material/ListAltTwoTone";
import CommunitieIcon from "@mui/icons-material/PeopleSharp";
import PremiumIcon from "@mui/icons-material/VerifiedTwoTone";
import CreateStudioIcon from "@mui/icons-material/RocketLaunchOutlined";
import BusinessIcon from "@mui/icons-material/Bolt";
import SettingsIcon from "@mui/icons-material/SettingsSharp";
import CreatorStudio from "@mui/icons-material/RocketLaunchOutlined";
import BookmarkIcon from "@mui/icons-material/BookmarkBorder";
import AdsIcon from "@mui/icons-material/Launch";
import ControlPointIcon from "@mui/icons-material/SettingsVoice";

function Navigation() {
  const navigate = useNavigate();

  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const openProfile = Boolean(anchorElProfile);

  const [anchorElMore, setAnchorElMore] = useState(null);
  const openMore = Boolean(anchorElMore);

  const handleMoreClick = (event) => setAnchorElMore(event.currentTarget);
  const handleMoreClose = () => setAnchorElMore(null);

  const handleProfileClick = (event) => setAnchorElProfile(event.currentTarget);
  const handleProfileClose = () => setAnchorElProfile(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const moreItems = [
    { title: "Lists", icon: <ListsIcon />, path: "/lists" },
    { title: "Communities", icon: <CommunitieIcon />, path: "/communities" },
    { title: "Premium", icon: <PremiumIcon />, path: "/premium" },
    { title: "Bookmarks", icon: <BookmarkIcon />, path: "/bookmarks" },
    {
      title: "Creator Studio",
      icon: <CreateStudioIcon />,
      path: "/creator-studio",
    },
    { title: "Business", icon: <BusinessIcon />, path: "/business" },
    { title: "Ads", icon: <AdsIcon />, path: "/ads" },
    {
      title: "Create Your Space",
      icon: <ControlPointIcon />,
      path: "/create-space",
    },
    {
      title: "Settings and Privacy",
      icon: <SettingsIcon />,
      path: "/settings",
    },
  ];

  return (
    <div className="h-screen sticky top-0">
      <div className="flex flex-col items-center ">
        <div className="py-3">
          <img
            src={TweetHub_logo}
            className="w-20 h-20 mb-8 rounded-full cursor-pointer hover:transition hover:duration-300 hover:scale-110"
            alt="TweetHub_logo"
          />
        </div>

        <div className="space-y-10 flex flex-col font-bold items-start">
          {navigationMenu.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 hover:text-black rounded-full px-4 py-2"
              onClick={(e) => {
                if (item.name === "More") handleMoreClick(e);
                else if (item.name === "Profile") navigate(`/profile/${5}`);
                else navigate(item.path);
              }}
            >
              <div className="font-bold text-xl">{item.icon}</div>
              <div className="text-xl font-bold">{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      <Menu
        anchorEl={anchorElMore}
        open={openMore}
        onClose={handleMoreClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        PaperProps={{
          style: {
            width: "400px",
            borderRadius: "25px",
            fontSize: "16px",
            border: "2px solid #333",
            boxShadow: "0px 8px 30px rgba(0,0,0,0.12)",
            backgroundColor: "#1a1a1a",
            padding: "12px 8px",
          },
        }}
      >
        {moreItems.map((item) => (
          <React.Fragment key={item.title}>
            <MenuItem
              onClick={() => {
                navigate(item.path);
                handleMoreClose();
              }}
              sx={{ py: 2, px: 3, borderRadius: "12px", margin: "4px 0" }}
            >
              <ListItemIcon
                sx={{ color: "#1d9bf0", fontSize: "28px", minWidth: "50px" }}
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

      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 hover:text-black rounded-full px-4 py-2 mt-5">
          <Avatar alt="username" src="/path/to/avatar.jpg" />
          <div>
            <span className="font-bold text-lg">Fahad</span> <br />
            <span className="opacity-70 font-medium">@fahad</span>
          </div>

          <Button onClick={handleProfileClick}>
            <MoreHorizIcon />
          </Button>

          <Menu
            anchorEl={anchorElProfile}
            open={openProfile}
            onClose={handleProfileClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
