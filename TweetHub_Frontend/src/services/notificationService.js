import api from "./api";

const notificationService = {
  getAllNotifications: async (page = 0, size = 10) => {
    const response = await api.get("/notifications", {
      params: { page, size },
    });
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await api.get("/notifications/unread-count");
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await api.post(`/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.post("/notifications/mark-all-read");
    return response.data;
  },

  deleteNotification: async (id) => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },

  getNotificationsByType: async (type, page = 0, size = 10) => {
    const response = await api.get("/notifications/by-type", {
      params: { type, page, size },
    });
    return response.data;
  },
};

export default notificationService;
