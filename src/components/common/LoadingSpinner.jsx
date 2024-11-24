const LoadingSpinner = ({ size = "lg", className = "" }) => (
  <div className={`flex justify-center items-center ${className}`}>
    <span className={`loading loading-spinner loading-${size} text-primary`}></span>
  </div>
);

export default LoadingSpinner; 