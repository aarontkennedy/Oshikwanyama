import React from "react";

const PageTitle = ({
  title,
  translation,
}: {
  title: string;
  translation: string;
}): React.ReactNode => (
  <div className="page__header">
    <div className="page__header-title-container">
      <div className="page__header-title">{title}</div>
      <div className="page__header-sub-title">{translation}</div>
    </div>
  </div>
);

export default PageTitle;
