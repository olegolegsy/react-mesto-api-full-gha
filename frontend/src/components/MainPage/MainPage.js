import Header from "../Header/Header";
import Main from "../Main/Main";

const MainPage = ({ userEmail, ...props }) => {
  return (
    <>
      <Header userEmail={userEmail} page={"main"} />
      <Main {...props} />
    </>
  );
};

export default MainPage;
