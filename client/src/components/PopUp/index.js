import React, { useState } from 'react';
import styles from './PopUp.module.scss';

const PopUp = ({ title, isOpen, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
    // You can add additional logic or validation here before closing the modal
    onClose();
  };

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles['modal-content']}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <h2>{title}</h2>

        {/* Input Box */}
        <label htmlFor="input">Input:</label>
        <input
          type="text"
          id="input"
          value={inputValue}
          onChange={handleInputChange}
        />

        {/* Submit Button */}
        <button disabled={!inputValue} className={!inputValue? `${styles.disable}` : ''} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default PopUp;
