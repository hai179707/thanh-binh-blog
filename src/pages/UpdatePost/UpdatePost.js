import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { EditPost } from "~/layouts"

import { getPost } from '~/services/postServices'

function UpdatePost() {
    const { postId } = useParams()
    const [post, setPost] = useState()

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getPost(postId)
            setPost(result)
        }
        fetchApi()
    }, [postId])

    return (
        <>
            {post && <EditPost data={post} />}
        </>
    )
}

export default UpdatePost