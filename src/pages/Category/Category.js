import BlogPageWrapper from "~/components/BlogPageWrapper"
import CategoryItem from "~/components/CategoryItem"

import { categories } from "./categoryList"

function Category() {
    return (
        <BlogPageWrapper title="Category">
            {categories.map((category, index) => (
                <CategoryItem key={index} data={category} />
            ))}
        </BlogPageWrapper>
    )
}

export default Category