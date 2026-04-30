export const demoUser = {
  id: 1,
  name: 'Fahad Khan',
  username: 'fahad',
  email: 'fahad@example.com',
  avatar: '',
  bio: 'Building TweetHub, a full-stack Twitter-style social app with Spring Boot and React.',
  location: 'India',
  website: 'tweethub.dev',
  followers: 12840,
  following: 428,
  verified: true,
};

export const mockTweets = [
  {
    id: 101,
    content:
      'TweetHub is getting closer to a real social timeline: composer, actions, trends, responsive layout, and a cleaner dark mode all working together.',
    author: demoUser,
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    replies: 24,
    retweets: 148,
    likes: 1260,
    views: 18400,
    liked: false,
    retweeted: false,
    bookmarked: false,
  },
  {
    id: 102,
    content:
      'Frontend detail that matters: the mobile experience should not feel like a squeezed desktop page. Bottom navigation, sticky headers, and sensible spacing change everything.',
    author: {
      id: 2,
      name: 'Aisha Sharma',
      username: 'aisha_codes',
      avatar: '',
      verified: true,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    replies: 41,
    retweets: 312,
    likes: 2840,
    views: 52100,
    liked: true,
    retweeted: false,
    bookmarked: true,
  },
  {
    id: 103,
    content:
      'A good clone is not just matching colors. It needs the interaction rhythm: quick posting, immediate feedback, smooth tabs, discoverable actions, and empty states that still feel alive.',
    author: {
      id: 3,
      name: 'Dev Studio',
      username: 'devstudio',
      avatar: '',
      verified: false,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    replies: 12,
    retweets: 96,
    likes: 913,
    views: 9900,
    liked: false,
    retweeted: true,
    bookmarked: false,
  },
];

export const trends = [
  { category: 'Technology · Trending', title: '#ReactJS', count: '128K posts' },
  { category: 'Developers · Trending', title: 'Spring Boot', count: '42K posts' },
  { category: 'Design · Trending', title: 'Responsive UI', count: '18K posts' },
  { category: 'India · Trending', title: 'Full Stack Projects', count: '9,642 posts' },
];

export const followSuggestions = [
  { id: 4, name: 'Maya Patel', username: 'maya_designs', verified: true },
  { id: 5, name: 'Code Daily', username: 'codedaily', verified: false },
  { id: 6, name: 'Spring Tips', username: 'springtips', verified: true },
];
