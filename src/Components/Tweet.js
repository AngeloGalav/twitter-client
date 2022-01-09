import React from "react";

export const Tweet = ({ tweet, setCenter }) => {
    const urlRegex =
        /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
    const hashtagRegex = /#[^\s!@#$%^&*()=+.\/,\[{\]};:'"?><]+/g;
    const userNameRegex = /(^|[^@\w])@(\w{1,15})\b/;
    const parseText = (text) => {
        let textLink = text.replace(
            urlRegex,
            (url) =>
                `<a class="text-primary hover:underline" href=${url}>${url}</a>`
        );

        let textHashtagLink = textLink.replace(
            hashtagRegex,
            (hashtag) =>
                `<a class="text-primary hover:underline" href=/tweets/Hashtag?q=${hashtag.substring(
                    1
                )}>${hashtag}</a>`
        );

        return textHashtagLink.replace(
            userNameRegex,
            (userName) =>
                `<a class="text-primary hover:underline " href=/tweets/Username?q=${userName
                    .replace("@", "")
                    .replace(" ", "")}>${userName}</a>`
        );
    };

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
                                        src={
                                            tweet.user.profile_image_url ||
                                            "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                                        }
                                    />
                                </div>

                                {/* Profile name */}
                                <div class="ml-1.5 text-sm leading-tight">
                                    <p class="text-base-content font-bold flex gap-2 items-center">
                                        {tweet.user.name}
                                        {tweet.isVerified && <img className="w-5" src="https://img.icons8.com/color/48/000000/verified-badge.png"/>}
                                    </p>
                                    <span class="text-base-content text-opacity-50 font-normal text-sm block">
                                        @{tweet.user.screen_name}
                                    </span>
                                </div>
                            </div>

                            {/* Twitter logo, da fare come pulsante */}
                            <a
                                className="btn btn-link"
                                href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`}
                            >
                                <i className="bi bi-twitter text-primary text-2xl" />
                            </a>
                        </div>

                        {/* Text */}
                        <div className="my-2">
                            {tweet.retweet && (
                                <p className="font-bold text-xs my-2">
                                    <i class="bi bi-arrow-repeat"></i>{" "}
                                    Retwettato da @{tweet.retweet}
                                </p>
                            )}
                            <span
                                className="my-2 break-all"
                                dangerouslySetInnerHTML={{
                                    __html: parseText(tweet.text),
                                }}
                            />
                        </div>

                        {/* Image */}

                        {tweet.image && (
                            <div className="w-full border rounded-2xl overflow-hidden bg-blue-200">
                                <img
                                    class="w-full h-full object-cover object-center"
                                    src={tweet.image || "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"}
                                />
                            </div>
                        )}
                        {/* Data */}
                        <p class="text-base-content text-opacity-50 py-2 text-sm w-full">
                            Pubblicato il{" "}
                            {tweet.created_at.toLocaleDateString("it-IT", {
                                year: "numeric",
                                day: "numeric",
                                month: "short",
                            })}
                        </p>

                        <hr />
                        {/* Numeri */}
                        <div class="flex items-center w-full overflow-hidden pt-2">
                            <div class="flex items-center text-base-content text-opacity-50 gap-10 justify-evenly w-full">
                                <div className="flex items-center w-1/3 justify-center">
                                    <button
                                        onClick={() => {
                                            if (tweet.place) {
                                                setCenter([
                                                    tweet.place?.bounding_box
                                                        .coordinates[0][0][1],
                                                    tweet.place?.bounding_box
                                                        .coordinates[0][0][0],
                                                ]);
                                            }
                                        }}
                                        disabled={!tweet.place}
                                        className={`btn btn-link flex btn-sm justify-center items-center ml-2`}
                                    >
                                        <i class="bi bi-map smartphone:text-lg"></i>
                                        <span className="text-sm smartphone:text-base"></span>
                                    </button>
                                </div>

                                <div className="flex items-center w-1/3 justify-center">
                                    <i class="bi bi-arrow-repeat smartphone:text-xl text-green-500"></i>
                                    <span className="ml-2 text-sm smartphone:text-base">
                                        {tweet.retweet_count}
                                    </span>
                                </div>

                                <div className="flex items-center w-1/3 justify-center">
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
