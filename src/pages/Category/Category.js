import { useEffect, useState } from "react"
import BlogPageWrapper from "~/components/BlogPageWrapper"
import CategoryItem from "~/components/CategoryItem"
import { getCategory } from "~/services/categoryServices"

function Category() {
    const [cate, setCate] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchApi = async () => {
            const cateRes = await getCategory()
            setCate(cateRes)
        }
        fetchApi()
    }, [])

    return (
        <BlogPageWrapper title="Category">
            {cate.map((category, index) => (
                <CategoryItem key={index} data={category} />
            ))}
        </BlogPageWrapper>
    )
}

export default Category