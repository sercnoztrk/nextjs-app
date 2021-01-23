import styles from "../styles/utils.module.css";
import useCard from "../hooks/useCard"


function cardViewer() {
    const { card, isLoading } = useCard()
    if (card?.imageUrl) {}
    else console.log("No card data");
    return (
        <div>
            <div className={`${styles.shadow_sm} ${styles.card} ${styles.cardTopNotch}`}>New Title</div>
            <div className={`${styles.shadow_sm} ${styles.card}`}>
                <div className={styles.card_body}>
                {!card ? (<div>{isLoading}</div>) : (<div className={styles.cardTitle}>{card.title}</div>)}
                    <div className={styles.cardDescriptionArea}>
                        <p className={styles.cardDescription}>{card?.desc}</p>
                    </div>
                    {card?.imageUrl ?
                    (<img src={card.imageUrl} width="100%" height="auto"></img>) :
                    (<svg className={`${styles.bd_placeholder_img} ${styles.card_img_bottom}`} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <rect width="100%" height="100%" fill="#C4C4C4"></rect>
                    </svg>)
                    }
                </div>
            </div>
        </div>
    )
}

export default cardViewer