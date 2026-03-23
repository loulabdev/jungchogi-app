import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import { router } from './app/routes';
import './styles.css';

const updateSW = registerSW({
  onNeedRefresh() {
    const ok = window.confirm('새 버전이 있습니다. 지금 업데이트할까요?');
    if (ok) updateSW(true);
  },
  onOfflineReady() {
    console.log('오프라인 준비 완료');
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
