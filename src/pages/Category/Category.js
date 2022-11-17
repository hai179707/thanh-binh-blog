import { useEffect } from "react"
import BlogPageWrapper from "~/components/BlogPageWrapper"
import CategoryItem from "~/components/CategoryItem"

import { categories } from "./categoryList"

function Category() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <BlogPageWrapper title="Category">
            {categories.map((category, index) => (
                <CategoryItem key={index} data={category} />
            ))}
        </BlogPageWrapper>
    )
}

export default Category