import api from "./api";

const userService = {
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  getCurrentUserProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  updateUserProfile: async (userData) => {
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("bio", userData.bio);
    formData.append("location", userData.location);
    formData.append("website", userData.website);
    formData.append("birthDate", userData.birthDate);

    if (userData.avatar) {
      formData.append("avatar", userData.avatar);
    }
    if (userData.headerImage) {
      formData.append("headerImage", userData.headerImage);
    }

    const response = await api.put("/users/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  followUser: async (id) => {
    const response = await api.post(`/users/${id}/follow`);
    return response.data;
  },

  unfollowUser: async (id) => {
    const response = await api.delete(`/users/${id}/follow`);
    return response.data;
  },

  getFollowers: async (id, page = 0, size = 10) => {
    const response = await api.get(`/users/${id}/followers`, {
      params: { page, size },
    });
    return response.data;
  },

  getFollowing: async (id, page = 0, size = 10) => {
    const response = await api.get(`/users/${id}/following`, {
      params: { page, size },
    });
    return response.data;
  },

  isFollowing: async (id) => {
    const response = await api.get(`/users/${id}/is-following`);
    return response.data;
  },

  blockUser: async (id) => {
    const response = await api.post(`/users/${id}/block`);
    return response.data;
  },

  unblockUser: async (id) => {
    const response = await api.delete(`/users/${id}/block`);
    return response.data;
  },

  muteUser: async (id) => {
    const response = await api.post(`/users/${id}/mute`);
    return response.data;
  },

  unmuteUser: async (id) => {
    const response = await api.delete(`/users/${id}/mute`);
    return response.data;
  },

  searchUsers: async (query, page = 0, size = 10) => {
    const response = await api.get("/search/users", {
      params: { q: query, page, size },
    });
    return response.data;
  },

  getRecommendedUsers: async (limit = 5) => {
    const response = await api.get("/users/recommended", {
      params: { limit },
    });
    return response.data;
  },
};

export default userService;
