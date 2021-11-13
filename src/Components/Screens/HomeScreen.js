//Components
import NavbarMobile from '../NavbarMobile'
import useWindowSize from "../../Utils/windowSize";
import NavbarDesktop from '../NavbarDesktop';

//media
import bgHeroSection from '../../Media/undraw_viral_tweet_gndb.svg'

import React from "react";
import { Link as ScrollLink } from "react-scroll";

const HomeScreen = () => {
    // eslint-disable-next-line
    const [width, height] = useWindowSize();

    return (
        <div
        id="home-screen-container"
        >
            {width < 768 ? <NavbarMobile /> : <NavbarDesktop />}
            <div
                class="hero h-screen relative bg-bottom ipad:bg-right-bottom bg-no-repeat border-b"
                style={{backgroundImage: `url(${bgHeroSection})`, minHeight: "45rem", backgroundSize: `${width < 400 ? "100%" :  width < 768 ? "80%" : "60%"}`}}
            >


                <div class="bg-gradient-to-b ipad:bg-gradient-to-r from-primary to-transparent h-full w-full bg-opacity-50"></div>
                <div class="px-8 smartphone:px-12 text-neutral-content relative -top-20 text-left smartphone:text-left ipad:absolute ipad:top-1/2 ipad:height-40 ipad:transform ipad:-translate-y-1/2 ipad:left-20">
                    <div>
                        <h1 class="mb-5 ipad:mb-8 text-4xl smartphone:text-5xl font-bold">Resta sempre aggiornato</h1>
                        <p class="mb-5 text-sm">
                            <span className="font-bold">Twitter client</span> ti permette di trovare ciò che ti interessa senza indugi
                        </p>

                        <ScrollLink
                        activeClass="active"
                        to="home-main"
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={800}
                      >
                        <button className="btn btn-secondary">Scopri di più</button>
                      </ScrollLink>


                    </div>
                </div>
            </div>
<br/>
            <main
              className="w-full overflow-hidden"
              id="home-main">
              <p>«Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.»</p>
            </main>
        </div>
    );
};

export default HomeScreen;
