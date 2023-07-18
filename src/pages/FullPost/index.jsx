import React from 'react';
import styles from './FullPost.module.scss';
import { FullPostForm } from 'modules';

export const FullPost = () => {
  return (
    <div className={styles.wrapper}>
      <FullPostForm />
    </div>
  );
};
