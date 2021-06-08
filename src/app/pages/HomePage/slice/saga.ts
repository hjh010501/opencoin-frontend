import { eventChannel, END } from 'redux-saga';
import { takeLatest, take, call, put, select, fork, cancelled, cancel } from 'redux-saga/effects';
import { homepageActions as actions } from '.';
import UpbitService from 'api/upbit/upbit.service';
import { getMyUpbitToken, getMyAssetSelector } from './selectors';
import { IMyAsset } from './types';

function createWebSocketConnection() {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket("wss://api.upbit.com/websocket/v1");

        socket.onopen = function () {
            resolve(socket);
        };

        socket.onerror = function (evt) {
            reject(evt);
        }
    });
}

function createSocketChannel(socket) {
    return eventChannel(emit => {
        socket.onmessage = (event) => {
            emit(event.data);
        };

        socket.onclose = () => {
            emit(END);
        };

        const unsubscribe = () => {
            socket.onmessage = null;
        };

        return unsubscribe;
    });
}


function* listenForSocketMessages() {
    let socket;
    let socketChannel;
    let data;
    const upbit_jwt_token: string = yield select(getMyUpbitToken);
    if (upbit_jwt_token === '') return;

    const myAsset: IMyAsset[] = yield select(getMyAssetSelector);

    try {


        let currencies = '';
        myAsset.forEach(asset => {
            if (asset.currency === 'KRW') return;
            currencies += `"KRW-${asset.currency}",`;
        });

        if (currencies === '') return;

        socket = yield call(createWebSocketConnection);

        socket.send(`[{"ticket":"UNIQUE_TICKET"},{"type":"ticker","codes":[${currencies.slice(0, -1)}]}]`);
        socketChannel = yield call(createSocketChannel, socket);

        while (true) {

            // wait for a message from the channel
            const payload = yield take(socketChannel);
            payload.text().then(result => {
                data = JSON.parse(result);
            });
            yield put(actions.realtimeCurrentAssetLoaded(data));

        }
    } catch (error) {
        console.log(error);
    } finally {
        if (yield cancelled()) {
            // close the channel
            socketChannel.close();

            // close the WebSocket connection
            socket.close();
        } else {
        }
    }
}


export function* getMyAsset() {

    const upbit_jwt_token: string = yield select(getMyUpbitToken);
    if (upbit_jwt_token === '') return;

    try {
        const myAsset = yield call(UpbitService.getAllMyAsset, upbit_jwt_token);
        yield put(actions.myAssetLoaded(myAsset.data));
    } catch (err) {
        actions.assetError(err);
    }
}

export function* getCurrentAsset() {

    const myAsset: IMyAsset[] = yield select(getMyAssetSelector);
    let currencies = '';
    myAsset.forEach(asset => {
        if (asset.currency === 'KRW') return;
        currencies += `KRW-${asset.currency},`;
    });

    try {
        const currentAsset = yield call(UpbitService.getAllCurrentAsset, currencies.slice(0, -1));
        yield put(actions.currentAssetLoaded(currentAsset.data));
    } catch (err) {
        actions.assetError(err);
    }
}

// Root saga
export function* homepageSaga() {

    yield takeLatest(actions.loadCurrentAsset.type, listenForSocketMessages);
    yield takeLatest(actions.loadMyAsset.type, getMyAsset);
    yield takeLatest(actions.loadCurrentAsset.type, getCurrentAsset);

}