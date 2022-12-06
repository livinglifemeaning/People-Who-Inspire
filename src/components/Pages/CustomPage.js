import { useBoardContext } from "../../contexts/BoardContext";
import { useRouter } from "next/router";
import PageLayout from "./PageLayout";
import classes from "../../styles/Pages.module.css"

const CustomPage = () => {
  const router = useRouter();
  const { currentBoard } = useBoardContext();
  const CustomPages = currentBoard.CustomPages;
  const page = CustomPages.find(
    (page) => page.pageTitle.replace(/\s/g, "") === router.query.CustomPage
  );
  console.log(CustomPages)
  const paragraphs = page.pageContent.split(/\r?\n/);

  return (
    <PageLayout>
      <h1 className={classes.heading}>{page.pageTitle}</h1>
      <div className={classes.paragraphs}>
        {paragraphs.map((paragraph, i) => {
          return (
            <p key={i} className={classes.paragraph}>
              {paragraph}
            </p>
          );
        })}
      </div>
    </PageLayout>
  );
};

export default CustomPage;
