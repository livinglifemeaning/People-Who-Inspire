import Link from "next/link";
import { useRouter } from "next/router";
import { useBoardContext } from "../../contexts/BoardContext";
import classes from "../../styles/PagesNavigation.module.css"

const PagesNavigation = () => {
  const router = useRouter();
  const {pageLinks, currentBoard}= useBoardContext(); 

  return (
    <nav className={classes.pagesNavigation}>
      {router.pathname.includes("pages") && (
        <Link href={`/board/${currentBoard.name.replace(/\s/g, "")}`} className={classes.pageLink}>
          Home
        </Link>
      )}
      {pageLinks.map((page) => (
        <Link
        key={page}
          href={`/board/${currentBoard.name.replace(/\s/g, "")}/pages/${page.replace(/\s/g, "")}`}
          className={classes.pageLink}
        >
          {page}
        </Link>
      ))}
    </nav>
  );
};

export default PagesNavigation;
