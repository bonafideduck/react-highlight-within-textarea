import React from 'react';
import styles from './styles/styles.css';

export const HighlightWithinTextarea = ({ height = '120px' , width = '260px' }) => (
  <div className={styles.container}>
    <img
      style={{ height, width }}
      src='https://www.twilio.com/marketing/bundles/company/img/logos/red/twilio-logo-red.png'
      alt='Twilio logo in red.'
    />
  </div>
)

