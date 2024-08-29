import { accountStore } from './accountStore';
import { dateStore } from './dateStore';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import noopStorage from './noopStorage'; // 서버에서 noop 스토리지 사용

// 클라이언트와 서버를 구분하여 storage 설정
const isServer = typeof window === 'undefined';
const persistDefaultStorage = isServer ? noopStorage : storage;


const persistConfig = {
    key: 'root',
    storage: persistDefaultStorage,
    whitelist: ['accountStore'], // accountStore만 persist
};

const persistedAccountReducer = persistReducer(persistConfig, accountStore.reducer);


export const store = configureStore({
    reducer: {
        dateStore: dateStore.reducer,
        // accountStore: accountStore.reducer,
        accountStore: persistedAccountReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore redux-persist actions
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
