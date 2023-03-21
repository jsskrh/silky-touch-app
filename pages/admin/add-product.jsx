import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import CheckboxLayout from "../../components/CheckboxLayout";
import InputContainer from "../../components/Shipping/InputContainer";
import Layout from "../../components/Layout/Layout";
import PageTitle from "../../components/PageTitle";
import Logout from "../../components/Profile/Logout";
import TopContactUs from "../../components/TopContactUs";
import BrandBox from "../../components/AddProduct/BrandBox";
import SubcategoryBox from "../../components/AddProduct/SubcategoryBox";
import SubSubcategoryBox from "../../components/AddProduct/SubSubcategoryBox";
import ColorBox from "../../components/AddProduct/ColorBox";
import DetailsList from "../../components/AddProduct/DetailsList";
import Images from "../../components/AddProduct/Images";
import axios from "axios";

const style = {
  header: `py-6 border-t w-full border-[#e6e6e6] px-5`,
  headerTitle: `uppercase font-bold text-xs pl-1`,
  checkoutPanel: `pt-6 pb-10 px-10 border-t border-[#e6e6e6]`,
  formInstruction: `flex justify-end`,
  formInputsContainer: `grid grid-cols-2 gap-x-5`,
  input: `w-full resize-none bg-[#fff] px-[15px] py-[10px] border border-[#d7d7d7] hover:border-[#515151] placeholder:italic`,
  mobileSeparator: `md:hidden mb-20`,
  buttonContainer: `mb-8 md:w-1/2 pl-10`,
  button: `transition-all border px-[30px] py-[13px] w-full text-xs font-bold uppercase`,
  continueButton: `bg-[#212121] border-[#212121] text-[#ededed] hover:bg-[#000] hover:border-[#000] hover:text-[#fff]`,
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

const addProduct = () => {
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

  const submitHandler = async ({
    productName,
    price,
    brand,
    subcategory,
    subSubcategory,
    color,
    countInStock,
    details,
    description,
    images,
  }) => {
    console.log({
      productName,
      price,
      brand,
      subcategory,
      subSubcategory,
      color,
      countInStock,
      description,
      details,
      images,
    });
    dispatch(startSubmit());
    try {
      // const newProduct = {
      //   productName,
      //   price,
      //   brand,
      //   subcategory,
      //   subSubcategory,
      //   color,
      //   countInStock,
      //   description,
      //   details,
      //   images,
      // };
      const { data } = await axios.post(`/api/admin/products/add`, {
        name: productName,
        price,
        brand,
        subcategory,
        subSubcategory,
        color,
        countInStock,
        description,
        details,
        images,
      });
      console.log(data);
    } catch (error) {
      dispatch(submitFailure());
    }
    // dispatch({
    //   type: "SAVE_SHIPPING_ADDRESS",
    //   payload: {
    //     firstName,
    //     lastName,
    //     address,
    //     phoneNumber,
    //     postalCode,
    //     country,
    //     prefix,
    //   },
    // });
    // Cookies.set(
    //   "cart",
    //   JSON.stringify({
    //     ...cart,
    //     shippingAddress: {
    //       firstName,
    //       lastName,
    //       address,
    //       phoneNumber,
    //       postalCode,
    //       country,
    //       prefix,
    //     },
    //   })
    // );
    // router.push("/payment");
  };

  const subcategories = [
    {
      name: "Clothing",
      subSubcategories: [
        "Pants & Shorts",
        "Shirts",
        "Sweatshirts",
        "T-shirts",
        "Jackets & Coats",
      ],
    },
    { name: "Bags", subSubcategories: [] },
    {
      name: "Shoes",
      subSubcategories: [
        "Sneakers",
        "Derby Shoes",
        "Loafers & Slippers",
        "Boots",
        "Sandals & Slides",
      ],
    },
    {
      name: "Accessories",
      subSubcategories: [
        "Belts",
        "Wallets",
        "Sunglasses",
        "Eyeglass Frames",
        "Jewelry",
        "Watches",
        "Fragrances",
      ],
    },
    { name: "Underwear and Beachwear", subSubcategories: ["Bathrobes"] },
  ];

  const subcategory = watch("subcategory");
  const [selectedSubcategory, setSelectedSubcategory] = useState();

  useEffect(() => {
    const selectedSubcategory = subcategories.find(
      (category) => category.name === subcategory
    );
    setSelectedSubcategory(selectedSubcategory);
  }, [subcategory]);

  const [items, setItems] = useState([]);

  const onAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const onRemoveItem = (itemToRemove) => {
    const updatedItems = items.filter((item) => item !== itemToRemove);
    setItems(updatedItems);
  };

  useEffect(() => {
    setValue("details", items);
  }, [items]);

  const [images, setImages] = useState([]);

  const onAddImage = (newImage) => {
    setImages([...images, newImage]);
  };

  const onRemoveImage = (imageToRemove) => {
    const updatedImages = images.filter((image) => image !== imageToRemove);
    setImages(updatedImages);
  };

  useEffect(() => {
    setValue("images", images);
  }, [images]);

  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout title="Order History" bgColor={`bg-[#f5f5f5]`}>
      {!isMobile && <TopContactUs />}
      <PageTitle title="Add Product" />
      <Logout />
      <div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <legend className={style.header}>
            <h2 className={style.headerTitle}>Product Information</h2>
          </legend>
          <div className={style.checkoutPanel}>
            <div className={style.formInstruction}>
              <span>* Required fields</span>
            </div>
            <div className={style.formInputsContainer}>
              <InputContainer
                id="productName"
                label="Product Name"
                error={errors.productName && errors.productName.message}
                fullWidth
              >
                <input
                  type="text"
                  className={style.input}
                  id="productName"
                  placeholder="Please enter the product name"
                  {...register("productName", {
                    required: "Please enter the product name",
                  })}
                />
              </InputContainer>

              <InputContainer
                id="brand"
                label="Brand"
                error={errors.brand && errors.brand.message}
                fullWidth
              >
                <Controller
                  name="brand"
                  control={control}
                  // defaultValue="Please select"
                  rules={{
                    required: "Please select a brand",
                    validate: (value) =>
                      value !== "Please select" || "Please enter a brand",
                  }}
                  render={({ field }) => <BrandBox {...field} />}
                />
              </InputContainer>

              <InputContainer
                id="subcategory"
                label="Category"
                error={errors.subcategory && errors.subcategory.message}
                fullWidth
              >
                <Controller
                  name="subcategory"
                  control={control}
                  defaultValue="Please select"
                  rules={{
                    required: "Please select a category",
                    validate: (value) =>
                      value !== "Please select" || "Please select a category",
                  }}
                  render={({ field }) => <SubcategoryBox {...field} />}
                />
              </InputContainer>

              <InputContainer
                id="subSubcategory"
                label="Subcategory"
                error={errors.subSubcategory && errors.subSubcategory.message}
                fullWidth
              >
                <Controller
                  name="subSubcategory"
                  control={control}
                  defaultValue="Please select"
                  rules={{
                    required: "Please select a subcategory",
                    validate: (value) =>
                      value !== "Please select" ||
                      "Please select a subcategory",
                  }}
                  render={({ field, ...props }) => (
                    <SubSubcategoryBox
                      {...field}
                      {...props}
                      subcategory={selectedSubcategory}
                    />
                  )}
                />
              </InputContainer>

              <InputContainer
                id="price"
                label="Price"
                error={errors.price && errors.price.message}
                fullWidth
              >
                <input
                  type="number"
                  className={style.input}
                  id="price"
                  placeholder="Please enter the product price"
                  {...register("price", {
                    required: "Please enter the product price",
                  })}
                />
              </InputContainer>

              <InputContainer
                id="countInStock"
                label="Count In Stock"
                error={errors.countInStock && errors.countInStock.message}
                fullWidth
              >
                <input
                  type="number"
                  className={style.input}
                  id="countInStock"
                  placeholder="Please enter the count in stock"
                  {...register("countInStock", {
                    required: "Please enter the count in stock",
                  })}
                />
              </InputContainer>

              <InputContainer
                id="description"
                label="Description"
                error={errors.description && errors.description.message}
                fullWidth
              >
                <textarea
                  className={style.input}
                  name="description"
                  id="description"
                  rows="7"
                  {...register("description", {
                    required: "Please enter the product description",
                  })}
                />
              </InputContainer>

              <InputContainer
                id="color"
                label="Color"
                error={errors.color && errors.color.message}
                fullWidth
              >
                <Controller
                  name="color"
                  control={control}
                  defaultValue="Please select"
                  rules={{
                    required: "Please select a color",
                    validate: (value) =>
                      value !== "Please select" || "Please enter a color",
                  }}
                  render={({ field }) => <ColorBox {...field} />}
                />
              </InputContainer>

              <InputContainer
                id="details"
                label="Product Details"
                error={errors.details && errors.details.message}
                fullWidth
              >
                <Controller
                  name="details"
                  control={control}
                  rules={{
                    required: "Please enter product details",
                    validate: (value) =>
                      value !== "Please enter product details" || [],
                  }}
                  render={({ field }) => (
                    <DetailsList
                      defaultValue={[]}
                      onChange={(value) => setValue("details", value)}
                      items={items}
                      onAddItem={onAddItem}
                      onRemoveItem={onRemoveItem}
                    />
                  )}
                />
              </InputContainer>

              <InputContainer
                id="images"
                label="Images"
                error={errors.images && errors.images.message}
                fullWidth
              >
                <Controller
                  name="images"
                  control={control}
                  rules={{
                    required: "Please upload product images",
                    validate: (value) => {
                      if (!Array.isArray(value)) {
                        return "Images must be an array";
                      } else if (
                        !value.find((item) => item.type === "primary")
                      ) {
                        return "Images must contain at least one primary image";
                      } else if (value.length < 3) {
                        return "Images must contain at least three images";
                      } else if (
                        new Set(value.map((item) => item.type)).size !==
                        value.length
                      ) {
                        return "Image types cannot be repeated";
                      } else {
                        const invalidFiles = value.filter(
                          (item) => !/\.(jpg|webp|avif|png)$/i.test(item.url)
                        );
                        if (invalidFiles.length > 0) {
                          return `Invalid file type(s): ${invalidFiles
                            .map((item) => item.type)
                            .join(", ")}`;
                        }
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <Images
                      defaultValue={[]}
                      onChange={(value) => setValue("images", value)}
                      images={images}
                      onAddImage={onAddImage}
                      onRemoveImage={onRemoveImage}
                    />
                  )}
                />
              </InputContainer>
            </div>
          </div>

          <div className={style.buttonContainer}>
            <button
              className={`${style.button} ${style.continueButton}`}
              disabled={isLoading}
            >
              {isLoading ? "Processing" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
      <div className={style.mobileSeparator}></div>
      {isMobile && <TopContactUs isMobile />}
    </Layout>
  );
};

export default addProduct;
