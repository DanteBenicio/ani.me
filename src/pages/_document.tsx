import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&family=Rubik:wght@400;500&display=swap" rel="stylesheet" />
          <title>Ani.me | Assista Seus Animes Preferidos</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}