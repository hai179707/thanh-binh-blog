import JoditEditor from 'jodit-react'
import { useRef, useState } from 'react'

function TextEditor() {
    const editor = useRef(null)
    const [content, setContent] = useState('')

    return (
        <div className='text-editor'>
            <JoditEditor
                ref={editor}
                value={content}
                onChange={newContent => setContent(newContent)}
            />
        </div>
    )
}

export default TextEditor