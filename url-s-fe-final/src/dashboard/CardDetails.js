import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUrl, fetchUrls, updateUrl } from "../slice/urlApi";
import { useForm } from "react-hook-form";
import useClippy from "use-clippy";
import { saveUpdatedUrl } from "../slice/urlSlice";

export default function CardDetails({ urlDetails }) {
  const dispatch = useDispatch();
  const [clipboard, setClipboard] = useClippy();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [editModeEnabled, setEditModeEnabled] = useState(false);

  const removeUrl = async (id) => {
    await dispatch(deleteUrl(id)).unwrap();
    dispatch(fetchUrls());
  };

  useEffect(() => {
    if (editModeEnabled) {
      console.log("reseting to short urls");
      reset({ shortUrl: urlDetails.shortUrl });
    }
  }, [editModeEnabled]);

  const editUrl = async (data) => {
    if (editModeEnabled) {
      await dispatch(
        updateUrl({ id: urlDetails._id, shortUrl: data.shortUrl })
      ).unwrap();
      dispatch(saveUpdatedUrl({ ...urlDetails, shortUrl: data.shortUrl }));
    }
    setEditModeEnabled(!editModeEnabled);
  };

  return (
    <div className="mb-3 max-w-[1200px] mx-auto">
      <div className="border rounded-md p-4 bg-white shadow-sm">
        {/* Full URL Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center mb-4">
          <div className="w-full md:w-1/6 font-bold">Full URL:</div>
          <div className="w-full md:w-4/6 break-words">
            <p>{urlDetails.originalUrl}</p>
          </div>
          <div className="w-full md:w-1/6 text-center mt-4 md:mt-0">
            <button
              type="button"
              onClick={() => removeUrl(urlDetails._id)}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Shorten URL Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="w-full md:w-1/6 font-bold">Shorten URL:</div>
          <div className="w-full md:w-4/6 flex items-center space-x-2">
            <a
              href={`http://localhost:8000/${urlDetails.shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              http://localhost:8000/{!editModeEnabled && urlDetails.shortUrl}
            </a>

            {editModeEnabled && (
              <input
                className="border border-gray-500 rounded-sm"
                type="text"
                placeholder="Enter short url"
                {...register("shortUrl", {
                  required: "Short url is required",
                })}
              />
            )}
            {errors.shortUrl && (
              <p className="text-red-500">{errors.shortUrl.message}</p>
            )}
            {!editModeEnabled && (
              <button
                type="button"
                onClick={() =>
                  setClipboard(`http://localhost:8000/${urlDetails.shortUrl}`)
                }
                className="text-gray-500 hover:text-gray-700"
                aria-label="Copy to clipboard"
              >
                <i className="far fa-copy"></i>
              </button>
            )}
          </div>
          <div className="w-full md:w-1/6 text-center mt-4 md:mt-0">
            <button
              type="button"
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white"
              onClick={handleSubmit(editUrl)}
            >
              {editModeEnabled ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
