import { useEffect, useRef, useReducer, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import InputContainer from "../Shipping/InputContainer";
import { Controller } from "react-hook-form";
import TypeBox from "./TypeBox";
import axios from "axios";

const style = {
  card: `text-sm`,
  cardInner: `py-12 md:h-[545.6px] flex flex-col cursor-pointer`,
  formHidden: `bg-[#212121] hover:bg-[#515151] justify-center text-center px-[19%]`,
  showForm: `bg-[#fefefe] px-5`,
  heroIcon: `text-white`,
  form: `cursor-auto flex flex-col justify-between h-full`,
  input: `w-full resize-none bg-[#fff] px-[15px] py-[10px] border border-[#d7d7d7] hover:border-[#515151] placeholder:italic`,
  buttonContainer: ``,
  button: `transition-all mb-8 border px-[30px] py-[13px] w-full text-xs font-bold uppercase`,
  continueButton: `bg-[#212121] border-[#212121] text-[#ededed] hover:bg-[#000] hover:border-[#000] hover:text-[#fff]`,
  closeContainer: `flex justify-center`,
  close: `uppercase pt-0 p-2 font-bold text-xs flex cursor-pointer text-[#212121] hover:text-[#757575] relative hover:after:bg-[#757575] after:absolute after:content-[''] after:w-full after:top-5 hover:after:h-[1px] after:left-0 after:right-0`,
};

const START_SUBMIT = "START_SUBMIT";
const SUBMIT_SUCCESS = "SUBMIT_SUCCESS";
const SUBMIT_FAILURE = "SUBMIT_FAILURE";

const startSubmit = () => ({
  type: START_SUBMIT,
});

const submitSuccess = (data) => ({
  type: SUBMIT_SUCCESS,
  payload: data,
});

const submitFailure = () => ({
  type: SUBMIT_FAILURE,
});

const submitReducer = (state, action) => {
  switch (action.type) {
    case START_SUBMIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case SUBMIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case SUBMIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

const AddSubategory = ({ parentId }) => {
  const [{ isLoading, isError, data }, dispatch] = useReducer(submitReducer, {
    isLoading: false,
    data: null,
    isError: false,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm();

  const submitHandler = async ({ name, title, subtitle }) => {
    console.log({
      name,
      title,
      subtitle,
    });

    dispatch(startSubmit());
    try {
      const { data } = await axios.post(`/api/admin/settings/catalogue/add`, {
        name,
        title,
        subtitle,
        type: parentId ? "subSubcategory" : "subcategory",
        parentId: parentId ? parentId : null,
      });
      dispatch(submitSuccess(data));
    } catch (error) {
      dispatch(submitFailure());
    }
  };

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (data) {
      window.location.reload();
    }
  }, [data]);

  return (
    <div className={style.card}>
      <div
        className={`${style.cardInner} ${
          showForm ? style.showForm : style.formHidden
        }`}
      >
        {showForm ? (
          <form onSubmit={handleSubmit(submitHandler)} className={style.form}>
            <InputContainer
              id="name"
              label="Name"
              error={errors.name && errors.name.message}
              fullWidth
            >
              <input
                type="text"
                className={style.input}
                id="name"
                placeholder="Please enter the category name"
                {...register("name", {
                  required: "Please enter the category name",
                })}
              />
            </InputContainer>
            <InputContainer
              id="title"
              label="Title"
              error={errors.title && errors.title.message}
              fullWidth
            >
              <input
                type="text"
                className={style.input}
                id="title"
                placeholder="Please enter the category title"
                {...register("title", {
                  required: "Please enter the category title",
                })}
              />
            </InputContainer>
            {/* <InputContainer
              id="type"
              label="Type"
              error={errors.type && errors.type.message}
              fullWidth
            >
              <Controller
                name="type"
                control={control}
                defaultValue="Please select"
                rules={{
                  required: "Please select a type",
                  validate: (value) =>
                    value !== "Please select" || "Please select a type",
                }}
                render={({ field }) => <TypeBox {...field} />}
              />
            </InputContainer> */}
            <InputContainer
              id="subtitle"
              label="Subtitle"
              error={errors.subtitle && errors.subtitle.message}
              fullWidth
            >
              <textarea
                className={style.input}
                name="subtitle"
                id="subtitle"
                rows="3"
                {...register("subtitle")}
              />
            </InputContainer>
            <div className={style.buttonContainer}>
              <button
                className={`${style.button} ${style.continueButton}`}
                disabled={isLoading}
              >
                {isLoading ? "Processing" : "Add Category"}
              </button>
              <div className={style.closeContainer}>
                <span
                  className={style.close}
                  onClick={() => setShowForm(false)}
                >
                  Close
                </span>
              </div>
            </div>
          </form>
        ) : (
          <PlusIcon
            className={style.heroIcon}
            onClick={() => setShowForm(true)}
          />
        )}
      </div>
    </div>
  );
};

export default AddSubategory;
