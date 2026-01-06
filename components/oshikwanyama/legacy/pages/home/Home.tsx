import { useContext } from "react";
import ButtonWithTranslation from "../../ButtonWithTranslation/ButtonWithTranslation";
import PageTitle from "../PageTitle";

import { oshikwanyamaUrl as kwanyamaUrl } from "@/helpers/oshikwanyamaUrl";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../GameContext";
import "./Home.scss";

const Home = (): JSX.Element => {
  const {} = useContext(GameContext);
  const navigate = useNavigate();

  return (
    <>
      <PageTitle title="Tjika Oshikwanyama" translation="Learn Oshikwanyama" />

      <div className="home__contents">
        <p>
          Oshikwanyama is a Bantu language spoken primarily in northern Namibia
          and southern Angola by the Ovakwanyama people.
        </p>
        <p>
          It belongs to the Oshiwambo language group and is one of Namibia's
          national languages with around 700,000 speakers.
        </p>
      </div>

      <div className="home__cta-wrapper">
        <p className="home__cta-title">Tjika Oshikwanyama paife!</p>
        <div className="home__cta-button-wrapper">
          <ButtonWithTranslation
            cta="Nanga Okukaleka"
            translated="Start Learning"
            onClickHandler={() => {
              navigate(kwanyamaUrl("lessons"));
            }}
          />
          {/* <ButtonWithTranslation
            cta="Kambuka Omishe"
            translated="Explore Proverbs"
            onClickHandler={() => {
              navigate(kwanyamaUrl("proverbs"));
            }}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
