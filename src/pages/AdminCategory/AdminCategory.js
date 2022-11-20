import classNames from "classnames/bind"
import { useEffect, useRef, useState } from "react"
import LayoutCard from "~/components/LayoutCard"
import { useStringToPath } from "~/hooks"
import styles from './AdminCategory.module.scss'

const cx = classNames.bind(styles)

const categoriesArr = [
    {
        _id: '1',
        path: 'chuyenchoi',
        name: 'Chuyện chơi'
    },
    {
        _id: '2',
        path: 'chuyenhoc',
        name: 'Chuyện học'
    },
    {
        _id: '3',
        path: 'chuyensong',
        name: 'Chuyện sống'
    },
    {
        _id: '4',
        path: 'chuyenlam',
        name: 'Chuyện làm'
    }
]

function AdminCategory() {
    const [categories, setCategories] = useState(categoriesArr)
    const [createValue, setCreateValue] = useState('')
    const [updateCateInp, setUpdateCateInp] = useState(false)
    const [updateValue, setUpdateValue] = useState('')
    const [currentCate, setCurrentCate] = useState(0)

    const createInp = useRef()
    const updateRef = useRef()

    const { path: pathCreate, setPath: setPathCreate } = useStringToPath(createValue)
    const { path: pathUpdate, setPath: setPathUpdate } = useStringToPath(updateValue)

    useEffect(() => {
        setPathCreate(createValue)
    }, [createValue, setPathCreate])

    useEffect(() => {
        setPathUpdate(updateValue)
    }, [updateValue, setPathUpdate])

    const handleCreateCategory = () => {
        if (createValue) {
            const newCategory = {
                path: pathCreate,
                name: createValue
            }
            setCategories(prev => [newCategory, ...prev])
            setCreateValue('')
        }
    }

    const handleDeleteCategoryClick = (id, name) => {
        const confirm = window.confirm(`Bạn có chắc chắn muốn xóa danh mục: ${name}`)
        if (confirm) {
            categories.splice(id, 1)
            setCategories([...categories])
        }
    }

    const handleUpdateCategoryClick = (id, name) => {
        setUpdateCateInp(true)
        setUpdateValue(name)
        updateRef.current.focus()
        setCurrentCate(id)
    }

    const handleUpdateCategory = () => {
        categories[currentCate].name = updateValue
        categories[currentCate].path = pathUpdate
        setCategories([...categories])
        setUpdateCateInp(false)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Danh sách danh mục</h1>
            </div>
            <div className={cx('create-category-area')}>
                <input
                    ref={createInp}
                    type='text'
                    placeholder='Nhập tên danh mục'
                    value={createValue}
                    onChange={e => setCreateValue(e.target.value)}
                    className={cx('create-inp')}
                />
                <button className={cx('create-cate-btn')} onClick={handleCreateCategory}>Tạo mới</button>
            </div>
            <div className={cx('categories')}>
                <LayoutCard>
                    <div className={cx('header-title')}>
                        <span>Danh mục</span>
                        <span className={cx('header-action')}>Danh mục</span>
                    </div>
                    {categories.map((category, index) => (
                        <div key={index} className={cx('category-item')}>
                            <div className={cx('category')}>
                                <span className={cx('category-title')}>{category.name}</span>
                                <div className={cx('category-actions')}>
                                    <span className={cx('update-btn')} onClick={() => handleUpdateCategoryClick(index, category.name)}>Sửa</span>
                                    <span className={cx('delete-btn')} onClick={() => handleDeleteCategoryClick(index, category.name)}>Xóa</span>
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