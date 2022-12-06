import { useBoardContext } from "../../contexts/BoardContext";
import { useState, useEffect } from "react";
import PageLayout from "./PageLayout";
import Link from "@mui/icons-material/link";
import classes from "../../styles/Pages.module.css";

const ArticlesPage = () => {
  const { currentBoard } = useBoardContext();
  const articles = currentBoard.ArticleLinks;

  return (
    <PageLayout center={true}>
      <h1 className={classes.heading}>Articles</h1>
      <div className={classes.articlesBox}>
        {articles.map((article) => {
          return (
            <a key={article.id} href={article.articleLink} target="_blank">
              <div className={classes.article}>
                <span>
                  <Link />
                </span>
                <p>{article.articleLink}</p>
              </div>
            </a>
          );
        })}
      </div>
    </PageLayout>
  );
};

export default ArticlesPage;
