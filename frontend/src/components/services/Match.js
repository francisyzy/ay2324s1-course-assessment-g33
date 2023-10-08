import Button from "@mui/material/Button";
import { socket } from "../common/WebSocket";
import { SnackBarContext } from "../../contexts/SnackBarContext";
import { useContext, useEffect, useState } from "react";
import { MatchContext } from "../../contexts/MatchContext";
import { Box, CircularProgress } from "@mui/material";
import { QuestionContext } from "../../contexts/QuestionContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CoolButton from "../common/CoolButton";

var timeout_id_easy = null;
var timeout_id_medium = null;
var timeout_id_hard = null;

function Match() {
  const [loadingEasy, setLoadingEasy] = useState(false);
  const [loadingMedium, setLoadingMedium] = useState(false);
  const [loadingHard, setLoadingHard] = useState(false);
  const { setOpenSnackBar, setSB } = useContext(SnackBarContext);
  const { setQuestion } = useContext(QuestionContext);
  const {
    match,
    findMatchEasy,
    findMatchMedium,
    findMatchHard,
    setMatch,
    setFindMatchEasy,
    setFindMatchMedium,
    setFindMatchHard,
  } = useContext(MatchContext);
  const navigate = useNavigate();

  const match_easy = () => {
    socket.emit("match_easy", socket.id);
    setSB({ msg: "[Easy]Finding a match!", severity: "success" });
    setOpenSnackBar(true);
    setFindMatchEasy(true);
    setLoadingEasy(true);
  };
  const match_medium = () => {
    socket.emit("match_medium", socket.id);
    setSB({ msg: "[Medium]Finding a match!", severity: "success" });
    setOpenSnackBar(true);
    setFindMatchMedium(true);
    setLoadingMedium(true);
  };
  const match_hard = () => {
    socket.emit("match_hard", socket.id);
    setSB({ msg: "[Hard]Finding a match!", severity: "success" });
    setOpenSnackBar(true);
    setFindMatchHard(true);
    setLoadingHard(true);
  };
  useEffect(() => {
    if (findMatchEasy) {
      timeout_id_easy = setTimeout(() => {
        setFindMatchEasy(false);
        setMatch(false);
        setSB({ msg: "You are alone", severity: "error" });
        socket.emit("match_cancel_easy", socket.id);
        setOpenSnackBar(true);
        setLoadingEasy(false);
      }, 5000);
    }
  }, [findMatchEasy]);

  useEffect(() => {
    if (findMatchMedium) {
      timeout_id_medium = setTimeout(() => {
        setFindMatchMedium(false);
        setMatch(false);
        setSB({ msg: "You are alone", severity: "error" });
        socket.emit("match_cancel_medium", socket.id);
        setOpenSnackBar(true);
        setLoadingMedium(false);
      }, 5000);
    }
  }, [findMatchMedium]);

  useEffect(() => {
    if (findMatchHard) {
      timeout_id_hard = setTimeout(() => {
        setFindMatchHard(false);
        setMatch(false);
        setSB({ msg: "You are alone", severity: "error" });
        socket.emit("match_cancel_hard", socket.id);
        setOpenSnackBar(true);
        setLoadingHard(false);
      }, 5000);
    }
  }, [findMatchHard]);

  const getRandomEasyQuestion = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/question/problem/3Sum`
    );
    setQuestion({ titleSlug: "3Sum", problem: data });
    navigate("/match");
  };
  useEffect(() => {
    if (match) {
      //match is either false or room_id
      clearTimeout(timeout_id_easy);
      clearTimeout(timeout_id_medium);
      clearTimeout(timeout_id_hard);
      getRandomEasyQuestion();
    }
  }, [match]);

  return (
    <Box
      className="match-container"
      sx={{
        backgroundColor: "secondary.main",
        color: "secondary.contrastText",
      }}
    >
      <div className="match-container-title">Match</div>
      <div className="match-difficulty-container">
        <CoolButton text={"Easy"} loading={loadingEasy} onClick={match_easy} />
        <CoolButton
          text={"Medium"}
          loading={loadingMedium}
          onClick={match_medium}
        />
        <CoolButton text={"Hard"} loading={loadingHard} onClick={match_hard} />
      </div>
    </Box>
  );
}

export default Match;
