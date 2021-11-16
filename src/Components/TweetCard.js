import React, { useEffect } from "react";
import Typewriter from "typewriter-effect";

const TweetCard = ({ tweet }) => {
    const urlRegex =
        /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
    const parseText = (text) =>
        text.replace(
            urlRegex,
            (url) =>
                `<a class="text-primary hover:underline" href=${url}>${url}</a>`
        );

    useEffect(() => console.log(tweet));

    return (
        <>
            {tweet && (
                <div class="bg-base-100 shadow-xl p-4 rounded-xl w-full mx-auto">
                    <div class="flex justify-between">
                        <div class="flex items-center">
                            {/* Proile image */}
                            <div className="h-14 w-14 rounded-full overflow-hidden">
                                <img
                                    className="w-full h-full bg-cover bg-center"
                                    src="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
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

                    <p class=" text-base-content filter contrast-50 text-sm my-2">
                        Pubblicato il{" "}
                        {new Date(tweet.created_at).toLocaleDateString(
                            "it-IT",
                            { year: "numeric", day: "numeric", month: "short" }
                        )}
                    </p>
                    <hr />
                    {/* Numeri */}
                    <div class="flex mt-2 items-center">
                        <div class="flex items-center text-base-content filter contrast-50 justify-evenly w-full mr-6">

                            

                            <div className="flex items-center">
                                <i class="bi bi-chat smartphone:text-lg text-primary"></i>
                                <span className="ml-2 text-sm smartphone:text-base">
                                {tweet.comment_count}
                                </span>
                            </div>

                            <div className="flex items-center">
                                <i class="bi bi-arrow-repeat smartphonetext-xl text-green-500"></i>
                                <span className="ml-2 text-sm smartphone:text-base">
                                {tweet.favorite_count}
                                </span>
                            </div>

                            <div className="flex items-center">
                                <i class="bi bi-heart smartphone:text-lg text-error"></i>
                                <span className="ml-2 text-sm smartphone:text-base">
                                {tweet.comment_count}
                                </span>
                            </div>

                            <div className="hidden smartphone:flex items-center">
                                <i class="bi bi-box-arrow-up smartphone:text-lg text-primary"></i>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TweetCard;
