import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, INQUIRIES } from "../../../constants/api";
import axios from "axios";
import FormError from "../../common/FormError";
import SuccessMessage from "../../common/SuccessMessage";

const api = BASE_URL + INQUIRIES;

const schema = yup.object().shape({
  fullname: yup.string().required("Please enter your name"),
  phone: yup.string().required("Please enter your last name"),
  email: yup.string().required("Please enter an email address"),
  message: yup.string().required("Please enter your message"),
  checkin: yup.string().required("Please enter your date"),
  checkout: yup.string().required("Please enter your date"),
});

export default function InquiryForm() {
  const [submitting, setSubmitting] = useState(false);
  const [inquiryError, setInquiryError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors);

  async function onSubmit(data) {
    try {
      setSubmitting(true);
      setInquiryError(null);
      const response = await axios.post(api, { data });

      if (response.status === 200) {
        setTimeout(() => {
          let inputs = document.querySelectorAll("input");
          inputs.forEach((input) => (input.value = ""));
          setSuccessMessage(true);
        }, 2000);

        setTimeout(() => {
          const success = document.querySelector(".success-message");

          success.style.display = "none";
        }, 5000);
      }
    } catch (error) {
      console.log("error", error);
      setInquiryError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={submitting}>
        {inquiryError && <FormError>{inquiryError}</FormError>}
        <div className="success-message">{successMessage ? <SuccessMessage /> : null}</div>

        <div className="form-contents">
          <h3>Reservation Inquiry</h3>
          <label>Fullname</label>
          <input name="fullname" placeholder="Fullname" {...register("fullname")} />
          {errors.fullname && <span>{errors.fullname.message}</span>}
        </div>

        <div className="form-contents">
          <label>Phone</label>
          <input name="phone" placeholder="Phone" {...register("phone")} type="number" />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>

        <div className="form-contents">
          <label>Email</label>
          <input name="email" placeholder="Email" {...register("email")} type="email" />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="form-contents">
          <label>Check in</label>
          <input name="checkin" placeholder="date" {...register("checkin")} type="date" />
          {errors.checkin && <span>{errors.checkin.message}</span>}
        </div>

        <div className="form-contents">
          <label>Check out</label>
          <input name="checkout" placeholder="date" {...register("checkout")} type="date" />
          {errors.checkout && <span>{errors.checkout.message}</span>}
        </div>

        <div className="Message-input">
          <label>Message</label>
          <input name="message" placeholder="message" {...register("message")} type="text" />
          {errors.message && <span>{errors.message.message}</span>}
        </div>

        <div className="form-contents">
          <button>{submitting ? "Wait.." : "Submit"}</button>
        </div>
      </fieldset>
    </form>
  );
}
