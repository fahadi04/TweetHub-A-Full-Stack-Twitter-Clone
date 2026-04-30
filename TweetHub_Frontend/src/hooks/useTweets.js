import { useState, useCallback } from "react";
import tweetService from "../services/tweetService";
import { demoUser, mockTweets } from "../utils/mockData";

export const useTweets = () => {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const fetchTweets = useCallback(async (pageNum = 0) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await tweetService.getAllTweets(pageNum, 10);
      if (pageNum === 0) {
        setTweets(data.content || data);
      } else {
        setTweets((prev) => [...prev, ...(data.content || data)]);
      }
      setHasMore(data.hasMore !== false);
      setPage(pageNum + 1);
    } catch (err) {
      setTweets((prev) => (prev.length ? prev : mockTweets));
      setHasMore(false);
      setError(err.response?.data?.message || null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTweet = useCallback(async (tweetData) => {
    try {
      const newTweet = await tweetService.createTweet(tweetData);
      setTweets((prev) => [newTweet, ...prev]);
      return newTweet;
    } catch (err) {
      const localUser = JSON.parse(localStorage.getItem("user") || "null") || demoUser;
      const image =
        tweetData.image instanceof File ? URL.createObjectURL(tweetData.image) : tweetData.image;
      const newTweet = {
        id: Date.now(),
        content: tweetData.content,
        image,
        author: localUser,
        createdAt: new Date().toISOString(),
        replies: 0,
        retweets: 0,
        likes: 0,
        views: 0,
        liked: false,
        retweeted: false,
        bookmarked: false,
      };
      setTweets((prev) => [newTweet, ...prev]);
      setError(err.response?.data?.message || null);
      return newTweet;
    }
  }, []);

  const deleteTweet = useCallback(async (id) => {
    setTweets((prev) => prev.filter((tweet) => tweet.id !== id));
    try {
      await tweetService.deleteTweet(id);
    } catch (err) {
      setError(err.response?.data?.message || null);
    }
  }, []);

  const likeTweet = useCallback(async (id) => {
    setTweets((prev) =>
      prev.map((tweet) =>
        tweet.id === id
          ? {
              ...tweet,
              liked: !tweet.liked,
              likes: Math.max(0, (tweet.likes || 0) + (tweet.liked ? -1 : 1)),
            }
          : tweet,
      ),
    );
    try {
      const updated = await tweetService.likeTweet(id);
      setTweets((prev) =>
        prev.map((tweet) => (tweet.id === id ? updated : tweet)),
      );
    } catch (err) {
      setError(err.response?.data?.message || null);
    }
  }, []);

  const retweet = useCallback(async (id) => {
    setTweets((prev) =>
      prev.map((tweet) =>
        tweet.id === id
          ? {
              ...tweet,
              retweeted: !tweet.retweeted,
              retweets: Math.max(0, (tweet.retweets || 0) + (tweet.retweeted ? -1 : 1)),
            }
          : tweet,
      ),
    );
    try {
      const updated = await tweetService.retweet(id);
      setTweets((prev) =>
        prev.map((tweet) => (tweet.id === id ? updated : tweet)),
      );
    } catch (err) {
      setError(err.response?.data?.message || null);
    }
  }, []);

  const bookmarkTweet = useCallback(async (id) => {
    setTweets((prev) =>
      prev.map((tweet) =>
        tweet.id === id ? { ...tweet, bookmarked: !tweet.bookmarked } : tweet,
      ),
    );
    try {
      await tweetService.bookmarkTweet(id);
    } catch (err) {
      setError(err.response?.data?.message || null);
    }
  }, []);

  return {
    tweets,
    isLoading,
    error,
    hasMore,
    page,
    fetchTweets,
    createTweet,
    deleteTweet,
    likeTweet,
    retweet,
    bookmarkTweet,
  };
};
