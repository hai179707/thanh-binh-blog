import classNames from "classnames/bind"
import { useEffect, useRef, useState } from "react"
import { RiAddCircleLine, RiCloseCircleFill, RiDownload2Line, RiSearch2Line, RiUploadLine } from "react-icons/ri"
import { MdOutlineContentCopy } from "react-icons/md"
import { HiOutlineTrash } from "react-icons/hi"
import AdminPageAndLimitControl from "~/components/AdminPageAndLimitControl"
import LayoutCard from "~/components/LayoutCard"
import styles from './AdminUploadImage.module.scss'
import CopyToClipboard from "react-copy-to-clipboard"
import Modal from "~/components/Modal"
import { useDebounce, useModal } from "~/hooks"
import * as imageService from '~/services/imageServices.js'
import AdminNotification from "~/components/AdminNotification"

const cx = classNames.bind(styles)

function AdminUploadImage() {
    const [imageList, setImageList] = useState([])
    const [filterValue, setFilterValue] = useState('')
    const [copied, setCopied] = useState(false)
    const [limit, setLimit] = useState(20)
    const [page, setPage] = useState(1)
    // const [currId, setCurrId] = useState(0)
    const [image, setImage] = useState('')
    const [choosenImage, setChoosenImage] = useState()
    const [message, setMessage] = useState('')
    const [notificationType, setNotificationType] = useState('')

    const { isShowing, toggle } = useModal()
    const { isShowing: isUpLoadShowing, toggle: uploadToggle } = useModal()

    const filterInp = useRef()
    const form = useRef()

    const debouncedValue = useDebounce(filterValue, 600)

    useEffect(() => {
        setTimeout(() => {
            setCopied(false)
        }, 5000);
    }, [copied])

    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.preview)
        }
    }, [image])

    useEffect(() => {
        const fetchApi = async () => {
            const result = await imageService.getImage(page, limit)
            setImageList(result)
        }
        fetchApi()
    }, [page, limit])

    useEffect(() => {
        const fetchApi = async () => {
            const result = await imageService.getImage(page, limit, debouncedValue)
            setImageList(result)
        }
        fetchApi()
    }, [page, limit, debouncedValue])

    const handlePreviewImage = e => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setImage(file.preview)
    }

    const handleFilterInpChange = e => {
        setFilterValue(e.target.value)
    }

    const handleClearFilterInp = () => {
        setFilterValue('')
        filterInp.current.focus()
    }

    const handleShowImage = image => {
        setChoosenImage(image)
        toggle()
    }

    const handleDeleteImage = id => {
        const confirm = window.confirm(`Bạn có chắc chắn muốn xóa ảnh này`)
        if (confirm) {
            const fetchApi = async () => {
                await imageService.deleteImage(id)
                setMessage('Xóa hình ảnh thành công')
                setNotificationType('success')
                const result = await imageService.getImage(page, limit)
                setImageList(result)
            }
            fetchApi()
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        const fetchApi = async () => {
            const imageUrl = await imageService.postImage(new FormData(e.target))
            console.log(imageUrl.url)
            uploadToggle()
            setMessage('Tải hình ảnh thành công')
            setNotificationType('success')
            const result = await imageService.getImage(page, limit)
            setImageList(result)
            setImage('')
        }
        fetchApi()
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Quản lí hình ảnh tải lên</h1>
                <div className={cx('header-group')}>
                    <div className={cx('filter')}>
                        <button className={cx('filter-btn')}><RiSearch2Line /></button>
                        <input
                            ref={filterInp}
                            type='text'
                            placeholder="Tìm kiếm"
                            className={cx('filter-inp')}
                            value={filterValue}
                            onChange={handleFilterInpChange}
                        />
                        {filterValue && <RiCloseCircleFill className={cx('clear-btn')} onClick={handleClearFilterInp} />}
                    </div>
                    <button className={cx('create-btn')} onClick={uploadToggle}>
                        <RiAddCircleLine />
                        <span>Tải lên</span>
                    </button>
                </div>
            </div>
            <LayoutCard>
                <table className={cx('image-table')}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tên hình ảnh</th>
                            <th>Ngày tạo</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {imageList.map(image => (
                            <tr key={image._id}>
                                <td onClick={() => handleShowImage(image._id)}>
                                    <div className={cx('image-review')} style={{ backgroundImage: `url(${image.url})` }}></div>
                                </td>
                                <td onClick={() => handleShowImage(image)}>
                                    <div>{image.name.split('_')[1]}</div>
                                </td>
                                <td>
                                    <div>{image.updatedAt.split('T')[0]}</div>
                                </td>
                                <td>
                                    <div className={cx('action')}>
                                        <CopyToClipboard text={image.url} onCopy={() => setCopied(true)}>
                                            <div className={cx('copy-url')} title='Copy đường dẫn'><MdOutlineContentCopy /></div>
                                        </CopyToClipboard>
                                        <div className={cx('delete-image')} onClick={() => handleDeleteImage(image._id)}><HiOutlineTrash /></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </LayoutCard>
            <AdminPageAndLimitControl
                nextPage={() => setPage(page + 1)}
                prevPage={() => setPage(page - 1)}
                setLimit={l => setLimit(l)}
            />
            {copied && <div className={cx('copied')}>Đã sao chép đường dẫn</div>}
            <Modal
                isShowing={isShowing}
                hide={toggle}
            >
                <div className={cx('modal-content')}>
                    {choosenImage &&
                        <>
                            <div className={cx('image')}>
                                <img src={choosenImage.url} alt='' />
                            </div>
                            <div className={cx('modal-text')}>
                                <div className={cx('left')}>
                                    <CopyToClipboard text={choosenImage.url} onCopy={() => setCopied(true)}>
                                        <div className={cx('modal-name')}>{choosenImage.name.split('_')[1].toUpperCase()}</div>
                                    </CopyToClipboard>
                                    <div className={cx('modal-time')}>{choosenImage.updatedAt.split('T')[0]}</div>
                                </div>
                                <a href={choosenImage.url} download className={cx('download-btn')}><RiDownload2Line /></a>
                            </div>
                        </>

                    }
                </div>
            </Modal>
            <Modal
                isShowing={isUpLoadShowing}
                hide={uploadToggle}
            >
                <div className={cx('modal-content')}>
                    <form ref={form} onSubmit={handleSubmitForm}>
                        <div className={cx('upload-image')}>
                            {image
                                ?
                                <>
                                    <div className={cx('choosen-image')} style={{ backgroundImage: `url(${image})` }}>
                                    </div>
                                    <div className={cx('action-image')}>
                                        <button className={cx('save-image')} type='submit'>Lưu</button>
                                        <label htmlFor="choose-image-inp" className={cx('change-image')}>Ảnh khác</label>
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
                            <input type='file' name='uploadImage' id='choose-image-inp' className={cx('choose-image-inp')} onChange={handlePreviewImage} onClick={e => e.target.value = ''} />
                        </div>
                    </form>
                </div>
            </Modal>
            {message && <AdminNotification type={notificationType} title={message} />}
        </div>
    )
}

export default AdminUploadImage