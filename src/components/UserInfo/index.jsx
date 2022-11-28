import React from "react";

// -- Styles
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatarUrl, fullName, additionalText, rank }) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={
          avatarUrl
            ? `http://localhost:4444${avatarUrl}`
            : "./images/noavatar.png"
        }
        alt={fullName}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>
          {fullName}{" "}
          <span className={rank === "user" ? styles.rank : styles.admin}>
            {rank}
          </span>
        </span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
