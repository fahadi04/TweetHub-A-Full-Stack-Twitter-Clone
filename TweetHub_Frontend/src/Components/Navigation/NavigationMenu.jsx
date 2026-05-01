import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EmailIcon from "@mui/icons-material/Email";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export const navigationMenu = [
  {
    name: "Home",
    icon: <HomeOutlinedIcon />,
    activeIcon: <HomeIcon />,
    path: "/",
    mobile: true,
  },
  {
    name: "Explore",
    icon: <SearchIcon />,
    activeIcon: <SearchSharpIcon />,
    path: "/explore",
    mobile: true,
  },
  {
    name: "Notifications",
    icon: <NotificationsNoneIcon />,
    activeIcon: <NotificationsIcon />,
    path: "/notifications",
    badge: 3,
    mobile: true,
  },
  {
    name: "Messages",
    icon: <EmailOutlinedIcon />,
    activeIcon: <EmailIcon />,
    path: "/messages",
  },
  {
    name: "Grok",
    icon: <AutoAwesomeOutlinedIcon />,
    activeIcon: <AutoAwesomeIcon />,
    path: "/grok",
  },
  {
    name: "Profile",
    icon: <AccountCircleOutlinedIcon />,
    activeIcon: <AccountCircleIcon />,
    path: "/profile",
    mobile: true,
  },
  {
    name: "Follow",
    icon: <PersonAddOutlinedIcon />,
    activeIcon: <PersonAddIcon />,
    path: "/follow",
  },
  {
    name: "More",
    icon: <MoreHorizIcon />,
    activeIcon: <MoreHorizIcon />,
    path: "/more",
  },
];
