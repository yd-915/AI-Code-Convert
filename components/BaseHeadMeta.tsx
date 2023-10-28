import React, {FC, useState, useEffect} from 'react';
import Head from "next/head";

interface BaseHeadMetaProps {
    meta: {
        title: string;
        description: string;
        canonical: string;
    }
}

export const BaseHeadMeta: React.FC<BaseHeadMetaProps> = (props) => {
    const [host, setHost] = useState("");
    useEffect(() => {
        const currentDomain = window.location.hostname;
        const port = window.location.port;
        const protocol = window.location.protocol;
        if (port !== '80') {
            setHost(protocol + "//" + currentDomain + ":" + port + "/");
        } else {
            setHost(protocol + "//" + currentDomain + "/");
        }
        console.info(host)
    }, []);
    return (
        <div>
            <Head>
                <title>{props.meta.title}</title>
                <meta name="description" content={props.meta.description}/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content={props.meta.title + ",free,online"} />
                <link rel="canonical" href={host + props.meta.canonical} />
                <link rel="icon" href="/code.png" />
            </Head>
        </div>
    );
};