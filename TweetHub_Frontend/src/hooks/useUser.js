import { useState, useCallback } from "react";
import userService from "../services/userService";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const fetchUser = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await userService.getUserById(id);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (userData) => {
    try {
      const updated = await userService.updateUserProfile(userData);
      setUser(updated);
      return updated;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
      throw err;
    }
  }, []);

  const toggleFollow = useCallback(
    async (id) => {
      try {
        if (isFollowing) {
          await userService.unfollowUser(id);
          setIsFollowing(false);
        } else {
          await userService.followUser(id);
          setIsFollowing(true);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to follow/unfollow");
        throw err;
      }
    },
    [isFollowing],
  );

  return {
    user,
    isLoading,
    error,
    isFollowing,
    fetchUser,
    updateProfile,
    toggleFollow,
  };
};
