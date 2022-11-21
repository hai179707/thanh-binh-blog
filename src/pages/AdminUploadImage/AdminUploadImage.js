import classNames from "classnames/bind"
import { useEffect, useRef, useState } from "react"
import { RiAddCircleLine, RiCloseCircleFill, RiDownload2Line, RiSearch2Line, RiUpload2Line, RiUploadLine } from "react-icons/ri"
import { MdOutlineContentCopy } from "react-icons/md"
import { HiOutlineTrash } from "react-icons/hi"
import images from "~/assets/images"
import AdminPageAndLimitControl from "~/components/AdminPageAndLimitControl"
import LayoutCard from "~/components/LayoutCard"
import styles from './AdminUploadImage.module.scss'
import CopyToClipboard from "react-copy-to-clipboard"
import config from "~/config"
import Modal from "~/components/Modal"
import { useModal } from "~/hooks"
import Image from "~/components/Image"

const cx = classNames.bind(styles)

function AdminUploadImage() {
    const [filterValue, setFilterValue] = useState('')
    const [copied, setCopied] = useState(false)
    // const [currId, setCurrId] = useState(0)
    const [image, setImage] = useState('')
    const [imageFile, setImageFile] = useState()

    const { isShowing, toggle } = useModal()
    const { isShowing: isUpLoadShowing, toggle: uploadToggle } = useModal()

    const filterInp = useRef()

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

    const handlePreviewImage = e => {
        const file = e.target.files[0]
        setImageFile(file)
        file.preview = URL.createObjectURL(file)
        setImage(file.preview)
    }

    const handleFilterInpChange = e => {
        setFilterValue(e.target.value)
        // Logic filter sử dung hook debounce
    }

    const handleClearFilterInp = () => {
        setFilterValue('')
        filterInp.current.focus()
    }

    const handleShowImage = id => {
        // setCurrId(id)
        toggle()
    }

    const handleDeleteImage = id => {
        const confirm = window.confirm(`Bạn có chắc chắn muốn xóa ảnh này`)
        if (confirm) {
            console.log('Xóa ảnh', id)
        }
    }

    const handleSaveImage = () => {
        uploadToggle()
        setImage('')
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
                            <th>Đường dẫn</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td onClick={() => handleShowImage(/* image id */)}>
                                <div className={cx('image-review')} style={{ backgroundImage: `url(${images.sidebarBg})` }}></div>
                            </td>
                            <td onClick={() => handleShowImage(/* image id */)}>
                                <div>sidebar-bg.b648a2b9e05dc30d8639.jpg</div>
                            </td>
                            <td>
                                <div>06/05/2022 09:58 SA</div>
                            </td>
                            <td>
                                <div className={cx('action')}>
                                    <CopyToClipboard text={config.rootPath + images.sidebarBg} onCopy={() => setCopied(true)}>
                                        <div className={cx('copy-url')} title='Copy đường dẫn'><MdOutlineContentCopy /></div>
                                    </CopyToClipboard>
                                    <div className={cx('delete-image')} onClick={() => handleDeleteImage(/* image id */)}><HiOutlineTrash /></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </LayoutCard>
            <AdminPageAndLimitControl />
            {copied && <div className={cx('copied')}>Đã sao chép đường dẫn</div>}
            <Modal
                isShowing={isShowing}
                hide={toggle}
            >
                <div className={cx('modal-content')}>
                    <div className={cx('image')}>
                        <img src={images.sidebarBg} />
                    </div>
                    <div className={cx('modal-text')}>
                        <div className={cx('left')}>
                            <CopyToClipboard text={config.rootPath + images.sidebarBg} onCopy={() => setCopied(true)}>
                                <div className={cx('modal-name')}>{'sidebar-bg.b648a2b9e05dc30d8639.jpg'.toUpperCase()}</div>
                            </CopyToClipboard>
                            <div className={cx('modal-time')}>06/05/2022 09:58 SA</div>
                        </div>
                        <a href={images.sidebarBg} download className={cx('download-btn')}><RiDownload2Line /></a>
                    </div>
                </div>
            </Modal>
            <Modal
                isShowing={isUpLoadShowing}
                hide={uploadToggle}
            >
                <div className={cx('modal-content')}>
                    <div className={cx('upload-image')}>
                        {image
                            ?
                            <>
                                <div className={cx('choosen-image')} style={{ backgroundImage: `url(${image})` }}>
                                </div>
                                <div className={cx('action-image')}>
                                    <div className={cx('save-image')} onClick={handleSaveImage}>Lưu</div>
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
                        <input type='file' id='choose-image-inp' className={cx('choose-image-inp')} onChange={handlePreviewImage} onClick={e => e.target.value = ''} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AdminUploadImage