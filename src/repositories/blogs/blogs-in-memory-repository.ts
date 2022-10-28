// import { v4 } from "uuid";
//
//
// export const blogs: Array<BlogInterface> = [];
//
// export const blogsRepository = {
//
//   findBlogById: (id: string) => {
//     const blog = blogs.find((value: BlogInterface) => {return value.id === id;});
//     if (blog) {
//       return blog;
//     } else {
//       return false;
//     }
//   },
//
//   findBlogs: () => {
//     return blogs;
//   },
//
//   createBlog: (data: BlogCreateInterface) => {
//     const newBlog = { id: v4(), name: data.name, youtubeUrl: data.youtubeUrl, createdAt: new Date().toISOString() };
//     blogs.push(newBlog);
//     return newBlog;
//   },
//
//   updateBlog: (id: string, data: BlogUpdateInterface) => {
//     const blog = blogs.find((value: {id: string}) => value.id === id);
//     if (!blog) {
//       return false;
//     } else {
//       Object.assign(blog, { ...data });
//       return true;
//     }
//   },
//
//   deleteBlog(id: string) {
//
//     let isDeleted = false;
//
//     for (let i = 0; i < blogs.length; i++) {
//       if (blogs[i].id === id) {
//         blogs.splice(i, 1);
//         isDeleted = true;
//         break;
//       }
//     }
//
//     return isDeleted;
//   }
// };
