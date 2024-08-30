const SectionHeading = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <h2
      className={`text-[25px] md:text-[30px] lg:text-[35px] text-primaryTxt font-[700] mb-[20px] ${
        className || ""
      }`}
    >
      {text}
    </h2>
  );
};

export default SectionHeading;
