import React, { useState, useEffect } from "react";
import TweetHub_logo from "../../assets/Logo/TweetHub_logo.png";
import { navigationMenu } from "./NavigationMenu";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Drawer,
  IconButton,
  Box,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ListsIcon from "@mui/icons-material/ListAltTwoTone";
import CommunitieIcon from "@mui/icons-material/PeopleSharp";
import PremiumIcon from "@mui/icons-material/VerifiedTwoTone";
import CreateStudioIcon from "@mui/icons-material/RocketLaunchOutlined";
import BusinessIcon from "@mui/icons-material/Bolt";
import SettingsIcon from "@mui/icons-material/SettingsSharp";
import BookmarkIcon from "@mui/icons-material/BookmarkBorder";
import AdsIcon from "@mui/icons-material/Launch";
import ControlPointIcon from "@mui/icons-material/SettingsVoice";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const openProfile = Boolean(anchorElProfile);

  const [anchorElMore, setAnchorElMore] = useState(null);
  const openMore = Boolean(anchorElMore);
  const profilePath = `/profile/${user.id || 1}`;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMoreClick = (event) => setAnchorElMore(event.currentTarget);
  const handleMoreClose = () => setAnchorElMore(null);

  const handleProfileClick = (event) => setAnchorElProfile(event.currentTarget);
  const handleProfileClose = () => setAnchorElProfile(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
    setMobileMenuOpen(false);
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

  const handleNavigation = (path, name = "", event) => {
    if (name === "More") {
      handleMoreClick(event);
    } else if (name === "Profile") {
      navigate(profilePath);
    } else {
      navigate(path);
    }
    setMobileMenuOpen(false);
  };

  const isItemActive = (item) => {
    if (item.name === "Profile") return location.pathname.startsWith("/profile");
    if (item.path === "/") return location.pathname === "/";
    return location.pathname.startsWith(item.path);
  };

  const handlePostClick = () => {
    navigate("/");
    window.setTimeout(() => {
      window.dispatchEvent(new Event("tweethub:focus-composer"));
    }, 120);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="navigation-desktop">
        <div className="nav-top">
          <div className="nav-logo">
            <button className="nav-logo-button" onClick={() => navigate("/")} aria-label="TweetHub home">
              <img
              src={TweetHub_logo}
              alt="TweetHub Logo"
              className="logo-image"
            />
            </button>
          </div>

          <ul className="nav-menu">
            {navigationMenu.map((item) => {
              const active = isItemActive(item);
              return (
              <li key={item.name}>
                <Tooltip title={item.name} placement="right" arrow>
                  <button
                    type="button"
                    className={`nav-item ${active ? "active" : ""}`}
                    onClick={(event) =>
                      handleNavigation(item.path, item.name, event)
                    }
                  >
                    <span className="nav-icon">
                      {active ? item.activeIcon : item.icon}
                      {item.badge && <span className="nav-badge">{item.badge}</span>}
                    </span>
                    <span className="nav-text">{item.name}</span>
                  </button>
                </Tooltip>
              </li>
            )})}
          </ul>

          <button className="tweet-button" onClick={handlePostClick}>
            Post
          </button>
        </div>

        <div className="nav-bottom">
          <div className="user-profile">
            <Avatar
              alt="User"
              src={user.avatar}
              className="user-avatar"
            />
            <div className="user-info">
              <p className="user-name">{user.name || "Fahad"}</p>
              <p className="user-handle">@{user.username || "fahad"}</p>
            </div>
            <Button
              onClick={handleProfileClick}
              className="user-menu-btn"
              sx={{ minWidth: "auto", padding: 0 }}
            >
              <MoreHorizIcon />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobile && (
        <nav className="navigation-mobile">
          {navigationMenu
            .filter((item) => item.mobile)
            .map((item) => {
              const active = isItemActive(item);
              return (
              <IconButton
                key={item.name}
                aria-label={item.name}
                className={`mobile-nav-icon ${active ? "active" : ""}`}
                onClick={(event) => handleNavigation(item.path, item.name, event)}
              >
                {active ? item.activeIcon : item.icon}
                {item.badge && <span className="mobile-nav-badge">{item.badge}</span>}
              </IconButton>
            )})}

          <button className="mobile-compose-button" onClick={handlePostClick} aria-label="Create post">
            <AddIcon />
          </button>
        </nav>
      )}

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="mobile-drawer"
      >
        <Box className="mobile-drawer-content">
          <Box className="drawer-header">
            <img
              src={TweetHub_logo}
              alt="TweetHub Logo"
              className="drawer-logo"
            />
            <IconButton
              onClick={() => setMobileMenuOpen(false)}
              className="close-btn"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box className="drawer-menu">
            {navigationMenu.map((item) => {
              const active = isItemActive(item);
              return (
              <button
                type="button"
                key={item.name}
                className={`drawer-menu-item ${active ? "active" : ""}`}
                onClick={(event) =>
                  handleNavigation(item.path, item.name, event)
                }
              >
                <span className="drawer-icon">{active ? item.activeIcon : item.icon}</span>
                <span className="drawer-text">{item.name}</span>
              </button>
            )})}
          </Box>

          <Box className="drawer-user">
            <Avatar
              alt="User"
              src={user.avatar}
              className="drawer-avatar"
            />
            <div className="drawer-user-info">
              <p className="drawer-user-name">{user.name || "Fahad"}</p>
              <p className="drawer-user-handle">@{user.username || "fahad"}</p>
            </div>
            <IconButton
              onClick={handleProfileClick}
              className="drawer-more-btn"
            >
              <MoreHorizIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>

      {/* Desktop More Menu */}
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
            boxShadow: "0px 8px 30px rgba(0,0,0,0.12)",
            backgroundColor: "var(--bg-white)",
            padding: "12px 8px",
          },
        }}
      >
        {moreItems.map((item) => (
          <MenuItem
            key={item.title}
            onClick={() => {
              navigate(item.path);
              handleMoreClose();
            }}
            sx={{ py: 2, px: 3, borderRadius: "12px", margin: "4px 0" }}
          >
            <ListItemIcon sx={{ color: "#1d9bf0", fontSize: "28px", minWidth: "50px" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "17px",
                color: "var(--text-primary)",
              }}
            />
          </MenuItem>
        ))}
      </Menu>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorElProfile}
        open={openProfile}
        onClose={handleProfileClose}
        PaperProps={{
          style: {
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            backgroundColor: "var(--bg-white)",
          },
        }}
      >
        <MenuItem onClick={handleLogout} sx={{ py: 2, px: 3 }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default Navigation;
