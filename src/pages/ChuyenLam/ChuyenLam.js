import { useEffect } from "react"
import BlogPageWrapper from "~/components/BlogPageWrapper"
import PostItem from "~/components/PostItem"
import { chuyenLam } from '../postList.js'

function ChuyenLam() {
    const { title, subtitle, full } = chuyenLam

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

export default ChuyenLam