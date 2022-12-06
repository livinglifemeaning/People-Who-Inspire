import Link from "next/link";
import { useBoardContext } from "../../contexts/BoardContext";
import { useRouter } from "next/router";
import useMediaQuery from "../../hooks/useMediaQuery";
import HomeButton from "../Buttons/HomeButton";
import NavButton from "../Buttons/NavButton";
import PagesNavigation from "../Navigation/PagesNavigation";
import classes from "../../styles/Pages.module.css"

const PageLayout = (props) => {
  const isDesktop = useMediaQuery("(min-width: 45em)");

  // determine next and previous page
  const router = useRouter();
  const { pageLinks } = useBoardContext();
  const currentPage = pageLinks.filter(
    (i) => i.replace(/\s/g, "") === router.asPath.split("/").pop()
  )[0];
  const indexOfCurrentPage = pageLinks.indexOf(currentPage);
  let previousPage;
  let nextPage;

  if (indexOfCurrentPage === 0) {
    previousPage = pageLinks[pageLinks.length - 1];
  } else {
    previousPage = pageLinks[indexOfCurrentPage - 1];
  }
  if (indexOfCurrentPage === pageLinks.length - 1) {
    nextPage = pageLinks[0];
  } else {
    nextPage = pageLinks[indexOfCurrentPage + 1];
  }

  return (
    <div className={classes.container}>
      <div className={classes.page}>
        <div className={classes.logoBox}>
          <p className={classes.logo}>people who inspire me</p>
        </div>
        <div className={classes.pageContent}>
          {!isDesktop && <HomeButton />}
          {props.children}

          {!isDesktop && (
            <div className={classes.navButtons}>
              <Link href={`/board/${router.query.nameOfPerson}/pages/${previousPage.replace(/\s/g, "")}`}>
                <NavButton>{previousPage}</NavButton>
              </Link>
              <Link href={`/board/${router.query.nameOfPerson}/pages/${nextPage.replace(/\s/g, "")}`}>
                <NavButton>{nextPage}</NavButton>
              </Link>
            </div>
          )}
        </div>
      </div>
      {isDesktop && <PagesNavigation />}
    </div>
  );
};

export default PageLayout;
