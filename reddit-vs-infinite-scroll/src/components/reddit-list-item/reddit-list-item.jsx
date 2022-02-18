import { forwardRef } from "react"


export const RedditListItem = forwardRef((props, ref) => {

    const thumbNailContainerStyle = {
        backgroundImage: `url("${props.data.data.thumbnail}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100px',
        width: '100px',
        marginTop: '20px',
        marginLeft: '20px',
    }


    return (
        <div className="list-page__item" ref={ref}>
            <div className="list-page__item-div">
                <p className="list-page__item-p">s/{props.data.data.subreddit}</p>
            </div>
            <div className="list-page__item-div-container">
                <div style={thumbNailContainerStyle}></div>
                <h3><a href={`https://www.reddit.com/${props.data.data.permalink}`}
                    target="_blank" rel="noreferrer">{props.data.data.title}</a></h3>

            </div>
        </div>
    )
})