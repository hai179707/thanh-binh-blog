import classNames from "classnames/bind"
import { useEffect, useState } from "react"
import { IoMdPricetag } from "react-icons/io"
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri"
import { Link, useParams } from "react-router-dom"
import PostGroupWrapper from "~/components/PostGroupWrapper"
import PostItem from "~/components/PostItem"
import PostWrapper from "~/components/PostWrapper"
import styles from './Post.module.scss'
import { posts } from "./postList.js"

const cx = classNames.bind(styles)

function Post() {
    const { postPath } = useParams()
    const [currentPath, setCurrentPath] = useState(postPath)
    const [relatedPost, setRelatedPost] = useState(JSON.parse(localStorage.getItem('relatedPost')) || [])
    const [post, setPost] = useState()
    const [createTime, setCreateTime] = useState('')
    const [nextPost, setNextPost] = useState(currentPath)
    const [prevPost, setPrevPost] = useState(currentPath)

    useEffect(() => {
        window.scrollTo(0, 0)
        const result = posts.find(post => post.post.path === currentPath)
        if (result) {
            setPost(result.post)
            const create = new Date(result.post.createAt)
            setCreateTime(`${create.getDate()}/${create.getMonth() + 1}/${create.getFullYear()}`)

            let related = []
            relatedPost.some(post => post.path === result.post.path)
                ?
                related = relatedPost
                :
                related = [...relatedPost, result.post]

            if (related.length > 4) {
                related = related.slice(-4)
            }

            setRelatedPost(related)

            localStorage.setItem('relatedPost', JSON.stringify(relatedPost))
        }

        const nextPost = posts.find(post => post.id === result.id + 1)
        if (nextPost) setNextPost(nextPost.post.path)

        const prevPost = posts.find(post => post.id === result.id - 1)
        if (prevPost) setPrevPost(prevPost.post.path)
    }, [currentPath, relatedPost])


    return (
        <PostWrapper>
            {!post
                ?
                <div>Bài viết không tồn tại hoặc đã bị xóa</div>
                :
                <div className={cx('wrapper')}>
                    <div className={cx('content')}>
                        <div className={cx('header')}>
                            <Link to={'/category/' + post.category.path} className={cx('category')}>{post.category.name}</Link>
                            <h2 className={cx('title')}>{post.title}</h2>
                            <p className={cx('date')}>{createTime}</p>
                        </div>
                        <div className={cx('content-area')} dangerouslySetInnerHTML={{ __html: JSON.stringify(post.content) }}></div>
                        <div className={cx('tags')}>
                            <div className={cx('icon')}><IoMdPricetag /></div>
                            {post.tags.map((tag, index) => (
                                <Link key={index} to={`/tag/${tag.path}`} className={cx('tag')}>{`#${tag.name}`}</Link>
                            ))}
                        </div>
                    </div>
                    <div className={cx('navigation')}>
                        <Link
                            to={`/post/${prevPost}`}
                            className={cx('prev', { disable: prevPost === currentPath })}
                            onClick={() => setCurrentPath(prevPost)}
                        >
                            <span><RiArrowLeftLine /></span><span>Bài trước</span>
                        </Link>
                        <Link
                            to={`/post/${nextPost}`}
                            className={cx('next', { disable: nextPost === currentPath })}
                            onClick={() => setCurrentPath(nextPost)}
                        >
                            <span>Bài tiếp</span><span><RiArrowRightLine /></span>
                        </Link>
                    </div>
                    {relatedPost
                        &&
                        <div className={cx('related')}>
                            <h2 className={cx('related-title')}>Bài viết vừa xem</h2>
                            <PostGroupWrapper>
                                {relatedPost.map((post, index) => (
                                    <PostItem key={index} data={post} onClick={() => setCurrentPath(post.path)} />
                                ))}
                            </PostGroupWrapper>
                        </div>
                    }
                </div>
            }
        </PostWrapper>
    )
}

export default Post