import React from 'react'
import styles from "./rightbar.module.css"
import Image from 'next/image'
import { MdPlayCircleFilled, MdReadMore } from 'react-icons/md'
const RightBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image src="/astronaut.png" alt='' fill className={styles.bg} />
        </div>
        <div className={styles.texts}> 
          <span className={styles.notification}>Available Now</span>
          <h3 className={styles.title}>how to use the new version of elyas admin dashboard</h3>
          <span className={styles.subtitle}>take 4 minutes to learn</span>
          <p className={styles.description}>you can powerful management your own business
            with powerful tools that elyas provide it you </p>
          <button className={styles.button}>
            <MdPlayCircleFilled />
            Watch
          </button>

        </div>

      </div>
       <div className={styles.item}>
        <div className={styles.texts}> 
          <span className={styles.notification}>Coming Soon</span>
          <h3 className={styles.title}>how to use the new version of elyas admin dashboard</h3>
          <span className={styles.subtitle}>take 4 minutes to learn</span>
          <p className={styles.description}>you can powerful management your own business
            with powerful tools that elyas provide it you </p>
          <button className={styles.button}>
            <MdReadMore/>
            Learn
          </button>

        </div>

      </div>
    </div>
  )
}

export default RightBar