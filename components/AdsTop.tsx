import React, { useEffect } from 'react';

export const AdsTop = () => {
  useEffect(() => {
    // load Google AdSense lib
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3672455877501055';
    script.async = true;
    script.setAttribute('crossorigin', 'anonymous');
    document.body.appendChild(script);
	// Load ad when AdSense library is ready
	script.onload = () => {
	  //@ts-ignore
	  const adsbygoogle = window.adsbygoogle || [];
	  console.log({ adsbygoogle });
	  adsbygoogle.push({});
	}
  }, []);

  return (
	<div className="mt-1 mx-auto bg-transparent flex justify-center items-center"
		style={{width:'auto',height:'90px'}} >
		<ins className="adsbygoogle"
		     style={{display:'inline-block',width:'728px',height:'90px'}}
		     data-ad-client="ca-pub-3672455877501055"
		     data-ad-slot="3433106919"
			 ></ins>
		{/*data-ad-format="auto"*/}
	</div>
  );
};