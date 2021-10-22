import "./modal.css";

const Modal = ({ handleClose, show, formData }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <form className="form-conatianer-m" onSubmit={formData}>
          <p>Minutes</p>
          <input className="form-input" name="minutes" type="number" />
          <p className="form-name">Seconds</p>
          <input className="form-input" name="seconds" type="number" />
          <button className="submit-btn" type="submit" onClick={handleClose}>
            Submit
          </button>
        </form>
        {/* <button type="button" onClick={handleClose}>
          Close
        </button> */}
      </section>
    </div>
  );
};


export default Modal;
