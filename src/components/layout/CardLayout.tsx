const CardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="w-full max-w-3xl overflow-hidden rounded-xl 
   bg-[#FFFADD] shadow-lg mb-10"
    >
      <div className="px-4 pyy-5 sm:p-6 text-center min-w-40">{children}</div>
    </div>
  );
};

export default CardLayout;
