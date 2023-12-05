import React from 'react';
import styles from './loader.module.scss';

const Loader = ({ text, loading, showOnFullScreen = true }) => {
  return loading ? (
    <div
      className={`${styles.loading} ${showOnFullScreen ? styles.positionFixed : styles.fullScreen}`}
    >
      {text && <div>{text}</div>}
    </div>
  ) : null;
};

export default Loader;
