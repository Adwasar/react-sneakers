import React from 'react';
import ContentLoader from 'react-content-loader';

import styles from './CardLoader.module.scss';

function CardLoader() {
  return (
    <div className={styles.card}>
      <ContentLoader
        speed={2}
        width={158}
        height={228}
        viewBox="0 0 158 228"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="10" ry="10" width="133" height="112" />
        <rect x="0" y="135" rx="3" ry="3" width="158" height="15" />
        <rect x="0" y="153" rx="3" ry="3" width="95" height="15" />
        <rect x="0" y="194" rx="3" ry="3" width="80" height="24" />
        <rect x="126" y="191" rx="3" ry="3" width="32" height="32" />
      </ContentLoader>
    </div>
  );
}

export default CardLoader;
