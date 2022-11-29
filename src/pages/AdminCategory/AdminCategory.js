import classNames from "classnames/bind"
import { useEffect, useRef, useState } from "react"
import LayoutCard from "~/components/LayoutCard"
import { useStringToPath } from "~/hooks"
import styles from './AdminCategory.module.scss'
import * as categoryService from '~/services/categoryServices.js'

const cx = classNames.bind(styles)

function AdminCategory() {
    const [categories, setCategories] = useState([])
    const [updateCateInp, setUpdateCateInp] = useState(false)
    const [updateValue, setUpdateValue] = useState('')
    const [currentCate, setCurrentCate] = useState(0)
    const [reload, setReload] = useState(false)

    const updateRef = useRef()

    const { path: pathUpdate, setPath: setPathUpdate } = useStringToPath(updateValue)

    useEffect(() => {
        const fetchApi = async () => {
            const categoryRes = await categoryService.getCategory()
            setCategories(categoryRes)
        }
        fetchApi()
    }, [reload])

    useEffect(() => {
        setPathUpdate(updateValue)
    }, [updateValue, setPathUpdate])

    const handleUpdateCategoryClick = (id, name) => {
        setUpdateCateInp(true)
        setUpdateValue(name)
        updateRef.current.focus()
        setCurrentCate(id)
    }

    const handleUpdateCategory = () => {
        const fetchApi = async () => {
            await categoryService.updateCategory(currentCate, {
                name: updateValue,
                path: pathUpdate
            })
        }
        fetchApi()
        setReload(!reload)
        setUpdateCateInp(false)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Danh sách danh mục</h1>
            </div>
            <div className={cx('categories')}>
                <LayoutCard>
                    <div className={cx('header-title')}>
                        <span>Danh mục</span>
                        <span className={cx('header-action')}>Actions</span>
                    </div>
                    {categories.map((category, index) => (
                        <div key={index} className={cx('category-item')}>
                            <div className={cx('category')}>
                                <span className={cx('category-title')}>{category.name}</span>
                                <div className={cx('category-actions')}>
                                    <span className={cx('update-btn')} onClick={() => handleUpdateCategoryClick(category._id, category.name)}>Sửa</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className={cx('update-category', { show: updateCateInp })} >
                        <div className={cx('update-inp')}>
                            <input
                                ref={updateRef}
                                type='text'
                                value={updateValue}
                                onChange={e => setUpdateValue(e.target.value)}
                            />
                            <button onClick={handleUpdateCategory}>Sửa</button>
                        </div>
                        <div className={cx('update-overlay')} onClick={() => setUpdateCateInp(false)}></div>
                    </div>
                </LayoutCard>
            </div>
        </div>
    )
}

export default AdminCategory