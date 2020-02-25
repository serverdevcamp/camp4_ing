import React, { useState, useEffect } from 'react';
import WebView from 'react-native-webview';
import queryString from 'query-string';

const domain = 'https://localhost:3000'; // 가맹점 도메인
function Home({ navigation }) {
  const [uri, setUri] = useState(domain);

  useEffect(() => {
    /* navigation이 바뀌었을때를 트리거 */
    const response = navigation.getParam('response');
    if (response) {
      const query = queryString.stringify(response);
      const { type } = query;
      if (type === 'payment') {
        /* 결제 후 렌더링 되었을 경우, https://example.com/payment/result로 리디렉션 시킨다 */
        setUri(`${domain}/payment/result?${query}`);
      }
    }
  }, [navigation]);

  function onMessage(e) {
    try {
      const { userCode, data, type } = JSON.parse(e.nativeEvent.data);
      const params = { userCode, data };
      navigation.push(type === 'payment' ? 'Payment' : 'Certification', params);
    } catch (e) { }
  }

  return (
    <WebView
      source={{ uri }}
      onMessage={onMessage}
      style={{ flex: 1 }}
      injectedJavascript={`(function() {
        window.postMessage = function(data) {
          window.ReactNativeWebView.postMessage(data);
        };
      })()`}
    />
  );
}

export default Home;