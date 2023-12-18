import React, { useEffect } from "react";
import { cross } from "../../../assets";
import styles from "./modal.module.scss";
import Scrollbars from "react-custom-scrollbars";

const Modal = ({
  show,
  onClose,
  title,
  children,
  containerClassName,
  overlayClassName,
  modalBodyClassName,
  modalHeaderClassName,
  isOutsideClickAllowed,
  showCloseIcon,
  background,
  isFullScreenPopupOnMobile = false,
  childClassName,
}) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <>
      {show ? (
        <div className={`${styles.modal} ${containerClassName}`}> 
          <div
            className={`${styles.overlay} ${overlayClassName} ${
              isOutsideClickAllowed ? "" : styles.disabledOutsideClick
            }`}
            onClick={onClose}
          />
          <div
            style={{ backgroundColor: background }}
            className={`${styles.modalContent} ${modalBodyClassName}`}
          >
            <div
              className={`${styles.modalHeader} ${modalHeaderClassName}`}
              // isFullScreenPopupOnMobile={String(isFullScreenPopupOnMobile)}
            >
              {title && <p>{title}</p>}
              {showCloseIcon && (
                <>
                  <img
                    src={cross}
                    alt="close"
                    className={`icon-close ${styles.close}`}
                    onClick={onClose}
                  />
                  {/* <div className={styles.goBack} onClick={onClose}>
                    `&quot;`goBack`&quot;`
                  </div> */}
                </>
              )}
            </div>
            <div className={`${styles.modalBody} ${childClassName}`}>
              {children}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

Modal.defaultProps = {
  containerClassName: "",
  overlayClassName: "",
  modalBodyClassName: "",
  modalHeaderClassName: "",
  isOutsideClickAllowed: true,
  showCloseIcon: true,
};

export default Modal;
