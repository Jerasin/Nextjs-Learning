export const CardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="w-full max-w-3xl overflow-hidden rounded-xl 
   bg-[#FFFADD] shadow-lg mb-10 flex flex-col"
    >
      <div className="px-4 pyy-5 sm:p-6 text-center min-w-40 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export const CardLayoutV2 = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="w-auto  h-20 overflow-hidden rounded-xl 
   bg-[#FFFADD] shadow-lg mb-10 text-center"
    >
      {children}
    </div>
  );
};
