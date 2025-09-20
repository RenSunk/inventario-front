export const Footer = () => {
  return (
    <div className="w-full max-h-32 flex justify-center items-center border-t-2 bg-beigePrimary">
      <p className="text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} - All rights reserved
      </p>
    </div>
  );
}