import "swiper/css";
import "swiper/css/pagination";
import "./Landing.scss";

import useFormDataContext from "../helpers/useFormContext";

import { ReactComponent as LinkedIn } from "../assets/linkedin.svg";
import { ReactComponent as X } from "../assets/x.svg";
import { ReactComponent as Insta } from "../assets/insta.svg";
import { ReactComponent as Facebook } from "../assets/fb.svg";
import { ReactComponent as YT } from "../assets/yt.svg";
import { ReactComponent as Loading } from "../assets/arrow-repeat.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import gsap from "gsap";
import CustomEase from "gsap/dist/CustomEase";
import { useGSAP } from "@gsap/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Overlay from "../components/Overlay";
import sumbitContact from "../helpers/createContact";

import { useRef } from "react";
import { revealText } from "../helpers/revealTextGsap";

gsap.registerPlugin(CustomEase);
CustomEase.create("cubic-text", "0.25, 1, 0.5, 1");

export default function Landing() {
  const { isModalHidden } = useFormDataContext();

  return (
    <>
      <section className="landing">
        <Mail />
        <Slider />
        {!isModalHidden && <Overlay />}
      </section>
    </>
  );
}

function Mail() {
  const mailRef = useRef(null);

  const {
    createContact,
    setLoadingStatus,
    setSuccessStatus,
    setErrorStatus,
    setIsModalHiddenStatus,
    setErrorMessage,
    isLoading,
  } = useFormDataContext();

  // Validiate email
  const schema = yup
    .object({
      email: yup.string().email().required(),
    })
    .required();

  // Handle Form Data
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit Functionality
  const onSubmit = async (data) => {
    await sumbitContact(
      data,
      createContact,
      setLoadingStatus,
      setSuccessStatus,
      setErrorStatus,
      setIsModalHiddenStatus,
      setErrorMessage
    );
    reset();
  };

  useGSAP(
    () => {
      revealText(".reveal, .form-div");
    },

    { scope: mailRef }
  );

  return (
    <section ref={mailRef} className="mail">
      <aside className="nav">
        <div className="logo hide-text">
          <p className="reveal">Ventarca</p>
        </div>

        <a className="btn" href="mailto:ventarcahq@gmail.com">
          Email Us
        </a>
      </aside>

      <aside className="content">
        <div className="text">
          <div className="hide-text">
            <p className="reveal">— Coming Soon</p>
          </div>

          <div className="hide-text">
            <h2 className="reveal">
              Get Notified <br /> When we Launch
            </h2>
          </div>

          <div className="hide-text">
            <p className="reveal">And get 3 months free access...</p>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-div">
            <input
              {...register("email", { required: true })}
              className="email"
              type="email"
              placeholder="Enter your email address"
            />
            <button type="submit" className="btn">
              {isLoading ? (
                <span className="loading">
                  <Loading />
                </span>
              ) : (
                "Notify Me"
              )}
            </button>
          </div>
        </form>

        <div className="hide-text">
          <p className="reveal">*Don’t worry, we will not spam you.</p>
        </div>
      </aside>

      <aside className="footer">
        <div className="socials hide-text">
          <LinkedIn className="reveal" />
          <X className="reveal" />
          <Insta className="reveal" />
          <Facebook className="reveal" />
          <YT className="reveal" />
        </div>

        <div className="hide-text">
          <p className="reveal">© Copyright 2025.</p>
        </div>
      </aside>

      <div className="ellipse"></div>
    </section>
  );
}

function Slider() {
  const sliderRef = useRef(null);

  useGSAP(
    () => {
      revealText(".reveal");
    },
    { scope: sliderRef }
  );
  return (
    <section ref={sliderRef} className="slider">
      <Swiper
        pagination={{
          clickable: true,
        }}
        // centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        // spaceBetween={48}
        breakpoints={{
          320: {
            spaceBetween: "24px",
          },
          990: {
            spaceBetween: "48px",
          },
        }}
        className="mySwiper slider__wrapper"
      >
        <SwiperSlide className="slide__item">
          <div className="hide-text">
            <h3 className="reveal">Connect. Negotiate. Close.</h3>
          </div>

          <div className="hide-text">
            <p className="reveal">
              Whether you’re buying or selling, Ventarca gives you the tools to
              manage the full journey. From saved searches and alerts to
              in-platform messaging and due diligence reports, you stay in
              control at every step.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="slide__item">
          <div className="hide-text">
            <h3 className="reveal">Every Business, Crystal Clear.</h3>
          </div>

          <div className="hide-text">
            <p className="reveal">
              Browse high-quality, vetted listings with key details like
              valuation, revenue, and growth potential. Our smart filters and
              search tools make it easy to find the perfect match for your
              goals.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="slide__item">
          <div className="hide-text">
            <h3 className="reveal">Deals Built on Trust.</h3>
          </div>

          <div className="hide-text">
            <p className="reveal">
              With verified accounts, clear pricing plans, and optional
              brokerage support, you never have to guess what’s behind the
              curtain. Ventarca is designed to make every transaction fair,
              simple, and transparent.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
