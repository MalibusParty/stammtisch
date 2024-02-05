import { useLogin } from "@/stores/loginStore";
import { Client, type messageCallbackType } from "@stomp/stompjs";

const WSURL = `ws://${window.location.host}/stomp`;

const { authState } = useLogin();

export default function getStompClient(destination: string, msgCallBack: messageCallbackType) {
    const stompClient = new Client({
        brokerURL: WSURL,
        connectHeaders: {
            'Authorization': `Bearer ${authState.token}`
        },
        onWebSocketError: (event) => { console.error(`WebSockert-Error: ${JSON.stringify(event)}`) },
        onStompError: (frame) => { console.error(`Stomp-Error: ${JSON.stringify(frame)}`) },
        onConnect: (frame) => {
            console.log(`Stomp "${destination}" connected`);
            stompClient.subscribe(destination, msgCallBack);
        },
        onDisconnect: () => { console.log(`Disconnected from "${destination}"`) }
    });

    return stompClient;
}