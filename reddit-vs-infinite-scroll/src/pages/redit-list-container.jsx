import { useRef, useState, useEffect } from "react"

export default function ReditListContainer() {

    const [after, updateAfter] = useState('')
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const lastRef = useRef()

    useEffect(() => {
        setIsLoading(true)

        fetch(`https://www.reddit.com/r/coding.json?after=${after}`)
            .then(r => r.jason())
            .then(d => {
                updateAfter(d.data.after)
                setItems(previousvalue => previousvalue.concat(d.data.children))
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        if (lastRef.current !== undefined) {
            const observer = new IntersectionObserver((posts) => {
                if (posts[0].isIntersecting && !isLoading) {
                    setIsLoading(true)

                    fetch(`https://www.reddit.com/r/coding.json?after=${after}`)
                        .then(r => r.json())
                        .then(d => {
                            updateAfter(d.data.after)
                            setItems(previousvalue => previousvalue.concat(d.data.children))
                            setIsLoading(false)
                        })
                }
            }, {
                rootMargin: '150px'
            })
            observer.observe(lastRef.current)
            return ()=>observer.disconnect()
        }
    })

    return (
        <div className="list-page">
            <div className="list-container">

            </div>
        </div>
    )

}