import React, { useState, useEffect } from 'react';
import styles from './permission-requestor.module.css';

export const PermissionRequestor = () => {
  const [state, setState] = useState({ permission: 'unknown' });
  useEffect(() => {
    if ('Notification' in window) setState(state => ({ ...state, permission: Notification.permission }));
  }, [setState]);

  const requestNotificationPermission = () => {
    Notification.requestPermission().then(permission => {
      setState(state => ({ ...state, permission }));
    });
  };

  if (!('Notification' in window)) {
    return <div>No notification in this browser</div>;
  }
  return (
    <>
      <div className={styles.permissionRequestor}>
        <div>Notification permission: {state.permission}</div>
        {state.permission === 'default' && (
          <button className={styles.button} onClick={requestNotificationPermission}>
            Request notification permission
          </button>
        )}
      </div>
    </>
  );
};
