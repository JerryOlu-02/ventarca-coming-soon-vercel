import FormContext from "../context/formContext";
import { useContext } from "react";

const useFormDataContext = function () {
  return useContext(FormContext);
};

export default useFormDataContext;
