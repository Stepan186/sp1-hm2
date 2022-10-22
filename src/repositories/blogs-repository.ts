import { v4 } from "uuid";


const blogs: Array<BlogInterface> = []

export const blogsRepository = {

  findBlogById: (id: string) => {
    const blog = blogs.find((value: BlogInterface)=> {return value.id === id})
    if (blog) {
      return blog
    } else {
      return false
    }
  },

  findBlogs: () => {
    return blogs
  },

  createBlog: (data: BlogCreateInterface) => {
    const newBlog = {id : v4(), name: data.name, youtubeUrl: data.youtubeUrl}
    blogs.push(newBlog)
    return newBlog
  },

  updateBlog: (id: string, data: BlogUpdateInterface) =>  {
    const blog = blogs.find((value: {id: string}) => value.id === id)
    if (!blog) {
      return false
    } else {
      Object.assign(blog, {...data})
      return true
    }
  },

  deleteBlog(id: string) {
    const blog = blogs.findIndex((v :{id: string}) => v.id === id)

    if (blog){
      blogs.splice(blog, 1)
      return true
    } else {
      return false
    }
  }
}
