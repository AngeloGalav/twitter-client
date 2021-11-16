import React, { useEffect } from "react";
import Typewriter from "typewriter-effect";

const TweetCard = ({ tweet }) => {


    return (
        <>
            {tweet && (
                <div class="bg-base-100 shadow-xl px-4 py-2 rounded-xl w-full mx-auto">
                    <div class="flex justify-between">
                        <div class="flex items-center">
                            {/* Proile image */}
                            <div className="h-14 w-14 rounded-full overflow-hidden">
                                <img
                                    className="w-full h-full bg-cover bg-center"
                                    src={tweet.user.profile_image_url || "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"}
                                />
                            </div>

                            {/* Profile name */}
                            <div class="ml-1.5 text-sm leading-tight">
                                <p class="text-base-content font-bold block ">
                                    {tweet.user.name}
                                </p>
                                <span class="text-base-content filter contrast-50 font-normal text-sm block">
                                    @{tweet.user.screen_name}
                                </span>
                            </div>
                        </div>

                        {/* Twitter logo */}
                        <i className="bi bi-twitter text-primary text-2xl" />
                    </div>

                    {/* Text */}
                    <div className="my-2 h-10">
                        <Typewriter
                            class="text-base-content block text-base leading-snug my-3"
                            options={{
                                strings: tweet.text.split("$"),
                                autoStart: true,
                                loop: true,
                                delay: 20,
                                deleteSpeed: 20,
                            }}
                        />
                    </div>

                    {/* Image */}

                    <div className="w-full border rounded-2xl overflow-hidden bg-blue-200">
                        <img
                            class="w-full h-full object-cover object-center"
                            src={tweet.image}
                        />
                    </div>
                         {/* Data */}
                    <p class="text-base-content filter contrast-50 py-2 text-sm w-full">
                        Pubblicato il{" "}
                        {new Date().toLocaleDateString(
                            "it-IT",
                            { year: "numeric", day: "numeric", month: "short" }
                        )}
                    </p>

                    <hr />
                    {/* Numeri */}
                    <div class="flex items-center w-full overflow-hidden pt-2">
                        <div class="flex items-center text-base-content filter contrast-50 gap-10 justify-evenly w-full">
                            <div className="flex items-center">
                                <i class="bi bi-chat smartphone:text-lg text-primary"></i>
                                <span className="ml-2 text-sm smartphone:text-base">
                                {tweet.comment_count}
                                </span>
                            </div>

                            <div className="flex items-center">
                                <i class="bi bi-arrow-repeat smartphone:text-xl text-green-500"></i>
                                <span className="ml-2 text-sm smartphone:text-base">
                                {tweet.retweet_count}
                                </span>
                            </div>

                            <div className="flex items-center">
                                <i class="bi bi-heart smartphone:text-lg text-error"></i>
                                <span className="ml-2 text-sm smartphone:text-base">
                                {tweet.favorite_count}
                                </span>
                            </div>
                        </div>
                   
                    </div>
                </div>
            )}
        </>
    );
};

export default TweetCard;
