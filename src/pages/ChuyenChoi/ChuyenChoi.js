import { useEffect } from "react"
import BlogPageWrapper from "~/components/BlogPageWrapper"
import PostItem from "~/components/PostItem"
import { chuyenChoi } from '../postList.js'

function ChuyenChoi() {
    const { title, subtitle, full } = chuyenChoi

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <BlogPageWrapper title={title} subtitle={subtitle}>
            {full.map((post, index) => (
                <PostItem data={post} divide key={index} />
            ))}
        </BlogPageWrapper>
    )
}

export default ChuyenChoi