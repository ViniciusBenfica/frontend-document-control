import Image from "next/image";
import BannerImage from "/public/img/banner.png";

interface IHomeBanner {
	banner: string[];
}

export default function HomeBanner({banner}: IHomeBanner) {
	return <Image src={BannerImage || banner} alt="banner" width={1920} height={400} />;
}
