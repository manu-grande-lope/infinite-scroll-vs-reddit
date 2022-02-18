import { useRef, useState, useEffect } from "react"
import { RedditListItem } from '../../components/reddit-list-item/reddit-list-item.jsx'
import './styles.css'



export default function RedditListContainer() {

    const [after, updateAfter] = useState('')
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const lastRef = useRef()

    useEffect(() => {
        setIsLoading(true)

        fetch(`https://www.reddit.com/r/cats.json?after=${after}`)
            .then(r => r.json())
            .then(d => {
                updateAfter(d.data.after)
                setItems(previousvalue => previousvalue.concat(d.data.children))
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        console.log("llego hasta el segundo useState")
        if (lastRef.current !== undefined) { // el error está aquí, creo
            console.log("llego hasta el primer if") // no llega
            const observer = new IntersectionObserver((posts) => {
                if (posts[0].isIntersecting && !isLoading) {
                    setIsLoading(true)

                    fetch(`https://www.reddit.com/r/cats.json?after=${after}`)
                        .then(r => r.json())
                        .then(d => {
                            updateAfter(d.data.after)
                            setItems(previousvalue => previousvalue.concat(d.data.children))
                            setIsLoading(false)
                        })
                }
            }, {
                rootMargin: '100px'
            })
            observer.observe(lastRef.current)
            return () => observer.disconnect()
        }
    })

    return (
        <div className="list-page">
            <div className="list-container">
                {
                    items.map((e, index) => {
                        if (index === items.length - 1) {
                            return <RedditListItem ref={lastRef} key={index} data={e}></RedditListItem>
                        } else {
                            return <RedditListItem key={index} data={e}></RedditListItem>
                        }
                    })
                }
            </div>
            {
                isLoading ?
                    <h3>cargando</h3> // cambiar por icono de carga
                    :
                    null
            }
        </div>
    )

}