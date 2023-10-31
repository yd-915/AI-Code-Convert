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
    const [url, setUrl] = useState("");
    useEffect(() => {
        const currentDomain = window.location.hostname;
        const port = window.location.port;
        const protocol = window.location.protocol;
        setUrl(window.location.href);
        if (port === '80' || port === '443' || port === '') {
            setHost(protocol + "//" + currentDomain + "/");
        } else {
            setHost(protocol + "//" + currentDomain + ":" + port + "/");
        }
    }, []);
    return (
        <div>
            <Head>
                <title>{props.meta.title}</title>
                <meta name="description" content={props.meta.description}/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content={props.meta.title + ",free,online"} />
                <link rel="canonical" href={url} />
                <link rel="icon" href="/code.png" />
            </Head>
        </div>
    );
};