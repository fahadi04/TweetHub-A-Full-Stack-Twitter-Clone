import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/SearchSharp";
import NotificationsIcon from "@mui/icons-material/NotificationsActiveSharp";
import MessagesIcon from "@mui/icons-material/ChatBubbleSharp";
import BookmarkIcon from "@mui/icons-material/BookmarkBorder";
import ProfilesIcon from "@mui/icons-material/AccountCircleSharp";
import MoreIcon from "@mui/icons-material/MoreHoriz";

export const navigationMenu = [
  {
    name: "Home",
    icon: <HomeIcon />,
    path: "/home",
  },
  {
    name: "Explore",
    icon: <ExploreIcon />,
    path: "/explore",
  },
  {
    name: "Notifications",
    icon: <NotificationsIcon />,
    path: "/notifications",
  },
  {
    name: "Follow",
    icon: <ProfilesIcon />,
    path: "/follow",
  },
  {
    name: "Chat",
    icon: <MessagesIcon />,
    path: "/chat",
  },
  {
    name: "Profile",
    icon: <ProfilesIcon />,
    path: "/profile",
  },
  {
    name: "More",
    icon: <MoreIcon />,
    path: "/more",
  },
  // {
  //     name: 'Posts',
  //     icon: <CreateStudioIcon />,
  //     path: '/posts'
  // },
  // {
  //     name: 'Accounts',
  //     icon: <ProfilesIcon />,
  //     path: '/accounts'
  // }
];
