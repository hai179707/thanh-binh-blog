import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from "react"
import classNames from "classnames/bind"
import { Link, useNavigate } from "react-router-dom"
import JoditEditor from "jodit-react"
import Tippy from "@tippyjs/react/headless"
import { RiArrowRightSLine, RiArrowDropDownLine, RiUploadLine } from "react-icons/ri"

import config from "~/config"
import Button from '~/components/Button'
import SideItemWrapper from "~/components/SideItemWrapper"
import TagGroup from "~/components/TagGroup"
import { useStringToPath } from "~/hooks"
import './CustomTextEditor.scss'
import styles from './EditPost.module.scss'
import { getCategory } from '~/services/categoryServices'
import { getTags, createTag } from '~/services/tagServices'
import * as imageService from '~/services/imageServices.js'
import * as postServices from '~/services/postServices'
import AdminNotification from '~/components/AdminNotification'

const cx = classNames.bind(styles)

function EditPost({ data }) {
    const editor = useRef(null)
    const [title, setTitle] = useState(data ? data.title : '')
    const [desc, setDesc] = useState(data ? data.description : '')
    const [image, setImage] = useState(data ? data.imageUrl : '')
    const [content, setContent] = useState(data ? data.content : '')
    const [publicOption, setPublicOption] = useState(data ? data.public : true)
    const [tags, setTags] = useState(data ? data.tags : [])
    const [choosenCategory, setChoosenCategory] = useState(data ? data.category : '')

    const [categories, setCategories] = useState([])
    const [allTag, setAllTags] = useState([])
    const [showCategories, setShowCategories] = useState(false)
    const [createCategory, setCreateCategory] = useState(false)
    const [createCategoryValue, setCreateCategoryValue] = useState('')
    const [tagValue, setTagValue] = useState('')
    const [imageFile, setImageFile] = useState()
    const [message, setMessage] = useState('')
    const [notificationType, setNotificationType] = useState('')

    const { path: postPath, setPath: setPostPath } = useStringToPath(data ? data.path : '')
    const { path: tagPath, setPath: setTagPath } = useStringToPath()
    const { path: categoryPath, setPath: setCategoryPath } = useStringToPath()

    const navigate = useNavigate()

    useEffect(() => {
        setPostPath(title)
    }, [title, setPostPath])

    useEffect(() => {
        setTagPath(tagValue)
    }, [tagValue, setTagPath])

    useEffect(() => {
        setCategoryPath(createCategoryValue)
    }, [createCategoryValue, setCategoryPath])

    useEffect(() => {
        const clearMessage = setTimeout(() => {
            setMessage('')
            setNotificationType('')
        }, 5000)

        return () => clearTimeout(clearMessage)
    }, [message])

    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.preview)
        }
    }, [image])

    useEffect(() => {
        const fetchApi = async () => {
            const cateRes = await getCategory()
            setCategories(cateRes)
            const tagRes = await getTags()
            setAllTags(tagRes)
        }
        fetchApi()
    }, [])

    const handlePreviewImage = e => {
        const file = e.target.files[0]
        setImageFile(file)
        file.preview = URL.createObjectURL(file)
        setImage(file.preview)
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter' && e.target.value) {
            const currTag = allTag.find(tag => tag.name === e.target.value)
            if (!currTag) {
                const fetchApi = async () => {
                    const tagRes = await createTag([{
                        path: tagPath,
                        name: e.target.value
                    }])
                    setTags(prev => [...prev, ...tagRes])
                }
                fetchApi()
            }
            else {
                setTags(prev => [...prev, currTag])
            }

            setTagValue('')
        }
    }

    const handleDeleteTag = () => {
        setTags(prev => prev.slice(0, -1))
    }

    const handleAddTag = tag => {
        setTags(prev => [...prev, tag])
    }

    const handleChooseCategory = category => {
        setChoosenCategory(category)
        setShowCategories(false)
    }

    const handleOpenCreateCategory = () => {
        setCreateCategory(true)
        setShowCategories(false)
    }

    const handleCreateCategory = () => {
        if (createCategoryValue && !categories.some(category => category.name === createCategoryValue)) {
            const newCategory = {
                path: categoryPath,
                name: createCategoryValue
            }
            console.log(categoryPath)
            setCategories(prev => [...prev, newCategory])
            setChoosenCategory(createCategoryValue)
            setCreateCategoryValue('')
            setCreateCategory(false)
        }
    }

    const handleUpdatePost = () => {
        const updateData = {
            title: title,
            description: desc,
            path: postPath,
            imageUrl: image,
            content: content,
            public: publicOption,
            category: choosenCategory._id,
            tags: tags.map(tag => tag._id)
        }

        if (data) {
            const fetchApi = async () => {
                if (imageFile) {
                    const formData = new FormData()
                    formData.append('uploadImage', imageFile)
                    const imageUrl = await imageService.postImage(formData)
                    updateData.imageUrl = imageUrl.url
                }

                await postServices.updatePost(data._id, updateData)

                setMessage('Cập nhật bài viết thành công!')
                setNotificationType('success')
            }
            fetchApi()
        }
        else {
            const fetchApi = async () => {
                const formData = new FormData()
                formData.append('uploadImage', imageFile)
                const imageUrl = await imageService.postImage(formData)
                updateData.imageUrl = imageUrl.url

                const res = await postServices.createPost(updateData)
                navigate('/admin/web/posts/' + res._id)

                setMessage('Tạo bài viết thành công!')
                setNotificationType('success')
            }
            fetchApi()
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link to={config.routes.adminPost} className={cx('header-title')}>Danh sách bài viết</Link>
                <RiArrowRightSLine className={cx('header-icon')} />
                <div className={cx('header-subtitle')}>Tạo bài viết mới</div>
                <Button primary title='Lưu' onClick={handleUpdatePost} />
            </div>
            <div className={cx('container')}>
                <div className={cx('main-content')}>
                    <div className={cx('form-group')}>
                        <label>Tiêu đề</label>
                        <input
                            type='text'
                            placeholder="Tiêu đề"
                            className={cx('form-inp')}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className={cx('form-group', 'editor-container')}>
                        <label>Nội dung</label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            className={cx('text-editor')}
                            onChange={newContent => setContent(newContent)}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label>Trích dẫn</label>
                        <textarea
                            placeholder="Trích dẫn"
                            className={cx('form-inp', 'form-textarea')}
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                        ></textarea>
                    </div>
                    <div className={cx('form-group', 'path')}>
                        <label>Đường dẫn</label>
                        <div className={cx('path-inp')}>
                            <div className={cx('public-url')}>{`${config.rootPath}/`}</div>
                            <input
                                type='text'
                                className={cx('form-inp')}
                                value={postPath}
                                onChange={e => setPostPath(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('side-content')}>
                    <SideItemWrapper title="Hiển thị">
                        <div className={cx('options')}>
                            <div className={cx('option')}>
                                <input type='radio' name='show-option' id='show-option' checked={publicOption} className={cx('option-inp')} onChange={() => setPublicOption(true)} />
                                <label htmlFor="show-option">Hiển thị</label>
                            </div>
                            <div className={cx('option')}>
                                <input type='radio' name='show-option' id='hide-option' checked={!publicOption} className={cx('option-inp')} onChange={() => setPublicOption(false)} />
                                <label htmlFor="hide-option">Ẩn</label>
                            </div>
                        </div>
                    </SideItemWrapper>
                    <SideItemWrapper title="Ảnh đại diện">
                        <div className={cx('choose-image')}>
                            {image
                                ?
                                <>
                                    <div className={cx('choosen-image')} style={{ backgroundImage: `url(${image})` }}>
                                    </div>
                                    <div className={cx('action-image')}>
                                        <label htmlFor="choose-image-inp"><div className={cx('change-image')}>Đổi ảnh</div></label>
                                        <div className={cx('delete-image')} onClick={() => setImage('')}>Xóa ảnh</div>
                                    </div>
                                </>
                                :
                                <>
                                    <label htmlFor="choose-image-inp" className={cx('choose-image-label')}>
                                        <RiUploadLine className={cx('choose-image-icon')} />
                                        <div className={cx('choose-image-btn')}>Thêm hình ảnh</div>
                                    </label>
                                </>
                            }
                            <input type='file' id='choose-image-inp' className={cx('choose-image-inp')} onChange={handlePreviewImage} onClick={e => e.target.value = ''} />
                        </div>
                    </SideItemWrapper>
                    <SideItemWrapper title='Chuyên mục'>
                        <div className={cx('choosen-category', { highlight: showCategories })} onClick={() => setShowCategories(!showCategories)}><span>{choosenCategory.name}</span><RiArrowDropDownLine className={cx('category-icon')} /></div>
                        {showCategories &&
                            <ul className={cx('categories')}>
                                {categories.map((category, index) => (
                                    <li
                                        key={index}
                                        className={cx('category', { choosen: category.name === choosenCategory.name })}
                                        onClick={() => handleChooseCategory(category)}
                                    >
                                        {category.name}
                                    </li>
                                ))}
                                <li className={cx('category', 'create-category')} onClick={handleOpenCreateCategory}>Tạo chuyên mục mới</li>
                            </ul>
                        }
                        {createCategory &&
                            <div className={cx('create-category')}>
                                <input value={createCategoryValue} onChange={e => setCreateCategoryValue(e.target.value)} />
                                <button onClick={handleCreateCategory}>Tạo</button>
                            </div>
                        }
                    </SideItemWrapper>
                    <SideItemWrapper title='Tags'>
                        <Tippy
                            interactive
                            trigger='click'
                            placement='left'
                            offset={[20, 5]}
                            render={attrs => (
                                <div className={cx('suggest-tag-wrapper')} tabIndex="-1" {...attrs}>
                                    <ul className={cx('suggest-tags')}>
                                        {allTag.map((tag, index) => (
                                            <li
                                                key={index}
                                                className={cx('suggest-tag', { disable: tags.some(newtag => newtag.name === tag.name) })}
                                                onClick={() => handleAddTag(tag)}
                                            >
                                                {tag.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        >
                            <input
                                type='text'
                                className={cx('tag-inp')}
                                value={tagValue}
                                onChange={e => setTagValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </Tippy>
                        <div className={cx('tag-note', { show: tagValue })}>Enter để thêm</div>
                        <TagGroup className={cx('tags')} data={tags} close onClick={handleDeleteTag} />
                    </SideItemWrapper>
                </div>
            </div>
            <div className={cx('footer')}>
                <Button primary title='Lưu' onClick={handleUpdatePost} />
            </div>
            {message && <AdminNotification type={notificationType} title={message} />}
        </div>
    )
}

EditPost.propTypes = {
    data: PropTypes.object
}

export default EditPost