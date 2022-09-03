import React, { useContext, useState } from "react";

import { storage } from "../firebase.config";
import { getAllFoodItems, saveItem } from "../utils/firestoreSave";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { Context } from "../context/ContextProvider";
import { actType } from "../context/reducer";
import { categories } from "../utils/categories";

import { GrDocumentUpload } from "react-icons/gr";
import { BiRupee } from "react-icons/bi";
import { MdOutlineFoodBank } from "react-icons/md";

function CreateItemContainer() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Categories");
  const [imgCapture, setImgCapture] = useState(null);
  const [formFields, setFormFields] = useState(false);
  const [status, setStatus] = useState("failed");
  const [statusMsg, setStatusMsg] = useState("something went wrong");
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useContext(Context);

  const uploadimage = (e) => {
    setIsLoading(true);
    const imageResource = e.target.files[0];
    const storageRef = ref(
      storage,
      `Images/${Date.now()}-${imageResource.name}`
    );

    const uploadTask = uploadBytesResumable(storageRef, imageResource);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // const progress =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFormFields(true);
        setStatusMsg("Error while uploading!!!");
        setStatus("failed");
        setTimeout(() => {
          formFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgCapture(downloadURL);
          setIsLoading(false);
          setFormFields(true);
          setStatusMsg("Image Uploaded successfully");
          setStatus("success");
          setTimeout(() => {
            setFormFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const desertRef = ref(storage, imgCapture);
    deleteObject(desertRef).then(() => {
      setImgCapture(null);
      setIsLoading(false);
      setFormFields(true);
      setStatusMsg("Image Deleted Sucessfully");
      setStatus("sucess");
      setTimeout(() => {
        setFormFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !price || !category || !imgCapture) {
        setFormFields(true);
        setStatusMsg("fields can't be empty");
        setStatus("failed");
        setTimeout(() => {
          setFormFields(false);
          setIsLoading(false);
        }, 4000);
      } else if (category === "Categories") {
        setFormFields(true);
        setStatusMsg("Select a Valid Category");
        setStatus("failed");
        setTimeout(() => {
          setFormFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          qty: 1,
          title: title,
          category: category,
          imgCapture: imgCapture,
          price: price,
        };
        saveItem(data);
        setImgCapture(null);
        setIsLoading(false);
        setFormFields(true);
        setStatusMsg("Data Uploaded Sucessfully");
        clearData();
        setStatus("sucess");
        console.log("data saved");
        setTimeout(() => {
          setFormFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFormFields(true);
      setStatusMsg("Error while uploading!!!");
      setStatus("failed");
      setTimeout(() => {
        formFields(false);
        setIsLoading(false);
      }, 4000);
    }
    fetchData();
  };
  const clearData = () => {
    setTitle("");
    setCategory("Categories");
    setImgCapture(null);
    setPrice("");
  };
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actType.SET_FOOD_ITEMS,
        payload: data,
      });
    });
  };
  return (
    <div className=" bg-slate-200 w-screen h-screen flex flex-col justify-center items-center border-2 relative">
      {formFields && (
        <p
          className={`${
            status === "failed" ? "bg-red-500" : "bg-green-500"
          } p-3 px-8 capitalize rounded-l-md absolute right-1 top-16`}
        >
          {statusMsg}
        </p>
      )}
      <div className="p-6 w-[90%] sm:w-[75%] max-w-xl border-2 border-slate-300 rounded-md flex flex-col gap-4 font-bold">
        {/* title */}
        <div className="w-full border-b-2 border-white flex items-center gap-2 px-3">
          <div>
            <MdOutlineFoodBank size={"25px"} />
          </div>
          <input
            type="text"
            className="py-2 min-w-full text-base text-slate-700 bg-transparent outline-none rounded-sm"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Food Title"
          />
        </div>
        {/* categories */}
        <div className="w-full ">
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="py-2 px-3 min-w-full text-base text-slate-600 bg-white cursor-pointer outline-none rounded-md "
          >
            <option value="Categories">Select Categories</option>
            {categories &&
              categories.map((cat) => (
                <option
                  value={cat.name}
                  key={cat.id}
                  className="text-base border-0 outline-none capitalize text-slate-700"
                >
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
        {/* upload img */}
        <div className="w-full h-60 border-2 border-dotted border-white rounded-md flex justify-center items-center">
          {isLoading ? (
            <div className="text-center">
              <div role="status">
                <svg
                  className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {!imgCapture ? (
                <>
                  <label className="w-full h-full flex flex-col justify-center items-center cursor-pointer">
                    <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
                      <GrDocumentUpload
                        size={"28px"}
                        className="text-slate-400 hover:text-slate-600"
                      />
                      <p className="text-slate-400 hover:text-slate-600">
                        click to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      className="w-0 h-0"
                      onChange={uploadimage}
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full w-full">
                    <img
                      src={imgCapture}
                      alt="uploaded file"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={deleteImage}
                      className="absolute bottom-3 right-3 p-1 px-3 rounded-full bg-red-400 text-white text-xl cursor-pointer opacity-50 hover:opacity-100 outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                    >
                      X
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        {/* price */}
        <div className="w-full px-3 border-b-2 border-white flex items-center gap-2 ">
          <div>
            <BiRupee size={"25px"} />
          </div>
          <input
            type="text"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="py-2 min-w-full text-base text-slate-600 bg-transparent outline-none rounded-sm"
          />
        </div>

        <div>
          <button
            type="button"
            onClick={saveDetails}
            className="w-full font-bold text-slate-600 bg-yellow-200 py-2 px-4 rounded-xl shadow-lg hover:bg-slate-500 hover:text-yellow-200 active:scale-90 transition-all ease-in-out duration-500 "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateItemContainer;
