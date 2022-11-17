import classNames from "classnames/bind"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import PostGroupWrapper from "~/components/PostGroupWrapper"
import PostWrapper from "~/components/PostWrapper"
import styles from './Tag.module.scss'
import { posts } from "../Post/postList"
import PostItem from "~/components/PostItem"
import { tags } from "./tagList"

const cx = classNames.bind(styles)

function Tag() {
    const { tagPath } = useParams()
    const [tagName, setTagName] = useState('')
    const [postsHaveTag, setPostsHaveTag] = useState([])

    useEffect(() => {
        const resName = tags.find(tag => tag.path === tagPath)
        setTagName(resName.name)

        const result = posts.filter(post => {
            return post.post.tags.some(tag => tag.path === tagPath)
        })
        setPostsHaveTag(result)
    }, [tagPath])


    return (
        <PostWrapper>
            <div className={cx('wrapper')}>
                <h1 className={cx('title')}>Từ khóa: <span>{tagName}</span></h1>
                <PostGroupWrapper className={cx('content')}>
                    {!postsHaveTag
                        ?
                        <span>Không bài viết nào gắn tag này</span>
                        :
                        postsHaveTag.map((post, index) => (
                            <PostItem key={index} data={post.post} />
                        ))
                    }
                </PostGroupWrapper>
            </div>
        </PostWrapper>
    )
}

export default Tag