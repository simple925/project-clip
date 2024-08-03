"use client"; // 클라이언트 컴포넌트로 지정

import { Provider } from 'react-redux';
import { store } from '@/store/index'; // 실제 store 경로에 맞게 수정

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;