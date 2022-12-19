import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BlogPageWrapper from "~/components/BlogPageWrapper"
import PostItem from "~/components/PostItem"
import { getAllPostOfCategory } from "~/services/postServices"
import { getACategory } from "~/services/categoryServices"

function CategoryPost() {
    const [posts, setPosts] = useState([])
    const [cate, setCate] = useState()
    const { categoryId } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchApi = async () => {
            const cateRes = await getACategory(categoryId)
            setCate(cateRes)
            const res = await getAllPostOfCategory(categoryId)
            setPosts(res)
        }
        fetchApi()
    }, [categoryId])

    return (
        <>
            {
                cate &&
                <BlogPageWrapper title={cate.name}>
                    {posts.map((post, index) => (
                        <PostItem data={post} divide key={index} />
                    ))}
                </BlogPageWrapper>
            }
        </>
    )
}

export default CategoryPost