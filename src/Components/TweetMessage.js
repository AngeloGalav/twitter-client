import React from 'react'
import { useSelector } from 'react-redux';

const TweetMessage = ({tweet}) => {
    const urlRegex =
    /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
const hashtagRegex = /#[^\s!@#$%^&*()=+.\/,\[{\]};:'"?><]+/g;
const userNameRegex = /(^|[^@\w])@(\w{1,15})\b/;
const parseText = (text) => {
    let textLink = text.replace(
        urlRegex,
        (url) =>
            `<a class="text-base-content underline font-medium" href=${url}>${url}</a>`
    );

    let textHashtagLink = textLink.replace(
        hashtagRegex,
        (hashtag) =>
            `<a class="text-base-content underline font-medium" href=./tweets/Hashtag?q=${hashtag.substring(
                1
            )}>${hashtag}</a>`
    );

    return textHashtagLink.replace(
        userNameRegex,
        (userName) =>
            `<a class="text-base-content underline font-medium" href=./tweets/Username?q=${userName
                .replace("@", "")
                .replace(" ", "")}>${userName}</a>`
    );
};

const user = useSelector((state) => state.userReducer);
    return (
        <div class="flex w-full mb-4">
            <img
              src={tweet.user.profile_image_url || "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"}
              class="object-cover h-8 w-8 rounded-full self-end border"
              alt=""
            />
            <div
                style={{maxWidth: "80%", minWidth: "10rem"}}
              class={`ml-2 py-3 px-4 bg-accent bg-opacity-40 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-primary-content `}
            >
                <div className='flex justify-between items-center'>
                <span className={`font-bold text-${tweet.color}-${user.theme === "dark" ? "300" : "500"} text-sm block`}>{tweet.user.screen_name}</span>
                <a
                                
                                href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`}
                            >
                                <i className="bi bi-twitter text-primary text-lg" />
                            </a>
                </div>
                
                {tweet.retweet && <span className={`text-${tweet.color}-${user.theme === "dark" ? "300" : "500"} text-sm block mt-0`}>Messaggio retweettato da {tweet.retweet}</span>}
                {tweet.retweet && <div className='mt-4' /> }
                <span className='text-sm text-base-content' dangerouslySetInnerHTML={{
                                    __html: parseText(tweet.text),
                                }} />
                {tweet.image && <figure className='w-full overflow-hidden rounded-xl mt-2'>
                    <img className='w-full h-full object-cover' src={tweet.image} alt="" />
                    </figure>}
                

                    <span className={`text-base-content opacity-70 block text-xs font-light text-right mt-1`}>{tweet.created_at}</span>
            </div>
            
          </div>
    )
}

export default TweetMessage
