// import { v4 } from "uuid";
// import { blogsRepository } from "../blogs/blogs-in-memory-repository";
//
// export const posts: Array<PostsInterface> = [];
//
// export const postsRepository = {
//   findPosts: () => {
//     return posts;
//   },
//
//   findPostById: (id: string) => {
//     const post = posts.find((v: {id: string}) => v.id === id);
//     if (post) {
//       return post;
//     } else {
//       return false;
//     }
//   },
//
//   createPost: (data: PostsInterface) => {
//     const blog = postsRepository.findPostById(data.blogId);
//
//     if (blog) {
//       const newPost: PostsInterface = {
//         id: v4(),
//         title: data.title,
//         shortDescription: data.shortDescription,
//         content: data.content,
//         blogId: data.blogId,
//         blogName: blog.blogName,
//         createdAt: new Date().toISOString()
//       };
//
//       posts.push(newPost);
//
//       return newPost;
//     } else {
//       return false;
//     }
//   },
//
//   updatePost (id: string, data: PostUpdateInterface) {
//
//     const post = postsRepository.findPostById(id);
//
//     if (post && data.blogId) {
//
//       const blog = blogsRepository.findBlogById(data.blogId);
//
//       if (blog) {
//         Object.assign(post, { ...data });
//         return true;
//       } else {
//         return false;
//       }
//
//     } else {
//       return false;
//     }
//
//
//   },
//
//   deletePost: (id: string) => {
//     let isDeleted = false;
//
//     for (let i = 0; i < posts.length; i++) {
//       if (posts[i].id === id) {
//         posts.splice(i, 1);
//         isDeleted = true;
//         break;
//       }
//     }
//
//     return isDeleted;
//   }
// };
