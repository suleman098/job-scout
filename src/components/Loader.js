function Loader({ size = "small" }) {
  const sizeClass =
    size === "large" ? "loading-ring loading-lg" : "loading-ring loading-xs";

  return (
    <div className="flex flex-col items-center justify-center text-black">
      <span className={`loading text-primary ${sizeClass}`}></span>
      <br />
      <span className="text-center">Hold On, Getting Your Jobs</span>
    </div>
  );
}

export default Loader;
