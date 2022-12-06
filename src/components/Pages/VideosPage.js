import { useEffect, useState } from "react";
import Videos from "../../../pages/board/[nameOfPerson]/pages/Videos";
import { useBoardContext } from "../../contexts/BoardContext";
import PageLayout from "./PageLayout";
import classes from "../../styles/Pages.module.css"

const VideosPage = () => {
  const { currentBoard } = useBoardContext();
  const videos = currentBoard.VideoLinks;

  return (
    <PageLayout>
      <h1 className={classes.heading}>Videos</h1>
      <div className={classes.videoBox}>
        {videos &&
          videos.map((video) => (
            <div key={video.id} className={classes.video}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.videoLink.split("?v=")[1]}`}
                frameBorder=""
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="eager"
              ></iframe>
            </div>
          ))}
      </div>
    </PageLayout>
  );
};

export default VideosPage;


