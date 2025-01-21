import { LottieProps, ILottie } from "@lottielab/lottie-player/react";
import React, { useEffect, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

type LottieComponentType = React.ForwardRefExoticComponent<
  LottieProps & React.RefAttributes<ILottie>
>;

const LottieAnimation = () => {
  const [LottieComponent, setLottieComponent] = useState<LottieComponentType | null>(null);

  useEffect(() => {
    import("@lottielab/lottie-player/react").then((module) => {
      setLottieComponent(() => module.default);
    });
  }, []);

  return (
    <BrowserOnly>
      {() =>
        LottieComponent ? (
          <LottieComponent
            src="https://cdn.lottielab.com/l/3cp3bJwTzHxWRS.json"
            autoplay
          />
        ) : null
      }
    </BrowserOnly>
  );
};

export default LottieAnimation;
