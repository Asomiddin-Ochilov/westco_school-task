import { Button } from "antd";
import React from "react";
import Fade from "react-reveal/Fade";
import { useHistory } from "react-router-dom";
const Teacher = () => {
  const history = useHistory();
  return (
    <div className="teacher page">
      <div className="left">
        <Fade bottom>
          <div className="font title">
            find your course that makes bright future
          </div>
        </Fade>
        <div className="line"></div>
        <div className="text font">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
          temporibus ullam, nesciunt corrupti quae aspernatur cupiditate!
          Dolores, eveniet ratione! Vero voluptas veritatis at facilis culpa
          dolorem pariatur quibusdam dignissimos nisi!
        </div>

        <Button onClick={() => history.push("/singup")}> Get Started </Button>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Teacher;
