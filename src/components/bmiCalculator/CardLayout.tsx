const CardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="w-full max-w-3xl overflow-hidden rounded-xl 
 bg-[#FFFADD] shadow-lg"
    >
      <div className="px-4 pyy-5 sm:p-6">{children}</div>
    </div>
  );
};

export default CardLayout;
