import "./Report.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { child, get, getDatabase, ref } from "firebase/database";
import * as Components from "./AudioComponents.js";
import axios from "axios";
import { set, push } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

import { ref as sRef } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
const Report = () => {
  const [interviewResponse, setInterViewresponse] = useState();
  const [video, setVideo] = useState([]);
  const [audio, setAudi] = useState([]);
  const [text, setText] = useState([]);
  const [loading, setLoading] = useState(true);

  const [textAnalysis, setTextAnalysis] = useState([]);
  let [op, setOp] = useState(0);
  let [co, setCo] = useState(0);
  let [ag, setAg] = useState(0);
  let [ex, setEx] = useState(0);
  let [nr, setNr] = useState(0);
  let [aop, setaOp] = useState(0);
  let [aco, setaCo] = useState(0);
  let [aag, setaAg] = useState(0);
  let [aex, setaEx] = useState(0);
  let [anr, setaNr] = useState(0);
  let [hp, setHp] = useState(0);
  let [sa, setSa] = useState(0);
  let [su, setSu] = useState(0);
  let [nu, setNu] = useState(0);
  let [an, setAn] = useState(0);
  let [di, setDi] = useState(0);
  let [fr, setFr] = useState(0);
  let [le, setLe] = useState(0);
  let [ri, setRi] = useState(0);
  let [ce, setCe] = useState(0);
  let emotions = {
    hap: "Happy",
    sad: "Sad",
    neu: "Neutral",
    ang: "Angry",
  };
  const { state } = useLocation();
  const { paramName } = state;
  async function fetchData() {
    const dbRef = ref(getDatabase());

    const user = auth.currentUser;
    const snapshot = await get(
      child(dbRef, "completed-interviews/" + paramName)
    );
    if (snapshot.exists()) {
      console.log(snapshot.val());
      const interviewsData = [];
      const textData = [];
      const audioData = [];
      const videoData = [];

      snapshot.forEach((childSnapshot) => {
        const inv = childSnapshot.val();

        if (inv.section === "video") {
          videoData.push({ id: childSnapshot.key, ...childSnapshot.val() });
        } else if (inv.section === "audio") {
          audioData.push({ id: childSnapshot.key, ...childSnapshot.val() });
        } else if (inv.section === "text") {
          textData.push({ id: childSnapshot.key, ...childSnapshot.val() });
        }
      }); // Set the initial question after fetching data
      setText(textData);
      setAudi(audioData);
      setVideo(videoData);
      console.log("length" + text.length);
      for (let i = 0; i < text.length; i++) {
        setOp((op + text[i].response.analysis.Openness) / (i + 1));
        setCo((co + text[i].response.analysis.Conscientiousness) / (i + 1));
        setEx((ex + text[i].response.analysis.Extroversion) / (i + 1));
        setAg((ag + text[i].response.analysis.Agreeableness) / (i + 1));
        setNr((nr + text[i].response.analysis.Neuroticism) / (i + 1));
      }
      if (audio.length > 0) {
        console.log(audio[0]);
      }
      for (let i = 0; i < audio.length; i++) {
        setaOp((aop + audio[i].response.personality_traits.Openness) / (i + 1));
        setaCo(
          (aco + audio[i].response.personality_traits.Conscientiousness) /
            (i + 1)
        );
        setaEx(
          (aex + audio[i].response.personality_traits.Extroversion) / (i + 1)
        );
        setaAg(
          (aag + audio[i].response.personality_traits.Agreeableness) / (i + 1)
        );
        setaNr(
          (anr + audio[i].response.personality_traits.Neuroticism) / (i + 1)
        );
      }
      for (let i = 0; i < video.length; i++) {
        setHp((hp + video[i].response.emotion_percentages.Happy) / (i + 1));
        setAn((an + video[i].response.emotion_percentages.Angry) / (i + 1));
        setDi((di + video[i].response.emotion_percentages.Disgust) / (i + 1));
        setFr((fr + video[i].response.emotion_percentages.Fear) / (i + 1));
        setNu((nu + video[i].response.emotion_percentages.Neutral) / (i + 1));
        setSa((sa + video[i].response.emotion_percentages.Sad) / (i + 1));
        setSu((su + video[i].response.emotion_percentages.Surprise) / (i + 1));
        setCe((ce + video[i].response.total_time_looking_center) / (i + 1));
        setLe((le + video[i].response.total_time_looking_left) / (i + 1));
        setRi((ri + video[i].response.total_time_looking_right) / (i + 1));
      }
      if (
        op > 0 ||
        co > 0 ||
        ex > 0 ||
        ag > 0 ||
        nr > 0 ||
        hp > 0 ||
        an > 0 ||
        di > 0 ||
        fr > 0 ||
        nu > 0 ||
        sa > 0 ||
        su > 0 ||
        ce > 0 ||
        le > 0 ||
        ri > 0
      ) {
        setLoading(false);
      }
    }
  }

  if (loading) {
    fetchData();
  }

  // useEffect(useEffect() => {
  //     fetchData();
  // }, []);

  return (
    !loading && (
      <div className="report-container" style={{ backgroundColor: "#f1f3f7" }}>
        <h1>Report Page</h1>
        <br />
        <br />

        <div className="report-section">
          <h2>Text Analysis</h2>
          {/* Insert the rotated bar charts here */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              margin: "20px",
            }}
          >
            <div className="graph-container">
              <div className="bar-graph rotated" style={{ weight: "900px" }}>
                <BarChart
                  yAxis={[
                    {
                      id: "barCategories",
                      data: [
                        "Openness",
                        "Conscientiousness",
                        "Extroversion",
                        "Agreeableness",
                        "Neuroticism",
                      ],
                      scaleType: "band",
                    },
                  ]}
                  series={[
                    // {
                    //     data: [2, 5, 3, 7, 1],
                    // },
                    {
                      data: [op * 100, co * 100, ex * 100, ag * 100, nr * 100],
                    },
                  ]}
                  width={800}
                  height={500}
                  layout="horizontal"
                  sx={{
                    "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                  }}
                />
              </div>
            </div>
            <div className="legend">
              <div className="legend-item">
                <div
                  className="legend-color"
                  style={{ backgroundColor: "#28acac" }}
                ></div>
                <div className="legend-label">Your Personality Analysis</div>
              </div>
            </div>
          </div>
        </div>
        <div className="report-section">
          <h2>Audio Analysis</h2>

          <p>
            The overall emotion analysis of the audio interview :{" "}
            {emotions[audio[audio.length - 1].response.result[0]]}{" "}
          </p>
          {/* Insert the rotated bar charts here */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              margin: "20px",
            }}
          >
            <div className="graph-container">
              <div className="bar-graph rotated">
                <BarChart
                  xAxis={[
                    {
                      id: "barCategories",
                      data: [
                        "Openness",
                        "Conscientiousness",
                        "Extroversion",
                        "Agreeableness",
                        "Neuroticism",
                      ],
                      scaleType: "band",
                    },
                  ]}
                  series={[
                    // {
                    //     data: [2, 5, 3, 7, 1],
                    // },
                    {
                      data: [
                        aop * 100,
                        aco * 100,
                        aex * 100,
                        aag * 100,
                        anr * 100,
                      ],
                    },
                  ]}
                  width={1300}
                  height={700}
                  sx={{
                    "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                  }}
                />
              </div>
            </div>
            <div className="legend">
              <div className="legend-item">
                <div
                  className="legend-color"
                  style={{ backgroundColor: "#28acac" }}
                ></div>
                <div className="legend-label">Your Personality</div>
              </div>
              <div className="legend-item">
                <div
                  className="legend-color"
                  style={{ backgroundColor: "#4094f4" }}
                ></div>
                <div className="legend-label">General Average</div>
              </div>
            </div>
          </div>
        </div>

        <div className="report-section">
          <h2>Video Analysis: Gaze</h2>
          <br></br>
          <br></br>
          <br></br>

          <div
            className="graph-container"
            style={{
              padding: "20px",
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              margin: "20px",
            }}
          >
            <div className="pie-chart">
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: ce, label: "Center" },
                      { id: 1, value: le, label: "Left" },
                      { id: 2, value: ri, label: "Right" },
                    ],
                  },
                ]}
                width={600}
                height={400}
              />
            </div>
            {/*<div className="pie-chart">*/}
            {/*    <PieChart*/}
            {/*        series={[*/}
            {/*            {*/}
            {/*                data: [*/}
            {/*                    { id: 0, value: 10, label: 'series A' },*/}
            {/*                    { id: 1, value: 15, label: 'series B' },*/}
            {/*                    { id: 2, value: 20, label: 'series C' },*/}
            {/*                ],*/}
            {/*            },*/}
            {/*        ]}*/}
            {/*        width={600}*/}
            {/*        height={400}*/}
            {/*    />*/}
            {/*</div>*/}
          </div>
        </div>
        <div className="report-section">
          <h2>Video Analysis: Emotion</h2>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              margin: "20px",
            }}
          >
            <div className="graph-container">
              <div className="bar-graph">
                <BarChart
                  xAxis={[
                    {
                      id: "barCategories",
                      data: [
                        "Happy",
                        "Angry",
                        "Disgust",
                        "Sad",
                        "Fear",
                        "Surprise",
                        "Neutral",
                      ],
                      scaleType: "band",
                    },
                  ]}
                  series={[
                    // {
                    //     data: [2, 5, 3, 2, 3 ,1, 9],
                    // },
                    {
                      data: [hp, an, di, sa, fr, su, nu],
                    },
                  ]}
                  width={1300}
                  height={700}
                  sx={{
                    "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                  }}
                />
              </div>
            </div>
            <div className="legend">
              <div className="legend-item">
                <div
                  className="legend-color"
                  style={{ backgroundColor: "#28acac" }}
                ></div>
                <div className="legend-label">Your Emotions</div>
              </div>
              {/*<div className="legend-item">*/}
              {/*    <div className="legend-color" style={{ backgroundColor: '#4094f4' }}></div>*/}
              {/*    <div className="legend-label">General Average</div>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Report;
