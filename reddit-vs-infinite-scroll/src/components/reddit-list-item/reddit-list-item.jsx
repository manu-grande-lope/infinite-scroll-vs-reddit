import { forwardRef } from "react"


export const RedditListItem = forwardRef((props, ref) => {

    const thumbNailContainerStyle = {
        backgroundImage: `url("${props.data.data.thumbnail}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100px',
        width: '100px',
        borderRadius: '50%'
    }


    return (
        <div className="list-page__item" ref={ref}>
            <p className="list-page__item-p">{props.data.data.subreddit}</p>
            <div style={thumbNailContainerStyle}></div>
            <h3><a href={`https://www.reddit.com/${props.data.data.permalink}`}
                target="_blank" rel="noreferrer">{props.data.data.title}</a></h3>
            

        </div>
    )
})