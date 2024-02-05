import "@/styles/globals.css";
import '../public/css/style.css'; // 修改路径以正确指向您的CSS文件

export default function App({ Component, pageProps }) {
  return (
  <Component {...pageProps} />
  );
}
