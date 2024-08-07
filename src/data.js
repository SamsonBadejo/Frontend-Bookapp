import Thumbnail1 from "./images/blog1.jpg";
import Thumbnail2 from "./images/blog2.jpg";
import Thumbnail3 from "./images/blog3.jpg";
import Thumbnail4 from "./images/blog4.jpg";


export const DUMMY_POSTS = [
    {
      id: "1",
      thumbnail: Thumbnail1,
      category: "Fantasy",
      title: "Epic Adventures Await",
      description: "Dive into a world of magic and mystery with our top fantasy picks.",
      authorID: 3,
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      thumbnail: Thumbnail2,
      category: "Science Fiction",
      title: "Future Worlds Explored",
      description: "Explore advanced technologies and distant galaxies in our science fiction collection.",
      authorID: 4,
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    },
    {
      id: "3",
      thumbnail: Thumbnail3,
      category: "Romance",
      title: "Heartfelt Stories",
      description: "Experience love and passion with our handpicked romance novels.",
      authorID: 8,
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
    },
    {
      id: "4",
      thumbnail: Thumbnail4,
      category: "Mystery & Thriller",
      title: "Unravel the Secrets",
      description: "Get lost in suspense and intrigue with our mystery and thriller books.",
      authorID: 11,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
  ];