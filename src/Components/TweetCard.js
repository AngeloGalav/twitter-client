import React, { useEffect } from "react";

const TweetCard = ({ tweet }) => {
    const urlRegex =
        /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
    const parseText = (text) =>
        text.replace(
            urlRegex,
            (url) =>
                `<a class="text-primary hover:underline" href=${url}>${url}</a>`
        );

        useEffect(() => console.log(tweet))

    return (
        <>
            {tweet && (
                <div class="bg-base-100 shadow-xl p-4 rounded-xl w-full order-2 mx-auto">
                    <div class="flex justify-between">
                        <div class="flex items-center">
                            {/* Proile image */}
                            <div className="h-14 w-14 rounded-full overflow-hidden">
                                <img
                                    className="w-full h-full bg-cover bg-center"
                                    src={tweet.user.profile_image_url_https || `https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png`}
                                />
                            </div>

                            {/* Profile name */}
                            <div class="ml-1.5 text-sm leading-tight">
                                <a href={`https://twitter.com/${tweet.user.screen_name}`} class="text-base-content font-bold block ">
                                    {tweet.user.name}
                                </a>
                                <span class="text-base-content filter contrast-50 font-normal text-sm block">
                                    @{tweet.user.screen_name}
                                </span>
                            </div>
                        </div>

                        {/* Twitter logo */}
                        <i className="bi bi-twitter text-primary text-2xl" />
                    </div>

                    {/* Text */}
                    <p
                        class="text-base-content block text-base leading-snug my-3"
                        dangerouslySetInnerHTML={{
                            __html: parseText(tweet.full_text),
                        }}
                    />

                    {tweet.entities.media?.length > 0 && (
                        <div className="w-full h-72">
                        <img
                            class="rounded-2xl w-full h-full object-cover object-center"
                            src={tweet.entities.media[0].media_url_https}
                        />
                        </div>
                    )}

                    {/* Data */}

                    <p class=" text-neutral-content filter contrast-50 text-base py-1 my-1">
                        {new Date(tweet.created_at).toDateString}
                    </p>

                    <div class="text-base-content filter contrast-50 flex mt-3">
                        <div class="flex items-center justify-center gap-10 w-full mr-6">
                            <div>
                                <i class="bi bi-arrow-repeat text-success"></i>
                                <span class="ml-2">{tweet.retweet_count}</span>
                            </div>

                            <div>
                                <i class="bi bi-heart text-error"></i>
                                <span class="ml-2">{tweet.favorite_count}</span>
                            </div>
                        </div>
                    </div>

                    <a
                        href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`}
                        className="btn btn-block btn-primary mt-4"
                    >
                        Visualizza su twitter
                    </a>
                </div>
            )}
        </>
    );
};

export default TweetCard;
