import React from "react";

export const Tweet = ({ tweet }) => {
    const urlRegex =
        /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
    const parseText = (text) =>
        text.replace(
            urlRegex,
            (url) =>
                `<a class="text-primary hover:underline" href=${url}>${url}</a>`
        );
console.log(tweet)
    return (
        <li>
            <>
                {tweet && (
                    <div class="bg-base-200 shadow-xl px-4 py-2 smartphone:rounded-xl w-full mx-auto">
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

                            {/* Twitter logo, da fare come pulsante */}
                            <a className="btn btn-link" href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`}><i className="bi bi-twitter text-primary text-2xl" /></a>
                            
                        </div>

                        {/* Text */}
                        <div className="my-2">
                            {tweet.retweet && <p className="font-bold text-xs my-2"><i class="bi bi-arrow-repeat"></i>{" "}Retwettato da @{tweet.retweet}</p> }
                        <span className="my-2" dangerouslySetInnerHTML={{__html: parseText(tweet.text)}} />
                        </div>
                        


                        {/* Image */}

                        {tweet.image && <div className="w-full border rounded-2xl overflow-hidden bg-blue-200">
                            <img
                                class="w-full h-full object-cover object-center"
                                src={tweet.image}
                            />
                        </div>}
                        {/* Data */}
                        <p class="text-base-content filter contrast-50 py-2 text-sm w-full">
                            Pubblicato il{" "}
                            {new Date().toLocaleDateString("it-IT", {
                                year: "numeric",
                                day: "numeric",
                                month: "short",
                            })}
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
        </li>
    );
};

export default Tweet;
