import "./Overlay.scss";
import { ReactComponent as Success } from "../assets/Correct.svg";
import { ReactComponent as Failed } from "../assets/Failed.svg";
import { ReactComponent as Close } from "../assets/close.svg";
import { useEffect } from "react";
import useFormDataContext from "../helpers/useFormContext";

export default function Overlay() {
  const { isModalHidden, setIsModalHiddenStatus, isSuccess, errorMessage } =
    useFormDataContext();

  useEffect(() => {
    const removeOverlay = function (e) {
      e.preventDefault();
      if (e.target.classList.contains("popup")) return;

      setIsModalHiddenStatus(true);
    };

    document.addEventListener("click", removeOverlay);

    return () => document.removeEventListener("click", removeOverlay);
  }, []);

  const handleClose = () => {
    setIsModalHiddenStatus((prev) => (prev ? false : !prev));
  };

  return (
    <section className={`overlay ${isModalHidden ? "hidden" : ""}`}>
      <div className="popup">
        {isSuccess ? <Success /> : <Failed />}

        <h3>
          {isSuccess ? "Email Added Successfully" : "Invalid Email Address"}
        </h3>

        <p>
          {isSuccess
            ? "You’re in! Stay tuned for Ventarca’s launch and enjoy 3 months free as our thank you."
            : errorMessage}
        </p>

        <span onClick={() => handleClose()} className="close">
          <Close />
        </span>
      </div>
    </section>
  );
}
