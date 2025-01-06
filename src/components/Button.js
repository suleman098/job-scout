function Button({ children, onClick }) {
  return (
    <button className={`btn btn-outline btn-secondary`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
