import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MatchContext } from "../contexts/MatchContext";
import { SOCKET_URL } from "../utils/constants";

const URL = SOCKET_URL // window.location.hostname + ":3001"

export const socket = io(URL, {
	autoConnect: false,
});

export default function Websocket() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const { setMatch, setHasInit } = useContext(MatchContext);

	function initMatchQueue() {
		setHasInit(true);
		console.log("Match Queue initialized");
	}
	function onConnect() {
		setIsConnected(true);
		console.log("connected");
	}
	function onDisconnect() {
		console.log("disconnect event");
		setIsConnected(false);
	}
	function onMatchSuccess(id) {
		setMatch({ success: true, room_id: id });
	}

	useEffect(() => {
		socket.connect();
		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("initMatchQueue", initMatchQueue);
		socket.on("matchSuccess", onMatchSuccess);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off("initMatchQueue", initMatchQueue);
			socket.off("matchSuccess", onMatchSuccess);
			socket.disconnect();
			setHasInit(false);
		};
	}, []);
	return <></>;
}
