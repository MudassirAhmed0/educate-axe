import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
const Bookmarks = ({ bookmarks, container }) => {
  return (
    <div
      className={`${
        container ? container : " container "
      } mt-5 text-[14px] flex items-center h-[24px]`}
    >
       
      {bookmarks?.map((bookmark, index) => {
        if (index === 0) {
          return <Link to={bookmark[1]}>{bookmark[0]}</Link>;
        } else if (bookmarks.length - 1 == index) {
          return (
            <span  className="text-gray-400">
            <ChevronRightIcon /> {bookmark[0]}
          </span>
          );
        } else {
          return (
            <Link to={bookmark[1]}>
              <ChevronRightIcon /> {bookmark[0]}
            </Link>
          );
        }
      })}
    </div>
  );
};

export default Bookmarks;
