import React, { useEffect } from 'react';

export const AdsLeft = () => {
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
	<div className="hidden md:block lg:block fixed top-20 left-10 w-180 h-620 bg-transparent z-50">
		<ins className="adsbygoogle hidden md:block lg:block"
		     style={{display:'inline-block',width:'180px',height:'600px'}}
		     data-ad-client="ca-pub-3672455877501055"
		     data-ad-slot="6854753232"
			 data-ad-format="auto"></ins>
	</div>
  );
};