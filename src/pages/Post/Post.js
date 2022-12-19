import classNames from "classnames/bind"
import { useEffect, useState } from "react"
import { IoMdPricetag } from "react-icons/io"
import { Link, useParams } from "react-router-dom"
import PostGroupWrapper from "~/components/PostGroupWrapper"
import PostItem from "~/components/PostItem"
import PostWrapper from "~/components/PostWrapper"
import { useDateFormat } from "~/hooks"
import { getPost } from "~/services/postServices"
import styles from './Post.module.scss'

const cx = classNames.bind(styles)

function Post() {
    const { postPath } = useParams()
    // eslint-disable-next-line
    const [currentPath, setCurrentPath] = useState(postPath)
    const [relatedPost, setRelatedPost] = useState(JSON.parse(localStorage.getItem('relatedPost')) || [])
    const [post, setPost] = useState()
    const [createTime, setCreateTime] = useState('')

    const date = useDateFormat(createTime)

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchApi = async () => {
            const res = await getPost(postPath)
            setPost(res)
            setCreateTime(res.updatedAt)

            if (!relatedPost.some(post => post._id === res._id)) {
                if (relatedPost.length >= 3) {
                    relatedPost.splice(0, 1)
                }
                setRelatedPost(prev => [...prev, res])
                localStorage.setItem('relatedPost', JSON.stringify(relatedPost))
            }
        }
        fetchApi()
    }, [postPath, relatedPost])

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
                            <p className={cx('date')}>{date}</p>
                        </div>
                        <div className={cx('content-area')} dangerouslySetInnerHTML={{ __html: post.content }}></div>
                        <div className={cx('tags')}>
                            <div className={cx('icon')}><IoMdPricetag /></div>
                            {post.tags.map((tag, index) => (
                                <Link key={index} to={`/tag/${tag.path}`} className={cx('tag')}>{`#${tag.name}`}</Link>
                            ))}
                        </div>
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