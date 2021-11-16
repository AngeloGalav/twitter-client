import React from "react";

export const Tweet = ({ tweet }) => {
    return (
        <li>
            <article class="hover:bg-base-200 transition duration-350 cursor-pointer ease-in-out py-5 px-5 smartphone:px-10">
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
                                   test
                                </p>
                                <span class="text-base-content filter contrast-50 font-normal text-sm block">
                                    @test
                                </span>
                            </div>
                        </div>

                        {/* Twitter logo */}
                        <i className="bi bi-twitter text-primary text-2xl" />
                    </div>

                    {/* Text */}
                    <div className="my-2">
                    Day 07 of the challenge #100DaysOfCodeI was wondering what I can do with #tailwindcss, so just started building Twitter UI using Tailwind and so far it looks so promising. I will post my code after completion. [07/100] #WomenWhoCode #CodeNewbie
                    </div>

                     {/* Image */}

                     <div className="w-full border rounded-2xl overflow-hidden bg-blue-200 mt10">
                        <img
                            class="w-full h-full object-cover object-center"
                            src="https://pbs.twimg.com/ad_img/1458373746029473792/ag407tq-?format=png&name=small"
                        />
                    </div>

                    {/* Data */}

                    <p class=" text-base-content filter contrast-50 text-sm my-2">
                        Pubblicato il{" "}
                        {new Date().toLocaleDateString(
                            "it-IT",
                            { year: "numeric", day: "numeric", month: "short" }
                        )}
                    </p>

                    {/* Numeri */}
                    <div class="flex mt-2 items-center w-full overflow-hidden">
                        <div class="flex items-center text-base-content filter contrast-50 justify-evenly w-full mr-6">
                            <div className="flex items-center">
                                <i class="bi bi-chat smartphone:text-lg text-primary"></i>
                                <span className="ml-2 text-sm smartphone:text-base">
                                    0
                                </span>
                            </div>

                            <div className="flex items-center">
                                <i class="bi bi-arrow-repeat smartphonetext-xl text-green-500"></i>
                                <span className="ml-2 text-sm smartphone:text-base">
                                    0
                                </span>
                            </div>

                            <div className="flex items-center">
                                <i class="bi bi-heart smartphone:text-lg text-error"></i>
                                <span className="ml-2 text-sm smartphone:text-base">
                                    0
                                </span>
                            </div>
                        </div>
                    </div>
            </article>
        </li>
    );
};

export default Tweet;
