import { useBoardContext } from "../../contexts/BoardContext";
import PageLayout from "./PageLayout";
import classes from "../../styles/Pages.module.css";

const GalleryImages = () => {
  const { currentBoard } = useBoardContext();
  const AllImages = currentBoard.GalleryImages;

  const ImagesRowOne = [];
  const ImagesRowTwo = [];
  const halfAmountofImages = AllImages.length / 2;

  // splits images in half if even number of images, and puts one more in the first row if odd
  if (AllImages.length % 2 !== 0) {
    let rowOneNumber = Math.round(halfAmountofImages);
    for (let i = 0; i < rowOneNumber; i++) {
      ImagesRowOne.push({
        id: AllImages[i].id,
        url: AllImages[i].galleryImage,
      });
    }
    for (let i = rowOneNumber; i < AllImages.length; i++) {
      ImagesRowTwo.push({
        id: AllImages[i].id,
        url: AllImages[i].galleryImage,
      });
    }
  } else {
    for (let i = 0; i < halfAmountofImages; i++) {
      ImagesRowOne.push({
        id: AllImages[i].id,
        url: AllImages[i].galleryImage,
      });
    }

    for (let i = halfAmountofImages; i < AllImages.length; i++) {
      ImagesRowTwo.push({
        id: AllImages[i].id,
        url: AllImages[i].galleryImage,
      });
    }
  }

  return (
    <>
      <div className={classes.galleryRow}>
        {ImagesRowOne.map((image) => {
          return (
            <picture key={image.id}>
              <img key={image.id} src={image.url} alt="" />
            </picture>
          );
        })}
      </div>
      <div className={classes.galleryRow}>
        {ImagesRowTwo.map((image) => {
          return (
            <picture key={image.id}>
              <img key={image.id} src={image.url} alt="" />
            </picture>
          );
        })}
      </div>
    </>
  );
};
const GalleryPage = () => {
  return (
    <PageLayout>
      <h1 className={classes.heading}>Gallery</h1>
      <div className={classes.galleryBox}>
        <GalleryImages />
      </div>
    </PageLayout>
  );
};

export default GalleryPage;
