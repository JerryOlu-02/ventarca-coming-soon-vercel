import axios from "axios";
import { createContext, useState } from "react";

const FormContext = createContext();

const FormProvider = function ({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isModalHidden, setIsModalHidden] = useState(true);

  const [errorMessage, setError] = useState("");

  const setLoadingStatus = (status) => setIsLoading(status);
  const setSuccessStatus = (status) => setIsSuccess(status);
  const setErrorStatus = (status) => setIsError(status);
  const setIsModalHiddenStatus = (status) => setIsModalHidden(status);
  const setErrorMessage = (status) => setError(status);

  const createContact = async function ({ email }) {
    const apiKey = import.meta.env.VITE_BREVO_API_KEY;

    //   POST data to Brevo

    const response = await axios.post("/api/submit", {
      email_address: email,
      // listIds: [2],
    });

    // console.log(response);

    return response;
  };

  const dataValue = {
    isLoading,
    isError,
    isSuccess,
    isModalHidden,
    errorMessage,
    setErrorMessage,
    setIsModalHiddenStatus,
    setLoadingStatus,
    setErrorStatus,
    setSuccessStatus,
    createContact,
  };

  return (
    <FormContext.Provider value={dataValue}>{children}</FormContext.Provider>
  );
};

export { FormProvider };

export default FormContext;
