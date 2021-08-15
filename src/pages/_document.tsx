import Document, { Html, Head, Main, NextScript } from 'next/document'

class _Document extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/assets/favicon/site.webmanifest" />
          <link rel="shortcut icon" href="/assets/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#3366ff" />
          <meta name="msapplication-config" content="/assets/favicon/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://api.8base.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
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
