import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from "react"
import classNames from "classnames/bind"
import { Link, useParams } from "react-router-dom"
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

const cx = classNames.bind(styles)

const tagsArr = [
    {
        path: 'nhung-nguoi-ban',
        name: 'những người bạn'
    },
    {
        path: 'thanh-binh',
        name: 'Thanh Bình'
    },
    {
        path: 'thanh-hai',
        name: 'Thanh Hải'
    }
]

const categoriesArr = [
    {
        path: 'chuyenchoi',
        name: 'Chuyện chơi'
    },
    {
        path: 'chuyenhoc',
        name: 'Chuyện học'
    },
    {
        path: 'chuyensong',
        name: 'Chuyện sống'
    },
    {
        path: 'chuyenlam',
        name: 'Chuyện làm'
    }
]

function EditPost({ data }) {
    const { postId } = useParams()

    let _public = true
    let _tags = []
    let _choosenCategory = categoriesArr[0].name
    let _imageUrl = ''
    let _title = ''
    let _content = ''
    let _description = ''
    let _path = ''

    if (data) {
        const {
            title: __title,
            content: __content,
            description: __description,
            path: __path,
            public: __public,
            tags: __tags,
            category: __category,
            imageUrl: __imageUrl
        } = data

        _title = __title
        _content = __content
        _description = __description
        _path = __path
        _public = __public
        _tags = __tags
        _choosenCategory = __category.name
        _imageUrl = __imageUrl
    }

    const editor = useRef(null)
    const [title, setTitle] = useState(_title)
    const [desc, setDesc] = useState(_description)
    const [image, setImage] = useState(_imageUrl)
    const [imageFile, setImageFile] = useState()
    const [content, setContent] = useState(_content)
    const [publicOption, setPublicOption] = useState(_public)
    const [tags, setTags] = useState(_tags)
    const [categories, setCategories] = useState(categoriesArr)
    const [choosenCategory, setChoosenCategory] = useState(_choosenCategory)
    const [showCategories, setShowCategories] = useState(false)
    const [createCategory, setCreateCategory] = useState(false)
    const [createCategoryValue, setCreateCategoryValue] = useState('')
    const [tagValue, setTagValue] = useState('')

    const { path: postPath, setPath: setPostPath } = useStringToPath(_path)
    const { path: tagPath, setPath: setTagPath } = useStringToPath()
    const { path: categoryPath, setPath: setCategoryPath } = useStringToPath()

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
        return () => {
            image && URL.revokeObjectURL(image.preview)
        }
    }, [image])

    const handleChangeTitle = e => {
        setTitle(e.target.value)
    }

    const handlePreviewImage = e => {
        const file = e.target.files[0]
        setImageFile(file)
        file.preview = URL.createObjectURL(file)
        setImage(file.preview)
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter' && e.target.value) {
            const newTag = {
                path: tagPath,
                name: e.target.value
            }
            setTags(prev => [...prev, newTag])
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
            category: choosenCategory,
            tags: tags
        }

        if (imageFile) {
            updateData.image = imageFile
            updateData.imageUrl = ''
        }

        if (data) {
            console.log('Update post:', postId)
            console.log('Data', updateData)
        }
        else {
            console.log('Create a new post')
            console.log('Data', updateData)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link to={config.routes.adminPost} className={cx('header-title')}>Danh sách bài viết</Link>
                <RiArrowRightSLine className={cx('header-icon')} />
                <div className={cx('header-subtitle')}>Tạo bài viết mới</div>
                <Button primary title='Lưu' />
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
                            onChange={handleChangeTitle}
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
                        <div className={cx('choosen-category', { highlight: showCategories })} onClick={() => setShowCategories(!showCategories)}><span>{choosenCategory}</span><RiArrowDropDownLine className={cx('category-icon')} /></div>
                        {showCategories &&
                            <ul className={cx('categories')}>
                                {categories.map((category, index) => (
                                    <li
                                        key={index}
                                        className={cx('category', { choosen: category.name === choosenCategory })}
                                        onClick={() => handleChooseCategory(category.name)}
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
                                        {tagsArr.map((tag, index) => (
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
        </div>
    )
}

EditPost.propTypes = {
    data: PropTypes.object
}

export default EditPost