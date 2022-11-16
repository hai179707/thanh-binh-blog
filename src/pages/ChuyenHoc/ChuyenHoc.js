import BlogPageWrapper from "~/components/BlogPageWrapper"
import PostItem from "~/components/PostItem"
import { chuyenHoc } from '../postList.js'

function ChuyenHoc() {
    const { title, subtitle, full } = chuyenHoc

    return (
        <BlogPageWrapper title={title} subtitle={subtitle}>
            {full.map((post, index) => (
                <PostItem data={post} divide key={index} />
            ))}
        </BlogPageWrapper>
    )
}

export default ChuyenHoc