export const Footer = () => {
  return <div className="w-full flex justify-center items-center border-t-2">
    <p className="text-gray-500 text-xs">
        &copy; { new Date().getFullYear() } - All rights reserved
    </p>
  </div>
}