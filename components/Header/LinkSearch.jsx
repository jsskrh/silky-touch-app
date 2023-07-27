import { useEffect, useRef, useState, useReducer } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ProductItem from "../ProductCatalogue/ProductItem";

const style = {
  navIcon: `flex items-center mx-2 pb-8`,
  // rightMenu: `relative`,
  menuButton: `align-top`,
  heroIcon: `h-4 w-4`,
  productsGrid: `pt-4 mx-4 grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4`,
  input: `w-full text-[0.93rem] border-b border-b-[#757575] h-[39px] py-[10px] pl-8`,
  heroIconContainer: `absolute left-0 bottom-[5px] h-[34px] py-[7px] px-[5px] flex items-center`,
  searchBox: `p-8 bg-[#fff] border-y border-t-[#212121] border-l border-l-[#eee] border-b-[#eee] max-h-[calc(100vh-114px)] w-[814px] absolute right-0`,
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

const LinkSearch = () => {
  const [{ isLoading, isError, data }, dispatch] = useReducer(submitReducer, {
    isLoading: false,
    data: [],
    isError: false,
  });

  const [showSearch, setShowSearch] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  let query = [];
  const instantSearch = async () => {
    query = watch("search");
    if (query.length >= 3) {
      console.log(query);
      try {
        const { data } = await axios.get(`/api/search`, { params: { query } });
        dispatch(submitSuccess(data));
        console.log("data", data);
      } catch (error) {
        // dispatch(submitFailure());
        console.log(error);
      }
    }
  };

  return (
    <Menu as="div" className={style.rightMenu}>
      <Menu.Button
        onClick={() => setShowSearch(!showSearch)}
        className={style.menuButton}
      >
        <div className={style.navIcon}>
          {showSearch ? (
            <XMarkIcon className={style.heroIcon} />
          ) : (
            <MagnifyingGlassIcon className={style.heroIcon} />
          )}
        </div>
      </Menu.Button>

      <Transition show={showSearch}>
        <div className={style.searchBox}>
          <div>
            <div>
              <form>
                <div className={`relative`}>
                  <input
                    type="text"
                    {...register("search", {
                      required: "Please enter your search query",
                      // pattern: {
                      //   value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      //   message: "Please enter valid Email Address",
                      // },
                    })}
                    className={style.input}
                    id="search"
                    name="search"
                    placeholder="Search"
                    auto-focus
                    onKeyUp={instantSearch}
                  />
                  <div className={style.heroIconContainer}>
                    <MagnifyingGlassIcon className={style.heroIcon} />
                  </div>
                </div>
              </form>
            </div>
            {data.length >= 1 ? (
              <div className={style.productsGrid}>
                {data.map((product) => (
                  <ProductItem product={product} key={product._id} />
                ))}
              </div>
            ) : (
              <div>
                <div className={`lg:max-w-[478px] mx-auto py-8`}>
                  <div className={`flex flex-col items-center`}>
                    <h3 className={`mb-2 uppercase font-bold text-xl`}>
                      No Results Found
                    </h3>
                    <p className={`pb-8 text-[#757575]`}>
                      Please try again with different keywords
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Transition>
    </Menu>
  );
};

export default LinkSearch;
