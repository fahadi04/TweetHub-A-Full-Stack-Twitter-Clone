import React, { useState } from "react";
import { Avatar } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import GifIcon from "@mui/icons-material/GifBox";
import PollIcon from "@mui/icons-material/Poll";
import EmojiIcon from "@mui/icons-material/EmojiEmotions";
import ScheduleIcon from "@mui/icons-material/PendingActionsSharp";
import Location from "@mui/icons-material/LocationPin";
import Tooltip from "@mui/material/Tooltip";
import { useFormik } from "formik";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import * as Yup from "yup";
import TweetCard from "./TweetCard";

function HomeSection() {
    const heroSectionIcons = [
        { title: "Media", icon: <ImageIcon /> },
        { title: "Gif", icon: <GifIcon /> },
        { title: "Poll", icon: <PollIcon /> },
        { title: "Emoji", icon: <EmojiIcon /> },
        { title: "Schedule", icon: <ScheduleIcon /> },
        { title: "Location", icon: <Location /> },
    ];

    const handleSubmit = (values) => {
        console.log("Submitted values:", values);
    };

    const validationSchema = Yup.object().shape({
        content: Yup.string().required("Tweet Text is required"),
    });

    const [uploadingImage, setUploadingImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const formik = useFormik({
        initialValues: {
            content: "",
            image: "",
        },
        onSubmit: handleSubmit,
        validationSchema,
    });

    const handleSelectImage = (event) => {
        setUploadingImage(true);
        const imgUrl = event.target.files[0];
        formik.setFieldValue("image", imgUrl);
        setSelectedImage(imgUrl);
        setUploadingImage(false);
    };

    return (
        <div className="space-y-2">
                    <section className="sticky top-0 flex items-center justify-center cursor-pointer bg-gray-300 text-black w-full h-auto border-gray-600">
                        <div className="flex items-center justify-center h-full w-1/2 hover:bg-gray-900 hover:text-white transition-colors">
                            <h1 className="text-xl font-bold opacity-90  py-3">
                                For you
                            </h1>
                        </div>
                        <div className="flex items-center justify-center h-full w-1/2 hover:bg-gray-900 hover:text-white transition-colors">
                    <h1 className="text-xl font-bold opacity-90   py-3">
                                Following
                            </h1>
                        </div>
                    </section>

            <section className="pb-6">
                <div className="flex space-x-4 items-start m-3 ">
                    <Avatar
                        alt="username"
                        src="/path/to/avatar.jpg"
                        sx={{ width: 80, height: 80 }}
                    />

                    <div className="w-full flex justify-between">
                        <form className="w-full" onSubmit={formik.handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    name="content"
                                    placeholder="What's happening?"
                                    className={`border-none outline-none bg-transparent text-black h-auto text-4xl font-normal p-4 w-full `}
                                    {...formik.getFieldProps("content")}
                                />

                                {formik.errors.content && formik.touched.content && (
                                    <span className="text-red-500">{formik.errors.content}</span>
                                )}
                            </div>
                            <div className="flex justify-between p-2">
                                <div className="flex items-center space-x-4 text-blue-500 mt-4">
                                    <label className="flex items-center cursor-pointer space-x-2  rounded-md">
                                        <ImageIcon className="text-[#1d9bf0]" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            name="imageFile"
                                            onChange={handleSelectImage}
                                        />
                                    </label>
                                    <label className="flex items-center cursor-pointer rounded-md sapce-x-2">
                                        <GifIcon className="text-[#1d9bf0]" />
                                        <input type="text" className="hidden" />
                                    </label>
                                    <label className="flex items-center cursor-pointer rounded-md sapce-x-2">
                                        <PollIcon className="text-[#1d9bf0]" />
                                        <input type="text" className="hidden" />
                                    </label>
                                    <label className="flex items-center cursor-pointer rounded-md sapce-x-2">
                                        <EmojiIcon className="text-[#1d9bf0]" />
                                        <input type="text" className="hidden" />
                                    </label>
                                    <label className="flex items-center cursor-pointer rounded-md sapce-x-2">
                                        <ScheduleIcon className="text-[#1d9bf0]" />
                                        <input type="text" className="hidden" />
                                    </label>
                                    <label className="flex items-center cursor-pointer rounded-md sapce-x-2">
                                        <Location className="text-[#1d9bf0]" />
                                        <input type="text" className="hidden" />
                                    </label>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="bg-[#1d9bf0] text-white font-bold py-4 px-8 rounded-full hover:bg-[#1a8cd8] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
                                    >
                                        Post
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <hr className="border-gray-600" />
            <section>
                {[1, 2, 3, 4, 5].map((item) => (
                    <TweetCard />
                ))}
            </section>
        </div>
    );
}
export default HomeSection;
