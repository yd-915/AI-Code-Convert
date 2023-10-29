import { AdsTop } from '@/components/AdsTop';
import { AdsBottom } from '@/components/AdsBottom';
import { AdsLeft } from '@/components/AdsLeft';
import { AdsRight } from '@/components/AdsRight';
import { BaseHeadMeta } from "@/components/BaseHeadMeta";
import { BaseCodeTop } from "@/components/BaseCodeTop";
import { HEAD_METAS } from "@/components/CommonUtils";
import { OPTIONS } from "@/components/CommonUtils";
import { TITLES } from "@/components/CommonUtils";
import {BaseChat} from "@/components/BaseChat";
import {ChatHeader} from "@/components/ChatHeader";

export default function Home() {
    return (
        <>
            <BaseHeadMeta meta={ HEAD_METAS.HELPER } />
            <ChatHeader />
            <BaseCodeTop title={ TITLES.HELPER } />
            <AdsTop />
            <BaseChat option={ OPTIONS.HELPER } />
            <AdsLeft />
            <AdsRight />
        </>
    );
}
