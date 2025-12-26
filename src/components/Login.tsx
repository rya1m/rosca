import { useState, useEffect } from 'react';
import styles from '../styles/Login.module.css';

declare global {
  interface Window {
    my?: any; // تعريف my من SDK
  }
}

const Login = () => {
  const [isMiniApp, setIsMiniApp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // التأكد أننا داخل بيئة MiniApp
    if (typeof window.my !== 'undefined' && typeof window.my.getAuthCode === 'function') {
      setIsMiniApp(true);
    }
  }, []);

  const handleLogin = () => {
    setLoading(true);

    window.my.getAuthCode({
      scopes: ['auth_base', 'USER_ID'],
      success: (res: any) => {
        console.log('✅ Got authCode:', res.authCode);

        // إرسال الكود إلى API للمصادقة
        fetch('https://its.mouamle.space/api/auth-with-superQi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: res.authCode })
        })
          .then(res => res.json())
          .then(data => {
            console.log('🎉 Auth Success:', data);
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
          })
          .catch(err => {
            console.error('❌ Auth Error:', err);
            alert('فشل في تسجيل الدخول');
          })
          .finally(() => setLoading(false));
      },
      fail: (err: any) => {
        console.error('❌ Authorization failed:', err.authErrorScopes);
        alert('فشل التفويض');
        setLoading(false);
      }
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>تسجيل الدخول عبر SuperQi</h2>

      {isMiniApp ? (
        <button className={styles.button} onClick={handleLogin} disabled={loading}>
          {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
        </button>
      ) : (
        <p className={styles.note}>⚠️ افتح هذا التطبيق داخل MiniApp لتسجيل الدخول.</p>
      )}

      {user && (
        <pre className={styles.response}>{JSON.stringify(user, null, 2)}</pre>
      )}
    </div>
  );
};

export default Login;
