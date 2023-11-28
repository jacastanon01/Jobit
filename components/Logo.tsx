import Image from 'next/image';

const Logo = ({
  height = 22,
  width = 86,
}: {
  height?: number;
  width?: number;
}) => {
  return (
    <Image
      src='/assets/jobit-logo.svg'
      height={height}
      width={width}
      priority
      alt='Jobit Logo'
    />
  );
};

export default Logo;
