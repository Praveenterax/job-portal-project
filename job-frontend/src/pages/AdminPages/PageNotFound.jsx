import { useEffect } from "react";

const PageNotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found";
  }, []);
  return <h1>Page not found!</h1>;
};

export default PageNotFound;
