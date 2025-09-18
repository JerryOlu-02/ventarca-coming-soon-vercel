const sumbitContact = async function (
  data,
  createContact,
  setLoadingStatus,
  setSuccessStatus,
  setErrorStatus,
  setIsModalHiddenStatus,
  setErrorMessage
) {
  // if (errors.email) {
  //   setErrorMessage(
  //     "You seem to have entered an invalid email address. Ensure you email address is of the format ‘username@mailhost.com’."
  //   );
  //   setSuccessStatus(false);
  //   setIsModalHiddenStatus(false);
  //   return;
  // }

  try {
    setLoadingStatus(true);

    // Send data to Brevo
    const response = await createContact(data);
    // console.log("Response:", response);

    // Handle response if successful
    if (response.status === 200) {
      setSuccessStatus(true);
      setIsModalHiddenStatus(false);
      setLoadingStatus(false);
      setErrorStatus(false);
    }
  } catch (error) {
    // Handle error
    setErrorMessage(error?.response?.data?.error);
    setErrorStatus(true);

    setLoadingStatus(false);
    setSuccessStatus(false);
    setIsModalHiddenStatus(false);

    // console.log(error);

    console.log(
      "Error creating contact:",
      error.response ? error.response.data : error.message
    );
  }
};

export default sumbitContact;
