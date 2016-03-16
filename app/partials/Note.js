import React from 'react';

import styles from './Note.css';

export default class Note extends React.Component {
  render() {
    return (
      <div>
        <h2 className={styles.h2}>This is Note.js</h2>
      </div>
    );
  }
}
