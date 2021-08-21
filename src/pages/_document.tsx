import Document, { Html, Head, Main, NextScript } from 'next/document'

const description = `We forecast which stocks will go up, before they go up. Get yourself an edge and win. AI, fundamental, quantitative analysis maps the probable future. Intelligent portfolio management buys low, sells high, wins systematically. Indispensable investment system for smart growth and value investors.`

class _Document extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />

          <meta name="apple-mobile-web-app-title" content="Formula Stocks" />
          <meta name="application-name" content="Formula Stocks" />

          <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
          <link rel="shortcut icon" href="/assets/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#3366ff" />
          <meta name="msapplication-config" content="/assets/favicon/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />

          <meta property="og:title" content="Formula Stocks - algorithmic trading" />
          <meta property="og:site_name" content="Formula Stocks - algorithmic trading" />
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_us" />
          <meta property="og:url" content="https://formulastocks.com" />
          <meta property="og:image" content="https://formulastocks.com/images/marketing/shareImage1200x627.jpg" />

          <link rel="manifest" href="/manifest.json" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://api.8base.com" />
          <link href="https://fonts.googleapis.com/css2?family=Exo:wght@600;900&display=swap" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          />

          {/* GOOGLE analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-68151102-1" />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-68151102-1');
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* WOOPRA analytics */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              (function(){
                  var t,i,e,n=window,o=document,a=arguments,s="script",r=["config","track","identify","visit","push","call","trackForm","trackClick"],c=function(){var t,i=this;for(i._e=[],t=0;r.length>t;t++)(function(t){i[t]=function(){return i._e.push([t].concat(Array.prototype.slice.call(arguments,0))),i}})(r[t])};for(n._w=n._w||{},t=0;a.length>t;t++)n._w[a[t]]=n[a[t]]=n[a[t]]||new c;i=o.createElement(s),i.async=1,i.src="//static.woopra.com/js/w.js",e=o.getElementsByTagName(s)[0],e.parentNode.insertBefore(i,e)
              })("woopra");

              woopra.config({ domain: 'formulastocks.com' });
              woopra.track();
              `,
            }}
          />

          {/* CRISP live chat */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="661b2a78-03b3-4033-9b04-03bd9334368d";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
            }}
          />
        </body>
      </Html>
    )
  }
}

export default _Document
