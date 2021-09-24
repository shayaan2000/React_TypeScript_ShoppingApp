import React from "react";

// styles
import "./menu-item.styles.scss";

// routing
import { useHistory, useRouteMatch } from "react-router-dom";
import { ISection } from "../../redux/directory/directory.datatypes";

// props interface
interface IMenuItemProps {
  menuItem: ISection;
}

const MenuItem = ({ menuItem }: IMenuItemProps) => {
  const { title, imageUrl, size, linkUrl } = menuItem;
  const history = useHistory();
  const match = useRouteMatch();
  return (
    <div
      className={`menu-item ${size}`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>

      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">Shop now</span>
      </div>
    </div>
  );
};

export default MenuItem;
