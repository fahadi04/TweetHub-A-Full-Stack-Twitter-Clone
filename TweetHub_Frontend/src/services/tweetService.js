import api from "./api";

const tweetService = {
  getAllTweets: async (page = 0, size = 10) => {
    const response = await api.get("/tweets", {
      params: { page, size },
    });
    return response.data;
  },

  getTweetById: async (id) => {
    const response = await api.get(`/tweets/${id}`);
    return response.data;
  },

  createTweet: async (tweetData) => {
    const formData = new FormData();
    formData.append("content", tweetData.content);

    if (tweetData.image) {
      formData.append("image", tweetData.image);
    }
    if (tweetData.video) {
      formData.append("video", tweetData.video);
    }

    const response = await api.post("/tweets", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateTweet: async (id, tweetData) => {
    const response = await api.put(`/tweets/${id}`, tweetData);
    return response.data;
  },

  deleteTweet: async (id) => {
    const response = await api.delete(`/tweets/${id}`);
    return response.data;
  },

  likeTweet: async (id) => {
    const response = await api.post(`/tweets/${id}/like`);
    return response.data;
  },

  unlikeTweet: async (id) => {
    const response = await api.delete(`/tweets/${id}/like`);
    return response.data;
  },

  retweet: async (id) => {
    const response = await api.post(`/tweets/${id}/retweet`);
    return response.data;
  },

  undoRetweet: async (id) => {
    const response = await api.delete(`/tweets/${id}/retweet`);
    return response.data;
  },

  replyToTweet: async (id, replyData) => {
    const response = await api.post(`/tweets/${id}/reply`, replyData);
    return response.data;
  },

  getTweetReplies: async (id, page = 0, size = 10) => {
    const response = await api.get(`/tweets/${id}/replies`, {
      params: { page, size },
    });
    return response.data;
  },

  bookmarkTweet: async (id) => {
    const response = await api.post(`/tweets/${id}/bookmark`);
    return response.data;
  },

  removeBookmark: async (id) => {
    const response = await api.delete(`/tweets/${id}/bookmark`);
    return response.data;
  },

  getBookmarkedTweets: async (page = 0, size = 10) => {
    const response = await api.get("/tweets/bookmarks", {
      params: { page, size },
    });
    return response.data;
  },

  getUserTweets: async (userId, page = 0, size = 10) => {
    const response = await api.get(`/users/${userId}/tweets`, {
      params: { page, size },
    });
    return response.data;
  },

  getLikedTweets: async (userId, page = 0, size = 10) => {
    const response = await api.get(`/users/${userId}/liked-tweets`, {
      params: { page, size },
    });
    return response.data;
  },
};

export default tweetService;
