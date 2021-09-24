import React from "react";

// Styles
import "./directory.styles.scss";

//Components
import MenuItem from "../menu-item/menu-item.component";

// Redux
import { useSelector } from "react-redux";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";

const Directory = () => {
  const sections = useSelector(selectDirectorySections);
  return (
    <div className="directory-menu">
      {sections.map((section) => (
        <MenuItem key={section.id} menuItem={section} />
      ))}
    </div>
  );
};

export default Directory;
