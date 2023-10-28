import React, { useState, useEffect} from 'react';
import Head from "next/head";

export const MainHeadMeta = () => {
    const [host, setHost] = useState("");
    useEffect(() => {
        const currentDomain = window.location.hostname;
        const port = window.location.port;
        const protocol = window.location.protocol;
        if (port === '80' || port === '443' || port === '') {
            setHost(protocol + "//" + currentDomain + "/");
        } else {
            setHost(protocol + "//" + currentDomain + ":" + port + "/");
        }
    }, []);
    return (
        <div>
            <Head>
                <title>AI Code Converter | AI Code Translator | AI Code Generator</title>
                <meta name="description" content="Use AI To Convert Code Or Generate Code From One Language To Another. AI Code Translator. Translate Code From Any Language To Another With A Click."/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="AI Code Converter,Code Convert AI, Code Generate AI,Code Translator,AICodeHelper,free,online" />
                <link rel="canonical" href={host} />
                <link rel="icon" href="/code.png" />
            </Head>
        </div>
    );
};