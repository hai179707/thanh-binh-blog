import classNames from "classnames/bind"
import { useEffect, useRef, useState } from "react"
import LayoutCard from "~/components/LayoutCard"
import { useStringToPath } from "~/hooks"
import styles from './AdminTag.module.scss'
import * as tagService from '~/services/tagServices.js'

const cx = classNames.bind(styles)

function AdminTag() {
    const [tags, setTags] = useState([])
    const [createValue, setCreateValue] = useState('')
    const [updateTagInp, setUpdateTagInp] = useState(false)
    const [updateValue, setUpdateValue] = useState('')
    const [currentTag, setCurrentTag] = useState(0)
    const [reload, setReload] = useState(true)

    const createInp = useRef()
    const updateRef = useRef()

    const { path: pathCreate, setPath: setPathCreate } = useStringToPath(createValue)
    const { path: pathUpdate, setPath: setPathUpdate } = useStringToPath(updateValue)

    useEffect(() => {
        const fetchApi = async () => {
            const tagRes = await tagService.getTags()
            setTags(tagRes)
        }
        fetchApi()
    }, [reload])

    useEffect(() => {
        setPathCreate(createValue)
    }, [createValue, setPathCreate])

    useEffect(() => {
        setPathUpdate(updateValue)
    }, [updateValue, setPathUpdate])

    const handleCreateTag = () => {
        if (createValue) {
            const fetchApi = async () => {
                await tagService.createTag([{
                    path: pathCreate,
                    name: createValue
                }])
            }
            fetchApi()
            setReload(!reload)
            setCreateValue('')
        }
    }

    const handleDeleteTagClick = (id, name) => {
        const confirm = window.confirm(`Bạn có chắc chắn muốn xóa tag: ${name}`)
        if (confirm) {
            const fetchApi = async () => {
                await tagService.deleteTag(id)
            }
            fetchApi()
            setReload(!reload)
        }
    }

    const handleUpdateTagClick = (id, name) => {
        setUpdateTagInp(true)
        setUpdateValue(name)
        updateRef.current.focus()
        setCurrentTag(id)
    }

    const handleUpdateTag = () => {
        const fetchApi = async () => {
            await tagService.updateTag(currentTag, {
                name: updateValue,
                path: pathUpdate
            })
        }
        fetchApi()
        setReload(!reload)
        setUpdateTagInp(false)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Danh sách tag</h1>
            </div>
            <div className={cx('create-tag-area')}>
                <input
                    ref={createInp}
                    type='text'
                    placeholder='Nhập tên tag'
                    value={createValue}
                    onChange={e => setCreateValue(e.target.value)}
                    className={cx('create-inp')}
                />
                <button className={cx('create-tag-btn')} onClick={handleCreateTag}>Tạo mới</button>
            </div>
            <div className={cx('tags')}>
                <LayoutCard>
                    <div className={cx('header-title')}>
                        <span>Tags</span>
                        <span className={cx('header-action')}>Actions</span>
                    </div>
                    {tags.map((tag, index) => (
                        <div key={index} className={cx('tag-item')}>
                            <div className={cx('tag')}>
                                <span className={cx('tag-title')}>{tag.name}</span>
                                <div className={cx('tag-actions')}>
                                    <span className={cx('update-btn')} onClick={() => handleUpdateTagClick(tag._id, tag.name)}>Sửa</span>
                                    <span className={cx('delete-btn')} onClick={() => handleDeleteTagClick(tag._id, tag.name)}>Xóa</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className={cx('update-tag', { show: updateTagInp })} >
                        <div className={cx('update-inp')}>
                            <input
                                ref={updateRef}
                                type='text'
                                value={updateValue}
                                onChange={e => setUpdateValue(e.target.value)}
                            />
                            <button onClick={handleUpdateTag}>Sửa</button>
                        </div>
                        <div className={cx('update-overlay')} onClick={() => setUpdateTagInp(false)}></div>
                    </div>
                </LayoutCard>
            </div>
        </div>
    )
}

export default AdminTag