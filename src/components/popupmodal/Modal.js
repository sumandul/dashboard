import PropTypes from "prop-types";


const Modal = ({
  title,
  footer,
  children,
  width,
  isOpen,
  setClose,
  ...props
}) => {
  const handleClose = () => {
    setClose(false);
  };
  return (
    <>
      {isOpen && (
        <div className=" fixed  flex justify-center items-center     inset-0  bg-zapp-overlay z-50 ">
          <div
            className={`    overflow-hidden 
          bg-zapp-white shadow-lg text-gray-200 px-6   sm:w-[${width}] rounded-xl py-8  flex flex-col animate-notify  `}
            {...props}
          >
            <header className="flex items-center justify-between ">
              {typeof title === "string" ? (
                <div className="text-2xl font-semibold">{title}</div>
              ) : (
                title
              )}
              {/* {isOpen && (
                <div
                  className="flex justify-end   pr-3  py-3 w-full"
                  onClick={handleClose}
                >
                  <div>
                    <MdClear className=" text-[1.8rem]  text-zapp-black " />
                  </div>
                </div>
              )} */}
            </header>
            <main className="">{children}</main>
            {footer !== null && <footer>{footer}</footer>}
          </div>
        </div>
      )}
    </>
  );
};

Modal.defaultProps = {
  width: 400,
  footer: null,
  closebtn: true,
};

Modal.propTypes = {
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  closebtn: PropTypes.bool.isRequired,
};

export default Modal;
