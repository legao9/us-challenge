import React, { useEffect, useState } from "react";
// import List from "../../components/List/List";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { increment, decrement, getChallenges } from "../../redux/actions/action";
// import { apiUrl } from "../../utils/Constants";
import "./Dashboard.css";
import { useSelector, useDispatch } from "react-redux"

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import challengeImg1 from "../../assets/challenge.png";
import challengeImg2 from "../../assets/img/busket.jpeg";
import challengeImg3 from "../../assets/img/17.jpg";
import challengeImg4 from "../../assets/img/3.jpg";
import challengeImg5 from "../../assets/img/9.jpg";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

function Dashboard() {

  //Tmp data model of state data  
  let a = [{ _id: 1, challengeName: 'Climate Action Challenge', description: 'the ultimate quest to transform your lifestyle and…t and promote a more eco-friendly way of living.\n', url: challengeImg1 },
  { _id: 2, challengeName: 'Hooper Challenge', description: 'the ultimate quest to transform your lifestyle and…t and promote a more eco-friendly way of living.\n', url: challengeImg2 },
  { _id: 3, challengeName: 'JUICE DETOX CHALLENGE', description: 'the ultimate quest to transform your lifestyle and…t and promote a more eco-friendly way of living.\n', url: challengeImg3 },
  { _id: 4, challengeName: 'SUGAR FREE CHALLENGE', description: 'the ultimate quest to transform your lifestyle and…t and promote a more eco-friendly way of living.\n', url: challengeImg4 },
  { _id: 5, challengeName: 'ABS CHALLENGE', description: 'the ultimate quest to transform your lifestyle and…t and promote a more eco-friendly way of living.\n', url: challengeImg5 }

  ];

  const [data, setData] = useState(a);
  const storeData = useSelector(state => state)
  const dispatch = useDispatch()
  // const handleClick = () => {
  //   dispatch(increment())
  // }
  // const handleClick2 = () => {
  //   dispatch(decrement())
  // }
  // useEffect(() => {
  //   console.log(",state", storeData)

  // }, [])

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(apiUrl);
  //     // console.log(response.json())
  //     const jsonData = await response.json();

  //     setData(jsonData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  // useEffect(() => {
  //   dispatch(getChallenges())
  //   fetchData();
  // }, []);
  // Empty dependency array ensures this effect runs once when the component mounts
  // const JoinChallenge = async (challengeId, joiners) => {
  //   joiners.push({ userEmail: localStorage.getItem("email"), userId: localStorage.getItem("id") });
  //   console.log(joiners);
  //   const response = await axios.post(
  //     apiUrl + "challenge/update",
  //     { challengeId, joiners, userid: localStorage.getItem("id") }
  //   );
  //   console.log(response, 49);
  //   fetchData();
  // };
  const email = localStorage.getItem("email")

  return (
    <div className="dashboard">
      <div className="find-ch">
        <h1> Upcoming Challenges  </h1>
        <button className="btn-purple-round-lg">FIND YOUR CHALLENGE <span><ArrowForwardOutlinedIcon fontSize="large" /></span> </button>
      </div>
      <div className="flex">
        {data.length > 0
          ? data?.map((item) => {
            return (
              <div className="dashboard-item" key={item?._id}>
                <div className="img-box">
                  <img src={item.url} className="dashboard-item-img" />
                </div>
                <div className="text-box">
                  <p>{item.challengeName}  </p>
                  {
                    <button className="btn-purple-round"
                    >
                      JOIN
                    </button>
                  }
                </div>
              </div>
            );
          })
          : "No Challenges Found"}
      </div>
      <div>
        <div>PRIZES $1,000</div>
        <div className="flex">
          <div className="round-arror">
          <ArrowBackIcon/>
          <ArrowBackIcon/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
