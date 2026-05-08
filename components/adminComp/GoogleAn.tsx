import Script from "next/script";

const GoogleAn = () => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-LH9G8XVM6L"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LH9G8XVM6L');
        `}
      </Script>
    </>
  );
};

export default GoogleAn;