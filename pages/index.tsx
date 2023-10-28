import { MainHeadMeta } from '@/components/MainHeadMeta'
import { Header } from "@/components/Header";
import { MainTop } from '@/components/MainTop'
import { AdsTop } from '@/components/AdsTop';
import { AdsBottom } from '@/components/AdsBottom';
import { AdsLeft } from '@/components/AdsLeft';
import { AdsRight } from '@/components/AdsRight';
import { LanguageSupport } from '@/components/LanguageSupport';
import { WhyUse } from '@/components/WhyUse';
import { MainCode } from '@/components/MainCode';
import { AboutUs } from "@/components/AboutUs";
import { Footer } from "@/components/Footer";

export default function Home() {
  	return (
		<>
			<MainHeadMeta />
			<Header />
			<MainTop />
			<AdsTop />
			<MainCode />
			<AdsBottom />
			<AdsLeft />
			<AdsRight />
			<LanguageSupport />
			<WhyUse />
			<AboutUs />
			<Footer />
		</>
  );
}
