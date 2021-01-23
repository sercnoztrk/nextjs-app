import { useEffect, useRef, useState } from "react";
import styles from "../styles/utils.module.css";


function CardUploader() {
  const imageRef = useRef()
  const [errorMsg, setErrorMsg] = useState('')
  const [isTitleFilled, setTitleState] = useState(false)
  const [isDescriptionFilled, setDescriptionState] = useState(false)
  const [isImageFilled, setImageState] = useState(false)

  async function onSubmit(e) {
    // e.preventDefault()
    const formData = new FormData()
    if (imageRef.current.files[0]) {
      formData.append('imageFile', imageRef.current.files[0])
      formData.append("imageUrl", imageRef.current.url)
    }
    formData.append("title", e.target.title.value)
    formData.append("desc", e.target.description.value)
    const res = await fetch('/api/card', {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      body: formData
    });
    e.target.title.value = "New Title"
    e.target.description.value = "New description"
    imageRef.current.files = new FileList()
    if (res.status === 200) {
      console.log(await res.text());
    } else {
      setErrorMsg(await res.text());
    }
  }

  function changeEvent(event) {
    const name = event.target.name
    const val = event.target.value
    const states = {
      title: setTitleState,
      description: setDescriptionState,
      image: setImageState
    }
    if (val)  states[name](true)
    else      states[name](false)
    if (imageRef.current.files[0]) {
      imageRef.current.url = URL.createObjectURL(imageRef.current.files[0])
    }
  }

  function selectInput(event) {
    event.target.focus()
    setTimeout(() => {
      event.target.select()
    }, 100);
  }
  return (
    <form onSubmit={onSubmit}>
      { errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null }
      <div className={`${styles.shadow_sm} ${styles.card} ${styles.cardTopNotch}`}>New Title</div>
      <div className={`${styles.shadow_sm} ${styles.card}`}>
        <div className={styles.card_body}>
          <div>
            <div>
              <label htmlFor="title" >
                <input className={styles.cardTitle} id="title" type="text" name="title" defaultValue="New title" onChange={(e) => changeEvent(e)} onClick={(e) => selectInput(e)} required/>
              </label>
            </div>
            <div className={styles.cardDescriptionArea}>
              <label htmlFor="description">
                <textarea id="description" type="text" name="description" defaultValue="New description" width="100%" onChange={(e) => changeEvent(e)} onClick={(e) => selectInput(e)} required/>
              </label>
            </div>
          </div>
          <div className={styles.imgInputContainer}>
            <input type="file" id="image" name="image" accept="image/png, image/jpeg" ref={imageRef} onChange={(e) => changeEvent(e)} className={styles.inputFile}/>
            {isImageFilled ?
              (<img src={imageRef.current.url}  width="286" height="auto"></img>) : // onLoad={() => {URL.revokeObjectURL(imageRef.current.url)}}
              (
                <svg className={`${styles.bd_placeholder_img} ${styles.card_img_bottom}`} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#C56E4F"></rect>
                  <line xmlns="http://www.w3.org/2000/svg" x1="143" y1="80" x2="143" y2="130" stroke="white" strokeWidth="3"/>
                  <line xmlns="http://www.w3.org/2000/svg" x1="118" y1="105" x2="168" y2="105" stroke="white" strokeWidth="3"/>
                  <text x="41.5%" y="65%" fill="#eceeef" dy=".3em">Image</text>
                </svg>
              )}
          </div>
          <div className={styles.btn_container}>
            <button type="submit" className={styles.btn} disabled={!isTitleFilled || !isDescriptionFilled || !isImageFilled}>Add</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CardUploader