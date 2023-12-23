import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="https://ik.imagekit.io/obelussoft/logo_KthpUIKLe.png?updatedAt=1703240720478"
        width={260}
        height={35}
        alt="ObelusStream Logo"
        priority
      />
    </Link>
  );
};
