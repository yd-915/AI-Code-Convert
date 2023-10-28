import { AdsTop } from '@/components/AdsTop';
import { AdsBottom } from '@/components/AdsBottom';
import { AdsLeft } from '@/components/AdsLeft';
import { AdsRight } from '@/components/AdsRight';
import { AboutUs } from "@/components/AboutUs";
import { Footer } from "@/components/Footer";
import { BaseHeadMeta } from "@/components/BaseHeadMeta";
import { BaseCodeOption } from "@/components/BaseCodeOption";
import { BaseCodeTop } from "@/components/BaseCodeTop";
import { HEAD_METAS } from "@/components/CommonUtils";
import { OPTIONS } from "@/components/CommonUtils";
import { TITLES } from "@/components/CommonUtils";
import {BaseHeader} from "@/components/BaseHeader";

export default function Home() {
    return (
        <>
            <BaseHeadMeta meta={ HEAD_METAS.TRANSLATE } />
            <BaseHeader />
            <BaseCodeTop title={ TITLES.TRANSLATE } />
            <AdsTop />
            <BaseCodeOption option={ OPTIONS.TRANSLATE } />
            <AdsBottom />
            <AdsLeft />
            <AdsRight />
            <AboutUs />
            <Footer />
        </>
    );
}
